"use client";

import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { DataTableFacetedFilter } from "./index.data-table.toolbar.";
import { DataTableClickFilter } from "./index.data-table.toolbar.click-filter";
import { DataTableViewOptions } from "./index.data-table.toolbar.view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [categories] = api.category.all.useSuspenseQuery();
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter prompts..."
          onChange={(event) => {
            const value = event.target.value;
            table.getColumn("title")?.setFilterValue(value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("categories") && (
          <DataTableFacetedFilter
            column={table.getColumn("categories")}
            title="Categories"
            options={categories}
          />
        )}

        {table.getColumn("isFavorite") && (
          <DataTableClickFilter
            column={table.getColumn("isFavorite")}
            title="Favorite"
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
