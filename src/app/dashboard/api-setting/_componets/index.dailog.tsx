import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { ApiKeyType } from "~/server/types";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

export const ApiSettingDialog = ({
  selectedApiType,
  open,
  setOpen,
}: {
  selectedApiType: ApiKeyType;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { mutate } = api.aiApiSettings.create.useMutation();

  const apiSettingInputWithoutKey = z.object({
    value: z.string(),
  });

  const settingForm = useForm<z.infer<typeof apiSettingInputWithoutKey>>({
    resolver: zodResolver(apiSettingInputWithoutKey),
    defaultValues: {
      value: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof apiSettingInputWithoutKey>) => {
    if (!selectedApiType) {
      console.log("selectedApiType is null");
      return;
    }
    mutate({ key: selectedApiType, value: data.value });
    setOpen(false);
  };

  if (!selectedApiType) {
    console.log("selectedApiType is null");
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedApiType === "GEMINI_API_KEY" ? "Gemini" : "OpenAI"}{" "}
            APIキーの設定
          </DialogTitle>
          <DialogDescription>APIキーを入力してください</DialogDescription>
        </DialogHeader>
        <Form {...settingForm}>
          <form onSubmit={settingForm.handleSubmit(handleSubmit)}>
            <div className="space-y-4">
              <FormField
                control={settingForm.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>APIキー</FormLabel>
                    <FormControl>
                      <Input placeholder="APIキー" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4">
                <Button type="submit">作成</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
