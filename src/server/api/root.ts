import { categoryRouter } from "~/server/api/routers/category";
import { promptRouter } from "~/server/api/routers/prompt";
import { twitterAccountRouter } from "~/server/api/routers/twitter-account";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { aiApiSettingsRouter } from "./routers/settings";
import { taskRouter } from "./routers/task";
import { tweetRouter } from "./routers/tweet";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  twitterAccount: twitterAccountRouter,
  prompt: promptRouter,
  category: categoryRouter,
  aiApiSettings: aiApiSettingsRouter,
  task: taskRouter,
  // tweet: tweetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
