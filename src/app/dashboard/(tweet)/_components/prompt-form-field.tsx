import type { UseFormReturn } from "react-hook-form";
import React from "react";
import { ChevronsUpDown, FileCode, FileText } from "lucide-react";

import type { Prompt, ScheduleTask } from "~/server/types";
import { Button } from "~/components/ui/button";
import { Command, CommandGroup } from "~/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

type Props = {
  form: UseFormReturn<ScheduleTask>;
  promptDialogOpen: boolean;
  setPromptDialogOpen: (open: boolean) => void;
  selectedPrompt: Prompt | null;
  prompts: Prompt[];
  handlePromptSelect: ({ promptId }: { promptId: number }) => void;
};

const PromptFormField = ({
  form,
  promptDialogOpen,
  setPromptDialogOpen,
  selectedPrompt,
  prompts,
  handlePromptSelect,
}: Props) => {
  return (
    <FormField
      control={form.control}
      name="promptId"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-bold">プロンプト</FormLabel>
          <FormControl>
            <Dialog open={promptDialogOpen} onOpenChange={setPromptDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {selectedPrompt ? (
                    <div className="flex items-center gap-2">
                      {selectedPrompt.isTemplate ? (
                        <FileCode className="h-4 w-4 text-blue-500" />
                      ) : (
                        <FileText className="h-4 w-4" />
                      )}
                      {selectedPrompt.title}
                    </div>
                  ) : (
                    "プロンプトを選択"
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </DialogTrigger>
              <DialogContent className="s:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>プロンプトを選択</DialogTitle>
                  <DialogDescription>
                    使用するプロンプトを選択してください
                  </DialogDescription>
                  <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>通常プロンプト</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileCode className="h-4 w-4 text-blue-500" />
                      <span>テンプレートプロンプト</span>
                    </div>
                  </div>
                </DialogHeader>
                <Command className="rounded-lg border shadow-md">
                  <CommandGroup className="max-h-[300px] overflow-y-auto p-2">
                    {prompts.map((prompt) => (
                      <div
                        key={prompt.id}
                        className={`mb-2 cursor-pointer rounded-lg border p-4 transition-colors hover:border-primary ${
                          field.value === prompt.id
                            ? "border-primary bg-muted/50"
                            : ""
                        }`}
                        onClick={() => {
                          field.onChange(prompt.id);
                          handlePromptSelect({ promptId: prompt.id });
                          setPromptDialogOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-2 font-medium">
                          {prompt.isTemplate ? (
                            <FileCode className="h-4 w-4 text-blue-500" />
                          ) : (
                            <FileText className="h-4 w-4" />
                          )}
                          {prompt.title}
                          {prompt.isTemplate && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                              テンプレート
                            </span>
                          )}
                        </div>
                        <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {prompt.content}
                        </div>
                      </div>
                    ))}
                  </CommandGroup>
                </Command>
              </DialogContent>
            </Dialog>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PromptFormField;
