import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // テストユーザーの作成
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "テストユーザー",
    },
  });

  // プロンプトの作成
  const prompt = await prisma.prompt.create({
    data: {
      title: "天気に関するツイート",
      content: "今日の天気について140文字でツイートを書いてください。",
      userId: user.id,
    },
  });

  // Twitterアカウントの作成
  const twitterAccount = await prisma.twitterAccount.create({
    data: {
      name: "テストアカウント",
      twitterHandle: "test_handle",
      userId: user.id,
    },
  });

  // タスクの作成
  const task = await prisma.task.create({
    data: {
      taskType: "TWEET",
      promptId: prompt.id,
      twitterAccountId: twitterAccount.id,
      compiledPrompt: "今日は晴れて気持ちの良い一日でした。",
    },
  });

  // ツイートの作成
  await prisma.twitterPost.create({
    data: {
      tweetContent: "今日は晴れて気持ちの良い一日でした。#天気 #今日の天気",
      taskId: task.id,
      twitterAccountId: twitterAccount.id,
      postedAt: new Date(),
    },
  });

  console.log("シードデータの作成が完了しました");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
