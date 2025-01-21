import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { updateIsFavoriteInput } from "~/server/types";

export const promptRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    // プロンプトとそれに関連するカテゴリを取得
    const prompts = await ctx.db.prompt.findMany({
      include: {
        categories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      where: {
        userId: ctx.session.user.id,
      },
    });
    return prompts;
  }),
  updateIsFavorite: protectedProcedure
    .input(updateIsFavoriteInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.prompt.update({
        where: { id: input.id, userId: ctx.session.user.id },
        data: { isFavorite: input.isFavorite },
      });
      return { success: true };
    }),
});
