import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { taskFormSchema } from "~/server/types";
import { convertToCronExpression } from "~/utils/cron";

export const taskRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.task.findMany({
      where: {
        twitterAccount: {
          userId: ctx.session.user.id,
        },
      },
      include: {
        prompt: true,
        twitterAccount: true,
        twitterPosts: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  create: protectedProcedure
    .input(taskFormSchema)
    .mutation(async ({ ctx, input }) => {
      const cronExpression = input.isScheduled
        ? convertToCronExpression(input.schedule)
        : null;

      return ctx.db.task.create({
        data: {
          promptId: input.promptId,
          twitterAccountId: input.twitterAccountId,
          taskType: input.taskType,
          aiProvider: input.aiProvider,
          isActive: input.isActive,
          isDraft: input.isDraft,
          cronSchedule: cronExpression,
        },
      });
    }),
});
