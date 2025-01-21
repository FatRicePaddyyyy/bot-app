import * as React from "react";
import { type Column } from "@tanstack/react-table";

import { Button } from "~/components/ui/button";

interface DataTableClickFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

export function DataTableClickFilter<TData, TValue>({
  column,
  title,
}: DataTableClickFilterProps<TData, TValue>) {
  const isSelected = column?.getFilterValue() as boolean;

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-8 border-dashed"
      onClick={() => {
        if (isSelected) {
          column?.setFilterValue(undefined);
        } else {
          column?.setFilterValue(true);
        }
      }}
    >
      {title}
    </Button>
  );
}
