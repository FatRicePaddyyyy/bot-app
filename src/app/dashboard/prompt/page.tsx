import { api, HydrateClient } from "~/trpc/server";
import CreatePromptButton from "./_components/prompt-form-button";
import PromptTable from "./_components/prompt-table";

// 動的レンダリングを強制
export const dynamic = "force-dynamic";

export default async function PromptPage() {
  void api.prompt.all.prefetch();
  void api.category.all.prefetch();
  return (
    <>
      <HydrateClient>
        <div className="container mx-auto py-10">
          <div className="mb-4 flex justify-end">
            <CreatePromptButton />
          </div>
          <PromptTable />
        </div>
      </HydrateClient>
    </>
  );
}
