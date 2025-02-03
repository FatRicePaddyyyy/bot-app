import React from "react";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { useScheduleForm } from "./schedule-form";

const CompiledPrompt = () => {
  const {
    selectedPrompt,
    compiledPrompt,
    templateVariables,
    setShowTemplateDialog,
  } = useScheduleForm();
  return (
    selectedPrompt && (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>
            {selectedPrompt?.isTemplate
              ? compiledPrompt
                ? "コンパイル済みプロンプト"
                : "テンプレートプロンプト"
              : "プロンプト内容"}
          </Label>
          {selectedPrompt?.isTemplate && templateVariables.length > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowTemplateDialog(true)}
            >
              {compiledPrompt ? "変数を再編集" : "変数を編集"}
            </Button>
          )}
        </div>
        <div className="rounded-md border bg-muted p-4">
          <pre className="whitespace-pre-wrap text-sm">
            {selectedPrompt.isTemplate
              ? (compiledPrompt ?? selectedPrompt.content)
              : selectedPrompt.content}
          </pre>
          {selectedPrompt.isTemplate &&
            !compiledPrompt &&
            templateVariables.length > 0 && (
              <div className="mt-2 text-sm text-yellow-600">
                ※ 変数の入力が必要です
              </div>
            )}
        </div>
      </div>
    )
  );
};

export default CompiledPrompt;
