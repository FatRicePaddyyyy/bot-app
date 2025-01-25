import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // テストユーザーの作成
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
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
        name: "エンジニアリング",
        userId: user.id,
      },
    }),
  ]);

  // Twitterアカウントの作成
  const twitterAccount = await prisma.twitterAccount.create({
    data: {
      name: "テストアカウント",
      twitterHandle: "@test_handle",
      userId: user.id,
    },
  });

  // プロンプトの作成
  const prompts = await Promise.all([
    prisma.prompt.create({
      data: {
        title: "新商品の告知",
        content:
          "新商品「{product_name}」が発売されました！特徴は{features}です。ぜひチェックしてください！",
        isTemplate: true,
        userId: user.id,
        categories: {
          create: [
            { category: { connect: { id: categories[0].id } } },
            { category: { connect: { id: categories[1].id } } },
          ],
        },
      },
    }),
    prisma.prompt.create({
      data: {
        title: "技術情報の共有",
        content: "{technology}について解説します。主な特徴は{features}です。",
        isTemplate: true,
        userId: user.id,
        categories: {
          create: [{ category: { connect: { id: categories[2].id } } }],
        },
      },
    }),
  ]);

  // タスクの作成
  await Promise.all([
    prisma.task.create({
      data: {
        taskType: "TWEET",
        promptId: prompts[0].id,
        twitterAccountId: twitterAccount.id,
        compiledPrompt:
          "新商品「AI Assistant」が発売されました！特徴は高性能な自然言語処理です。ぜひチェックしてください！",
      },
    }),
    prisma.task.create({
      data: {
        taskType: "SCHEDULE",
        promptId: prompts[1].id,
        twitterAccountId: twitterAccount.id,
        compiledPrompt:
          "TypeScriptについて解説します。主な特徴は型安全性とツール支援の充実です。",
        cronSchedule: "0 9 * * *", // 毎日午前9時
      },
    }),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
