/*
  Warnings:

  - Changed the type of `taskType` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('TWEET', 'SCHEDULE');

-- まず一時的なカラムを作成
ALTER TABLE "Task" ADD COLUMN "taskType_new" "TaskType";

-- 既存のデータを新しいカラムに変換
UPDATE "Task" 
SET "taskType_new" = 
  CASE 
    WHEN "taskType" = 'TWEET' THEN 'TWEET'::"TaskType"
    WHEN "taskType" = 'SCHEDULE' THEN 'SCHEDULE'::"TaskType"
    ELSE 'TWEET'::"TaskType"
  END;

-- 古いカラムを削除
ALTER TABLE "Task" DROP COLUMN "taskType";

-- 新しいカラムの名前を元の名前に変更
ALTER TABLE "Task" RENAME COLUMN "taskType_new" TO "taskType";

-- NOT NULL制約を追加
ALTER TABLE "Task" ALTER COLUMN "taskType" SET NOT NULL;
