import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // テストユーザーの作成
  const user = await prisma.user.create({
    data: {
      email: "test1@example.com",
      name: "テストユーザー",
    },
  });

  // カテゴリーの作成
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "ビジネス",
        userId: user.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "マーケティング",
        userId: user.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "技術",
        userId: user.id,
      },
    }),
  ]);

  // プロンプトの作成とカテゴリーの関連付け
  const prompts = await Promise.all([
    prisma.prompt.create({
      data: {
        title: "ビジネスアイデア生成",
        content:
          "新しいビジネスアイデアを5つ提案してください。各アイデアには、ターゲット顧客、価値提案、収益モデルを含めてください。",
        isTemplate: true,
        userId: user.id,
        categories: {
          create: [{ category: { connect: { id: categories[0].id } } }],
        },
      },
    }),
    prisma.prompt.create({
      data: {
        title: "SNSマーケティング戦略",
        content:
          "以下の製品のSNSマーケティング戦略を立案してください：[製品名]。ターゲット層、投稿内容、投稿頻度、使用するハッシュタグを含めてください。",
        isTemplate: true,
        userId: user.id,
        categories: {
          create: [
            { category: { connect: { id: categories[1].id } } },
            { category: { connect: { id: categories[0].id } } },
          ],
        },
      },
    }),
    prisma.prompt.create({
      data: {
        title: "技術トレンド分析",
        content:
          "現在のテクノロジー業界における重要なトレンドを分析し、今後6ヶ月間の予測を行ってください。",
        isTemplate: true,
        userId: user.id,
        categories: {
          create: [{ category: { connect: { id: categories[2].id } } }],
        },
      },
    }),
  ]);

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
      promptId: prompts[0].id,
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

  console.log("シードデータが正常に作成されました");
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
