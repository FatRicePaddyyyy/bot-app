import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  tweetInputSchema,
} from "~/server/types";
import { TwitterApi } from "twitter-api-v2";

export const tweetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(tweetInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.$transaction(async (tx) => {
        // タスクを作成
        const task = await tx.task.create({
          data: {
            promptId: input.promptId,
            twitterAccountId: input.twitterAccountId,
            taskType: "TWEET",
            aiProvider: input.aiProvider,
            isActive: input.isActive,
            isDraft: input.isDraft,
            editedContent: input.editedContent,
            compiledPrompt: input.compiledPrompt,
          },
        });

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

        const client = new TwitterApi(twitterAccount.twitterAccessToken);
        await client.v2.tweet('Hello, this is a test.');

        // TwitterPostを作成
        await tx.twitterPost.create({
          data: {
            tweetContent: input.editedContent,  // 編集済みの内容を設定
            taskId: task.id,
            twitterAccountId: input.twitterAccountId,
          },
        });

      });
    }),
});
