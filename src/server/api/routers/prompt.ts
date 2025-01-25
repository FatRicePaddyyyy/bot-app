import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  deletePromptInput,
  promptCreationSchema,
  updateIsFavoriteInput,
} from "~/server/types";

export const promptRouter = createTRPCRouter({
  // 時間でそーと
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
      orderBy: {
        createdAt: "desc",
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
  create: protectedProcedure
    .input(promptCreationSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.prompt.create({
        data: {
          title: input.title,
          content: input.content,
          userId: ctx.session.user.id,
          categories: {
            create: input.categories.map((categoryId) => ({
              category: {
                connect: {
                  id: categoryId,
                },
              },
            })),
          },
        },
      });
      return { success: true };
    }),
  delete: protectedProcedure
    .input(deletePromptInput)
    .mutation(async ({ ctx, input }) => {
      if (input.id < 0) {
        console.log("プロンプトIDとして負の値が渡されました。");
      }
      try {
        await ctx.db.$transaction(async (tx) => {
          // 先にPromptCategoryの関連レコードを削除
          await tx.promptCategory.deleteMany({
            where: {
              promptId: input.id,
              prompt: {
                userId: ctx.session.user.id
              }
            },
          });

          // TwitterPostのTaskとの関連を解除
          const posts = await tx.twitterPost.findMany({
            where: {
              task: {
                promptId: input.id,
              },
            },
          });

          for (const post of posts) {
            await tx.twitterPost.update({
              where: { id: post.id },
              data: {
                task: {
                  connect: undefined,
                },
              },
            });
          }

          // 関連するTaskを削除
          await tx.task.deleteMany({
            where: {
              promptId: input.id,
            },
          });

          // 最後にPromptを削除
          await tx.prompt.delete({
            where: {
              id: input.id,
              userId: ctx.session.user.id,
            },
          });
        });
        return { success: true };
      } catch (error) {
        console.error("Failed to delete prompt:", error);
        throw error;
      }
    }),
});
