import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { categoryCreationSchema } from "~/server/types";

export const categoryRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.category.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }),
  create: protectedProcedure
    .input(categoryCreationSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      });
    }),
});
