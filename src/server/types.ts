import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";

import type { AppRouter } from "~/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;

// プロンプトの出力の型
type allPromptOutput = RouterOutput["prompt"]["all"];
export type Prompt = allPromptOutput[number];

// カテゴリーの出力の型
type allCategoryOutput = RouterOutput["category"]["all"];
export type Category = allCategoryOutput[number];

// ツイッターアカウントの出力
type allTwitterAccountOutput = RouterOutput["twitterAccount"]["all"];
export type TwitterAccount = allTwitterAccountOutput[number];

export const createTwitterAccountInput = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 1 letter")
    .max(50, "Name must be 50 letters or less"),
  twitterHandle: z
    .string()
    .min(1, "Twitter handle must be at least 1 letter")
    .max(50, "Twitter handle must be 50 letters or less"),
  twitterApiKey: z
    .string()
    .min(1, "Twitter API key must be at least 1 letter")
    .max(50, "Twitter API key must be 50 letters or less"),
  twitterApiSecretKey: z
    .string()
    .min(1, "Twitter API secret key must be at least 1 letter")
    .max(50, "Twitter API secret key must be 50 letters or less"),
  twitterAccessToken: z
    .string()
    .min(1, "Twitter access token must be at least 1 letter")
    .max(50, "Twitter access token must be 50 letters or less"),
  twitterAccessTokenSecret: z
    .string()
    .min(1, "Twitter access token secret must be at least 1 letter")
    .max(50, "Twitter access token secret must be 50 letters or less"),
});

export const updateIsFavoriteInput = z.object({
  id: z.number(),
  isFavorite: z.boolean(),
});

export const promptCreationSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは1文字以上必要です")
    .max(100, "タイトルは100文字以内にしてください"),
  content: z
    .string()
    .min(1, "プロンプト内容は1文字以上必要です")
    .max(1000, "プロンプト内容は1000文字以内にしてください"),
  categories: z.number().array(),
  isTemplate: z.boolean().default(false),
});

export const categoryCreationSchema = z.object({
  name: z
    .string()
    .min(1, "カテゴリー名は1文字以上必要です")
    .max(50, "カテゴリー名は50文字以内にしてください"),
});

export const deletePromptInput = z.object({
  id: z.number(),
});

export const apiSettingInput = z.object({
  key: z.enum(["GEMINI_API_KEY", "OPENAI_API_KEY"]),
  value: z.string(),
});

export const deleteTwitterAccountInput = z.object({
  id: z.number(),
});

export const taskFormSchema = z.object({
  promptId: z.number({
    required_error: "プロンプトを選択してください",
  }),
  twitterAccountId: z.number({
    required_error: "Twitterアカウントを選択してください",
  }),
  isScheduled: z.boolean(),
  cron_schedule: z.string().optional(),
  schedule: z
    .object({
      type: z.enum(["MINUTES", "DAILY", "WEEKLY"]),
      minutes: z.number().optional(),
      timeOfDay: z.string().optional(), // HH:mm形式
      daysOfWeek: z.array(z.number()).optional(), // 0-6 (日-土)の配列
    })
    .nullable(),
  aiProvider: z.string(),
  taskType: z.enum(["TWEET", "SCHEDULE"]),
  isActive: z.boolean(),
  isDraft: z.boolean(),
});

export type Schedule = z.infer<typeof taskFormSchema>["schedule"];
export type ScheduleTask = z.infer<typeof taskFormSchema>;

export type ApiKeyType = "GEMINI_API_KEY" | "OPENAI_API_KEY" | undefined;

export type TemplateVariable = {
  name: string;
  value: string;
};
