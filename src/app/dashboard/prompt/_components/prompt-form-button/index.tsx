"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import PromptForm from "./index.form";

export default function CreatePromptButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          プロンプト作成
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>プロンプト作成</DialogTitle>
        </DialogHeader>
        <PromptForm
          initialPrompt={undefined}
          onCloseAction={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
