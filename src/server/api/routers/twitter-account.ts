import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  createTwitterAccountInput,
  deleteTwitterAccountInput,
} from "~/server/types";

export const twitterAccountRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.twitterAccount.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        twitterHandle: true,
      },
    });
  }),
  create: protectedProcedure
    .input(createTwitterAccountInput)
    .mutation(({ ctx, input }) => {
      return ctx.db.twitterAccount.create({
        data: {
          name: input.name,
          twitterHandle: input.twitterHandle,
          twitterApiKey: input.twitterApiKey,
          twitterApiSecretKey: input.twitterApiSecretKey,
          twitterAccessToken: input.twitterAccessToken,
          twitterAccessTokenSecret: input.twitterAccessTokenSecret,
          userId: ctx.session.user.id,
        },
      });
    }),
  delete: protectedProcedure
    .input(deleteTwitterAccountInput)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.$transaction(async (tx) => {
          // 1. 関連するタスクを削除
          await tx.task.deleteMany({
            where: {
              twitterAccountId: input.id,
              twitterAccount: {
                userId: ctx.session.user.id,
              },
            },
          });

          // 2. TwitterPostsのtwitterAccountIdをnullに更新
          await tx.twitterPost.updateMany({
            where: {
              twitterAccountId: input.id,
            },
            data: {
              taskId: null,
            },
          });

          // 3. Twitterアカウントを削除
          return tx.twitterAccount.delete({
            where: {
              id: input.id,
              userId: ctx.session.user.id,
            },
          });
        });
      } catch (error) {
        console.error("Failed to delete twitter account:", error);
        throw error;
      }
    }),
});
