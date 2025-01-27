import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { apiSettingInput } from "~/server/types";

export const aiApiSettingsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(apiSettingInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.setting.create({
        data: {
          key: input.key,
          value: input.value,
          userId: ctx.session.user.id,
        },
      });
    }),
});
