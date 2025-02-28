import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  tweetInputSchema,
} from "~/server/types";
import TwitterApi from 'twitter-api-v2';

export class TweetError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, unknown>
  ) {
    super(message)
    this.name = this.constructor.name
  }
}


export const tweetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(tweetInputSchema)
    .mutation(async ({ ctx, input }) => {
      let errorMessage: string | null = null;
      try {
        const result = await ctx.db.$transaction(async (tx) => {

          const twitterAccount = await tx.twitterAccount.findUnique({
            where: {
              id: input.twitterAccountId,
            },
          });

          if (!twitterAccount) {
            errorMessage = "Twitterアカウントが見つかりません";
            throw new Error(errorMessage);
          }
          if(twitterAccount.twitterAccessToken == null){
            errorMessage = "Twitterアカウントの認証に失敗しました";
            throw new Error(errorMessage);
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
          } catch {
            errorMessage = "Twitter APIクライアントの検証に失敗しました。APIキーが正しいか確認してください";
            throw new Error(errorMessage);
          }

          try {
            await userClient.v2.tweet(input.editedContent);
          } catch {
            throw new Error("レート制限です");
          }

          // TwitterPostを作成
          await tx.twitterPost.create({
            data: {
              tweetContent: input.editedContent,  // 編集済みの内容を設定
              twitterAccountId: input.twitterAccountId,
            },
          });

          return { success: true }
        });
        return result;
      } catch{
        throw new Error(errorMessage ?? "ツイートに失敗しました");
      }
    }),
});
