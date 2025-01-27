import React from "react";

import { api, HydrateClient } from "~/trpc/server";
import { TwitterAccountButton } from "./_components/twitter-account-button";
import { TwitterAccountsListPage } from "./_components/twitter-account-list";

export default function TwitterAcountPage() {
  void api.twitterAccount.all.prefetch();
  return (
    <div className="container mx-auto space-y-8 px-4">
      <div className="flex justify-end">
        <TwitterAccountButton />
      </div>
      <HydrateClient>
        <TwitterAccountsListPage />
      </HydrateClient>
    </div>
  );
}
