"use client";

import React, { createContext, useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { type z } from "zod";

import type {
  Prompt,
  ScheduleTask,
  TemplateVariable,
  TwitterAccount,
} from "~/server/types";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { taskFormSchema } from "~/server/types";
import { api } from "~/trpc/react";
import { parseCronToSchedule } from "~/utils/cron";
import AiProviderForm from "../ai-provider-form";
import CompiledPrompt from "../compiled-prompt";
import PromptFormField from "../prompt-form-field";
import ScheduleFieldForm from "../schedule-field-form";
import TemplateVariablesDialog from "../template-variables-dialog";
import TwitterAccountFormField from "../twitter-account-form-field";

type ScheduleFormContextType = {
  form: ReturnType<typeof useForm<ScheduleTask>>;
  prompts: Prompt[];
  twitterAccounts: TwitterAccount[];
  selectedPrompt: Prompt | null;
  compiledPrompt: string | null;
  templateVariables: { name: string; value: string }[];
  selectedTwitterAccount: TwitterAccount | null;
  showTemplateDialog: boolean;
  promptDialogOpen: boolean;
  setPromptDialogOpen: (open: boolean) => void;
  setSelectedPrompt: (prompt: Prompt | null) => void;
  setCompiledPrompt: (prompt: string | null) => void;
  setSelectedTwitterAccount: (account: TwitterAccount | null) => void;
  setTemplateVariables: (variables: { name: string; value: string }[]) => void;
  setShowTemplateDialog: (show: boolean) => void;
  handlePromptSelect: ({ promptId }: { promptId: number }) => void;
  handleTemplateVariablesSubmit: ({
    variables,
  }: {
    variables: TemplateVariable[];
  }) => void;
  onSubmit: (data: z.infer<typeof taskFormSchema>) => Promise<void>;
};

const ScheduleFormContext = createContext<ScheduleFormContextType | null>(null);

export const useScheduleForm = () => {
  const context = useContext(ScheduleFormContext);
  if (!context) {
    throw new Error(
      "useScheduleForm must be used within a ScheduleFormProvider",
    );
  }
  return context;
};

const ScheduleForm = ({
  defaultPromptId,
  initialTask,
}: {
  defaultPromptId: number | undefined;
  initialTask: ScheduleTask | undefined;
}) => {
  const { toast } = useToast();
  const [prompts] = api.prompt.all.useSuspenseQuery();
  const [twitterAccounts] = api.twitterAccount.all.useSuspenseQuery();
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [compiledPrompt, setCompiledPrompt] = useState<string | null>(null);
  const [selectedTwitterAccount, setSelectedTwitterAccount] =
    useState<TwitterAccount | null>(null);
  const [templateVariables, setTemplateVariables] = useState<
    TemplateVariable[]
  >([]);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [promptDialogOpen, setPromptDialogOpen] = useState(false);
  const utils = api.useUtils();

  const { mutate: createTask } = api.task.create.useMutation({
    onSuccess: async () => {
      await utils.task.all.invalidate();
      form.reset();

      // 関連する状態もすべてリセット
      setSelectedPrompt(null);
      setCompiledPrompt(null);
      setSelectedTwitterAccount(null);
      setTemplateVariables([]);
      setPromptDialogOpen(false);
      setShowTemplateDialog(false);
      console.log("作成しました");
      toast({
        title: "作成しました",
        description: "スケジュールタスクを作成しました",
        variant: "default",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "エラー",
        description: "スケジュールタスクの作成に失敗しました",
        variant: "destructive",
      });
    },
  });

  const form = useForm<ScheduleTask>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      promptId: defaultPromptId ?? initialTask?.promptId,
      twitterAccountId: initialTask?.twitterAccountId,
      isScheduled: true,
      schedule: initialTask?.cron_schedule
        ? parseCronToSchedule(initialTask.cron_schedule)
        : {
            type: "MINUTES",
            timeOfDay: "09:00",
            minutes: 60,
            daysOfWeek: [1, 3, 5],
          },
      taskType: "SCHEDULE",
      aiProvider: initialTask?.aiProvider ?? "GEMINI",
      isActive: initialTask?.isActive ?? true,
      isDraft: initialTask?.isDraft ?? false,
    },
  });

  const onSubmit = async (data: z.infer<typeof taskFormSchema>) => {
    console.log(data);
    createTask(data);
    // フォームをリセット
  };

  const handlePromptSelect = ({ promptId }: { promptId: number }) => {
    try {
      // 既存のコンパイル済みプロンプトと変数をリセット
      setCompiledPrompt(null);
      setTemplateVariables([]);
      const prompt = prompts.find((p) => p.id === promptId);
      if (!prompt) return;
      setSelectedPrompt(prompt);

      // テンプレートの場合のみ変数を抽出
      if (prompt.isTemplate) {
        const content = prompt.content;
        const regex = /{([^}]+)}/g;
        const matches: RegExpMatchArray | null = content.match(regex);

        if (matches) {
          // 重複を除去して変数名を抽出
          const uniqueVariables = [
            ...new Set(matches.map((match) => match.slice(1, -1))),
          ];

          if (uniqueVariables.length > 0) {
            // 変数オブジェクトを作成してステートを更新
            setTemplateVariables(
              uniqueVariables.map((name) => ({ name, value: "" })),
            );
            // ダイアログを表示
            setShowTemplateDialog(true);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching prompt:", error);
    }
  };

  const handleTemplateVariablesSubmit = ({
    variables,
  }: {
    variables: TemplateVariable[];
  }) => {
    if (!selectedPrompt) return;

    let compiled = selectedPrompt.content;
    variables.forEach(({ name, value }) => {
      if (value.length > 100) {
        throw new Error(`変数 ${name} の値が長すぎます`);
      }

      const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`{${escapedName}}`, "g");
      compiled = compiled.replace(regex, value);
    });
    setCompiledPrompt(compiled);
    setShowTemplateDialog(false);
  };

  const formProps = {
    form,
    prompts,
    twitterAccounts,
    selectedPrompt,
    selectedTwitterAccount,
    compiledPrompt,
    templateVariables,
    showTemplateDialog,
    promptDialogOpen,
    setPromptDialogOpen,
    setSelectedPrompt,
    setCompiledPrompt,
    setSelectedTwitterAccount,
    setTemplateVariables,
    setShowTemplateDialog,
    handlePromptSelect,
    handleTemplateVariablesSubmit,
    onSubmit,
  };

  return (
    <ScheduleFormContext.Provider
      value={{
        form,
        prompts,
        twitterAccounts,
        selectedPrompt,
        selectedTwitterAccount,
        compiledPrompt,
        templateVariables,
        showTemplateDialog,
        promptDialogOpen,
        setPromptDialogOpen,
        setSelectedPrompt,
        setCompiledPrompt,
        setSelectedTwitterAccount,
        setTemplateVariables,
        setShowTemplateDialog,
        handlePromptSelect,
        handleTemplateVariablesSubmit,
        onSubmit,
      }}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          {/* フォームフィールドはここに追加します */}
          <div className="mx-8 flex flex-col gap-4 space-y-4">
            <div>
              <h1 className="text-2xl font-bold">スケジュールタスク作成</h1>
              <div className="text-sm">
                定期的に実行するツイートを作成します。
              </div>
            </div>

            <PromptFormField
              form={form}
              promptDialogOpen={promptDialogOpen}
              setPromptDialogOpen={setPromptDialogOpen}
              selectedPrompt={selectedPrompt}
              prompts={prompts}
              handlePromptSelect={handlePromptSelect}
            />
            <TemplateVariablesDialog
              showTemplateDialog={showTemplateDialog}
              setShowTemplateDialog={setShowTemplateDialog}
              templateVariables={templateVariables}
              handleTemplateVariablesSubmit={handleTemplateVariablesSubmit}
            />
            <CompiledPrompt
              selectedPrompt={selectedPrompt}
              compiledPrompt={compiledPrompt}
              templateVariables={templateVariables}
              setShowTemplateDialog={setShowTemplateDialog}
            />
            <TwitterAccountFormField
              form={form}
              twitterAccounts={twitterAccounts}
              setSelectedTwitterAccount={setSelectedTwitterAccount}
            />
            <ScheduleFieldForm form={form} />
            <AiProviderForm form={form} />

            <div className="flex justify-end">
              <Button type="submit">保存</Button>
            </div>
          </div>
        </FormProvider>
      </form>
    </ScheduleFormContext.Provider>
  );
};

export default ScheduleForm;
