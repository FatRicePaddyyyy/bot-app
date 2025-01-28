import React, { Suspense } from "react";

import { api, HydrateClient } from "~/trpc/server";
import { TwitterAccountButton } from "./_components/twitter-account-button";
import { TwitterAccountsListPage } from "./_components/twitter-account-list";
import { AccountListSkeleton } from "./_components/twitter-account-list/index.skeleton";

export default function TwitterAcountPage() {
  void api.twitterAccount.all.prefetch(); // レンダリングプロセス中にプレフェッチされる
  return (
    <HydrateClient>
      <div className="container mx-auto space-y-8 px-4">
        <div className="flex justify-end">
          <TwitterAccountButton />
        </div>
        <Suspense fallback={<AccountListSkeleton />}>
          <TwitterAccountsListPage />
        </Suspense>
      </div>
    </HydrateClient>
  );
}
