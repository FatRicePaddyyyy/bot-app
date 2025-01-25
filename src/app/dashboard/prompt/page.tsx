import { Suspense } from "react";
import { type Metadata } from "next";

import { api, HydrateClient } from "~/trpc/server";
import CreatePromptButton from "./_components/prompt-form/create-prompt-button";
import { DataTable } from "./_components/table/data-table";
import { DataTableSkeleton } from "./_components/table/data-table-skeleton";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default async function TaskPage() {
  void api.prompt.all.prefetch();
  void api.category.all.prefetch();
  // デバッグ用
  return (
    <>
      <HydrateClient>
        <div className="container mx-auto py-10">
          <div className="mb-4 flex justify-end">
            <CreatePromptButton />
          </div>
          <Suspense fallback={<DataTableSkeleton />}>
            <DataTable />
          </Suspense>
        </div>
      </HydrateClient>
    </>
  );
}
