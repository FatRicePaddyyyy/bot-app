import { Plus } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import PromptForm from "./prompt-form";

export default async function CreatePromptButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新規プロンプト
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>新規プロンプト作成</DialogTitle>
        </DialogHeader>
        <PromptForm />
      </DialogContent>
    </Dialog>
  );
}
