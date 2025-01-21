import { type Metadata } from "next";

import { api, HydrateClient } from "~/trpc/server";
import CreatePromptButton from "./_components/create-prompt-button";
import { DataTable } from "./_components/table/data-table";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default async function TaskPage() {
  void api.prompt.all.prefetch();
  void api.category.all.prefetch();

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <HydrateClient>
          <div className="flex justify-end">
            <CreatePromptButton />
          </div>
          <DataTable />
        </HydrateClient>
      </div>
    </>
  );
}
