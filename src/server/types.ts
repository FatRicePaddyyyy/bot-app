import { z } from "zod";

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
