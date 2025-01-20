import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createTwitterAccountInput } from "~/server/types";

export const twitterAccountRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const twitterAccounts = await ctx.db.twitterAccount.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        name: true,
        twitterHandle: true,
      },
    });
    return twitterAccounts.map(({ name, twitterHandle }) => ({
      name,
      twitterHandle,
    }));
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
});
