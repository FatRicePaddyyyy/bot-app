"use client";

import React from "react";
import { Check, ChevronsUpDown, CirclePlus } from "lucide-react";
import {
  type ControllerRenderProps,
  type UseFormReturn,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import { type z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { type Category, type promptCreationSchema } from "~/server/types";
import { api } from "~/trpc/react";

// idsが含まれいているものを先頭に。それ以外はソート
const sortCategories = (categories: Category[], ids: number[]) => {
  const sortedCategories = categories.filter((category) =>
    ids.includes(category.id),
  );
  const otherCategories = categories.filter(
    (category) => !ids.includes(category.id),
  );
  return [...sortedCategories, ...otherCategories];
};

// 新規カテゴリーの作成ボタン
function CommandAddItem({
  query,
  setSortedAllCategories,
  field,
  setInputValue,
}: {
  query: string;
  setSortedAllCategories: (categories: Category[]) => void;
  field: ControllerRenderProps<
    z.infer<typeof promptCreationSchema>,
    "categories"
  >;
  setInputValue: (value: string) => void;
}) {
  const utils = api.useUtils();
  const { mutate: createCategory } = api.category.create.useMutation({
    onMutate: async ({ name }) => {
      await utils.category.all.cancel();
      const previousCategories = utils.category.all.getData();
      const previousIds = field.value;
      const maxId =
        previousCategories?.reduce(
          (max, category) => Math.max(max, category.id),
          0,
        ) ?? 0;
      const newCategory = { id: maxId + 1, name };
      const updatedCategories = [newCategory, ...(previousCategories ?? [])];
      utils.category.all.setData(undefined, (prev) => {
        if (!prev) return [newCategory];
        return [...prev, newCategory];
      });
      setSortedAllCategories(sortCategories(updatedCategories, previousIds));
      field.onChange([newCategory.id, ...previousIds]);
      setInputValue("");
      return { previousCategories, previousIds, maxId };
    },
    onError: (error, _, context) => {
      utils.category.all.setData(undefined, context?.previousCategories);
      setSortedAllCategories(
        sortCategories(context?.previousCategories ?? [], field.value),
      );
      field.onChange(context?.previousIds ?? []);
      toast.error("カテゴリーの作成に失敗しました");
    },
    onSettled: async () => {
      await utils.category.all.invalidate();
    },
  });
  return (
    <div
      className={cn(
        "flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm text-blue-500 focus:outline-none",
        "hover:bg-blue-200 focus:!bg-blue-200",
      )}
      onClick={() => {
        createCategory({ name: query });
      }}
    >
      <CirclePlus className="mr-2 h-4 w-4" />
      Create {query}
    </div>
  );
}

// カテゴリー選択フォーム
export const CategoriesFormItem = ({
  promptForm,
  initialAllCategories,
  isOpen,
}: {
  promptForm: UseFormReturn<z.infer<typeof promptCreationSchema>>;
  initialAllCategories: Category[];
  isOpen: boolean;
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const [allSortedCategories, setSortedAllCategories] =
    React.useState<Category[]>(initialAllCategories);

  return (
    <FormField
      control={promptForm.control}
      name="categories"
      render={({ field }) => (
        <FormItem>
          <FormLabel>カテゴリー</FormLabel>
          <div className="space-y-4">
            <Popover modal={isOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <span className="text-muted-foreground">
                    {field.value.length > 0
                      ? `${field.value.length}個のカテゴリーを選択中`
                      : "カテゴリーを選択..."}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="relative w-full"
                align="center"
                onPointerDownOutside={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Command className="pointer-events-auto max-h-[300px] w-[400px]">
                  <CommandInput
                    placeholder="カテゴリーを検索または作成..."
                    onValueChange={(value) => {
                      setInputValue(value);
                    }}
                    value={inputValue}
                  />
                  <CommandList>
                    <CommandEmpty>
                      <CommandAddItem
                        query={inputValue}
                        setSortedAllCategories={setSortedAllCategories}
                        field={field}
                        setInputValue={setInputValue}
                      />
                    </CommandEmpty>

                    <CommandGroup>
                      {allSortedCategories.map((category) => (
                        <CommandItem
                          key={category.id}
                          value={category.name}
                          onSelect={() => {
                            const isSelected = field.value.includes(
                              category.id,
                            );
                            let newValue;
                            if (isSelected) {
                              newValue = field.value.filter(
                                (id) => id !== category.id,
                              );
                              field.onChange(newValue); // 非同期で更新されるので、一時変数newValueを使う
                            } else {
                              newValue = [...field.value, category.id];
                              field.onChange(newValue);
                            }
                            setSortedAllCategories(
                              sortCategories(allSortedCategories, newValue),
                            );
                          }}
                          className="cursor-pointer px-4 py-2 hover:!bg-accent"
                        >
                          <div className="flex w-full items-center">
                            <Check
                              className={cn(
                                "mr-2 h-4 min-h-4 w-4 min-w-4",
                                field.value.includes(category.id)
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {category.name}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
