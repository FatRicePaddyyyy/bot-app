import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@radix-ui/react-dialog";

import { Button } from "~/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "~/hooks/use-toast";
import { type TemplateVariable } from "~/server/types";
import { useScheduleForm } from "./schedule-form";

export default function TemplateVariablesDialog() {
  const {
    showTemplateDialog,
    setShowTemplateDialog,
    templateVariables,
    handleTemplateVariablesSubmit,
  } = useScheduleForm();
  const [tempVariables, setTempVariables] =
    useState<TemplateVariable[]>(templateVariables);

  useEffect(() => {
    setTempVariables(templateVariables);
  }, [templateVariables]);

  return (
    <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
      <DialogPortal>
        <DialogOverlay className="animate-fade-in fixed inset-0 z-50 bg-black/50" />
        <DialogContent className="animate-content-show fixed left-[50%] top-[50%] z-[51] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg focus:outline-none dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>テンプレート変数の入力</DialogTitle>
            <DialogDescription>
              プロンプト内の変数に値を入力してください
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {tempVariables.map((variable, index) => (
              <div key={index} className="space-y-2">
                <Label>{variable.name}</Label>
                <Input
                  value={variable.value}
                  onChange={(e) => {
                    const newVariables = [...tempVariables];
                    if (newVariables[index]) {
                      newVariables[index].value = e.target.value;
                    }
                    setTempVariables(newVariables);
                  }}
                  placeholder={`${variable.name}の値を入力`}
                />
              </div>
            ))}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowTemplateDialog(false)}
              >
                キャンセル
              </Button>
              <Button
                onClick={() => {
                  if (tempVariables.every((v) => v.value)) {
                    const sanitizedVariables = tempVariables.map((v) => ({
                      name: v.name,
                      value: v.value,
                    }));
                    handleTemplateVariablesSubmit({
                      variables: sanitizedVariables,
                    });
                  } else {
                    toast({
                      title: "エラー",
                      description: "すべての変数を入力してください",
                      variant: "destructive",
                    });
                  }
                }}
              >
                確定
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
