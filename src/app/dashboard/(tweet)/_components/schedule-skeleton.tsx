import React from "react";

import { Skeleton } from "~/components/ui/skeleton";

const ScheduleSkeleton = () => {
  return (
    <div className="mx-8 flex flex-col gap-4 space-y-4">
      {/* タイトル部分 */}
      <div>
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-2 h-4 w-96" />
      </div>

      {/* プロンプト選択 */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Twitterアカウント選択 */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* スケジュール設定 */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-36" />
        <div className="grid gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* AIプロバイダー選択 */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* 保存ボタン */}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
};

export default ScheduleSkeleton;
