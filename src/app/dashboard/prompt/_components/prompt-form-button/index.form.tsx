"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { promptCreationSchema } from "~/server/types";
import { api } from "~/trpc/react";
import { CategoriesFormItem } from "./index.form.categories";
import { ContentFormItem } from "./index.form.content";
import { IsTemplateFormItem } from "./index.form.isTemplate";
import { TitleFormItem } from "./index.form.title";

export default function PromptForm({
  initialPrompt,
  onClose,
  isOpen,
}: {
  initialPrompt: z.infer<typeof promptCreationSchema> | undefined;
  onClose: () => void;
  isOpen: boolean;
}) {
  const [allCategories] = api.category.all.useSuspenseQuery();
  const utils = api.useUtils();

  const promptForm = useForm<z.infer<typeof promptCreationSchema>>({
    resolver: zodResolver(promptCreationSchema),
    defaultValues: {
      title: initialPrompt?.title ?? "",
      content: initialPrompt?.content ?? "",
      categories: initialPrompt?.categories ?? [],
      isTemplate: initialPrompt?.isTemplate ?? false,
    },
  });

  const { mutate } = api.prompt.create.useMutation({
    onMutate: async (newPrompt) => {
      await utils.prompt.all.cancel();
      const previousPrompts = utils.prompt.all.getData();

      // 楽観的更新のために必要な形式に変換
      const optimisticPrompt = {
        ...newPrompt,
        id: -Date.now(),
        createdAt: new Date(),
        userId: "",
        isFavorite: null,
        isTemplate: newPrompt.isTemplate ?? false,
        categories: newPrompt.categories.map((categoryId) => ({
          id: Date.now(),
          createdAt: new Date(),
          promptId: Date.now(),
          categoryId,
          category: {
            id: categoryId,
            name: allCategories.find((c) => c.id === categoryId)?.name ?? "",
          },
        })),
      };

      utils.prompt.all.setData(undefined, (prev) => {
        if (!prev) return [optimisticPrompt];
        return [optimisticPrompt, ...prev];
      });

      onClose(); // 楽観的更新の直後にダイアログを閉じる
      return { previousPrompts };
    },
    onError: (err, newPrompt, context) => {
      utils.prompt.all.setData(undefined, context?.previousPrompts);
    },
    onSuccess: async () => {
      await utils.prompt.all.invalidate();
    },
  });

  const onSubmit = (prompt: z.infer<typeof promptCreationSchema>) => {
    console.log(prompt.isTemplate);
    mutate(prompt);
  };

  return (
    <div>
      <Form {...promptForm}>
        <form onSubmit={promptForm.handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col gap-4">
            <TitleFormItem promptForm={promptForm} />
            <ContentFormItem promptForm={promptForm} />
            <CategoriesFormItem
              promptForm={promptForm}
              initialAllCategories={allCategories}
              isOpen={isOpen}
            />
            <IsTemplateFormItem promptForm={promptForm} />
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit">作成</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
