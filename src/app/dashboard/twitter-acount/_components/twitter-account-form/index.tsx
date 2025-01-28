"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import type { TwitterAccount } from "~/server/types";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { createTwitterAccountInput } from "~/server/types";
import { api } from "~/trpc/react";
import { TwitterAccountFormField } from "./index.form-field";

// import { TwitterAccountButton } from "./twitter-account-button";

export const TwitterAccountFormDialog = ({
  open,
  setOpen,
  initialAccount,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialAccount: TwitterAccount | null;
}) => {
  const utils = api.useUtils();
  const { mutate } = api.twitterAccount.create.useMutation({
    onSuccess: async () => {
      await utils.twitterAccount.all.invalidate();
    },
  });

  const settingForm = useForm<z.infer<typeof createTwitterAccountInput>>({
    resolver: zodResolver(createTwitterAccountInput),
    defaultValues: {
      name: initialAccount?.name ?? "",
      twitterHandle: initialAccount?.twitterHandle ?? "",
      twitterApiKey: "",
      twitterApiSecretKey: "",
      twitterAccessToken: "",
      twitterAccessTokenSecret: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof createTwitterAccountInput>) => {
    mutate(data);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ツイッターアカウントの設定</DialogTitle>
            <DialogDescription>
              ツイッターアカウントを追加してください
            </DialogDescription>
          </DialogHeader>
          <Form {...settingForm}>
            <form onSubmit={settingForm.handleSubmit(handleSubmit)}>
              <div className="space-y-4">
                <TwitterAccountFormField
                  settingForm={settingForm}
                  formLabel="アカウント名"
                  name="name"
                  placeholder="アカウント名を入力してください"
                />
                <TwitterAccountFormField
                  settingForm={settingForm}
                  formLabel="ツイッターハンドル"
                  name="twitterHandle"
                  placeholder="ツイッターハンドル名を入力してください"
                />
                <TwitterAccountFormField
                  settingForm={settingForm}
                  formLabel="APIキー"
                  name="twitterApiKey"
                  placeholder="APIキーを入力してください"
                />
                <TwitterAccountFormField
                  settingForm={settingForm}
                  formLabel="APIシークレットキー"
                  name="twitterApiSecretKey"
                  placeholder="APIシークレットキーを入力してください"
                />
                <TwitterAccountFormField
                  settingForm={settingForm}
                  formLabel="アクセストークン"
                  name="twitterAccessToken"
                  placeholder="アクセストークンを入力してください"
                />
                <TwitterAccountFormField
                  settingForm={settingForm}
                  formLabel="アクセストークンシークレット"
                  name="twitterAccessTokenSecret"
                  placeholder="アクセストークンシークレットを入力してください"
                />

                <div className="flex justify-end gap-4">
                  <Button type="submit">作成</Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
