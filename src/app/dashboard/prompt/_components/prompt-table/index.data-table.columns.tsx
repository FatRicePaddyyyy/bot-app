"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { FileText, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { type Prompt } from "~/server/types";
import { api } from "~/trpc/react";
import { DataTableColumnHeader } from "./index.data-table.columns.header";

export const columns = ({
  setModalState,
}: {
  setModalState: (state: boolean) => void;
}): ColumnDef<Prompt>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="flex max-w-[500px] items-center gap-1 truncate font-medium">
            <span className="w-4 flex-shrink-0">
              {row.original.isTemplate && (
                <FileText className="h-4 w-4 text-blue-500" />
              )}
            </span>
            {row.getValue("title")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const searchValue = String(value).toLowerCase();
      const titleMatch = String(row.getValue("title"))
        .toLowerCase()
        .includes(searchValue);
      const contentMatch = String(row.getValue("content"))
        .toLowerCase()
        .includes(searchValue);
      return titleMatch || contentMatch;
    },
    enableSorting: false,
  },
  {
    accessorKey: "content",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="content" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[800px] truncate font-medium">
            {row.getValue("content")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const searchValue = String(value).toLowerCase();
      const titleMatch = String(row.getValue("title"))
        .toLowerCase()
        .includes(searchValue);
      const contentMatch = String(row.getValue("content"))
        .toLowerCase()
        .includes(searchValue);
      return titleMatch || contentMatch;
    },
  },
  {
    accessorKey: "categories",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="categories" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[800px] truncate font-medium">
            {(
              row.getValue("categories") satisfies {
                category: { name: string; id: number };
              }[]
            ).map(({ category: { name, id } }) => (
              <Badge variant="outline" key={id}>
                {name}
              </Badge>
            ))}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value: number[]) => {
      const promptCategories = row.getValue("categories") satisfies {
        category: { name: string; id: number };
      }[];
      const isInclude = value.every((id) =>
        promptCategories.some(
          ({ category: { id: categoryId } }) => categoryId === id,
        ),
      );
      return isInclude;
    },
    enableSorting: false,
  },
  {
    accessorKey: "isFavorite",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Favorite" />
    ),
    cell: ({ row }) => {
      const isFavorite = row.getValue("isFavorite");
      const utils = api.useUtils();
      const { mutate: isFavoriteMutation } =
        api.prompt.updateIsFavorite.useMutation({
          onMutate: async ({ id, isFavorite }) => {
            await utils.prompt.all.cancel();
            const previousPrompts = utils.prompt.all.getData();
            utils.prompt.all.setData(undefined, (prev) => {
              if (!prev) return previousPrompts;
              return prev.map((p) => {
                if (p.id === id) {
                  return {
                    ...p,
                    isFavorite: isFavorite,
                  };
                }
                return p;
              });
            });
            return { previousPrompts };
          },
          onError: (err, isFavorite, context) => {
            toast.error(
              `プロンプトのお気に入りの更新に失敗しました。時間をおいて再度お試しください。`,
            );
            console.error(err);
            if (!context) return;
            utils.prompt.all.setData(undefined, () => context.previousPrompts);
          },
          onSuccess: async () => {
            await utils.prompt.all.invalidate();
          },
          onSettled: () => {
            void utils.prompt.all.invalidate();
          },
        });

      return (
        <Button
          variant="ghost"
          onClick={() => {
            if (row.original.id > 0) {
              isFavoriteMutation({
                id: row.original.id,
                isFavorite: !isFavorite,
              });
            }
          }}
        >
          {isFavorite ? (
            <span className="text-yellow-400">★</span>
          ) : (
            <span className="text-black">☆</span>
          )}
        </Button>
      );
    },
    filterFn: (row, id, value: Prompt["isFavorite"]) => {
      return value === row.getValue(id);
    },
    enableSorting: false,
  },
  {
    accessorKey: "delete",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delete" />
    ),
    cell: ({ row }) => {
      const utils = api.useUtils();
      const { mutate: deleteMutation } = api.prompt.delete.useMutation({
        onMutate: async ({ id }) => {
          setModalState(false);
          await utils.prompt.all.cancel();
          const previousPrompts = utils.prompt.all.getData();
          utils.prompt.all.setData(undefined, (prev) => {
            if (!prev) return previousPrompts;
            return prev.filter((p) => p.id !== id);
          });
          return { previousPrompts };
        },
        onError: (err, id, context) => {
          toast.error(
            `プロンプトの削除に失敗しました。時間をおいて再度お試しください。`,
          );
          console.error(err);
          if (!context) return;
          utils.prompt.all.setData(undefined, () => context.previousPrompts);
        },
        onSuccess: async () => {
          await utils.prompt.all.invalidate();
        },
        onSettled: () => {
          void utils.prompt.all.invalidate();
        },
      });

      return (
        <Button
          variant="destructive"
          onClick={() => {
            if (row.original.id > 0) {
              deleteMutation({ id: row.original.id });
            }
          }}
          className="h-6 w-4"
        >
          <Trash2 />
        </Button>
      );
    },
    filterFn: (row, id, value: Prompt["isFavorite"]) => {
      return value === row.getValue(id);
    },
    enableSorting: false,
  },
];
