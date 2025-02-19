import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  tweetInputSchema,
} from "~/server/types";
import TwitterApi from 'twitter-api-v2';

export const tweetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(tweetInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.$transaction(async (tx) => {

        const twitterAccount = await tx.twitterAccount.findUnique({
          where: {
            id: input.twitterAccountId,
          },
        });

        if (!twitterAccount) {
          throw new Error("Twitterアカウントが見つかりません");
        }
        if(twitterAccount.twitterAccessToken == null){
          console.log(twitterAccount.twitterAccessToken);
          throw new Error("Twitterアカウントの認証に失敗しました");
        }
        const appKey : string = twitterAccount.twitterApiKey ?? "";
        const appSecret : string = twitterAccount.twitterApiSecretKey ?? "";
        const accessToken : string = twitterAccount.twitterAccessToken ?? "";
        const accessSecret : string = twitterAccount.twitterAccessTokenSecret ?? "";

        const userClient = new TwitterApi({
          appKey: appKey,
          appSecret: appSecret,
          accessToken: accessToken,
          accessSecret: accessSecret,
        });

        try {
          await userClient.v2.me();
        } catch (verificationError) {
          console.error('Twitter APIクライアントの検証に失敗:', verificationError);
        }

        const result = await userClient.v2.tweet(input.editedContent);

        if(result.errors){
          throw new Error("ツイートに失敗しました");
        }

        // TwitterPostを作成
        await tx.twitterPost.create({
          data: {
            tweetContent: input.editedContent,  // 編集済みの内容を設定
            twitterAccountId: input.twitterAccountId,
          },
        });

      });
    }),
});
