import { Suspense } from "react";

import { DataTable } from "./index.data-table";
import { DataTableSkeleton } from "./index.data-table-skeleton";

export default async function PromptTable() {
  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <DataTable />
    </Suspense>
  );
}
