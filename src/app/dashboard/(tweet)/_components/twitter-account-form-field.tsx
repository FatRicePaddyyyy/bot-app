import type { UseFormReturn } from "react-hook-form";
import React from "react";

import type { ScheduleTask, TwitterAccount } from "~/server/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type Props = {
  form: UseFormReturn<ScheduleTask>;
  twitterAccounts: TwitterAccount[];
  setSelectedTwitterAccount: (account: TwitterAccount | null) => void;
};

const TwitterAccountFormField = ({
  form,
  twitterAccounts,
  setSelectedTwitterAccount,
}: Props) => {
  return (
    <FormField
      control={form.control}
      name="twitterAccountId"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-bold">Twitterアカウント</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(parseInt(value));
              const selectedAccount = twitterAccounts.find(
                (account) => account.id === parseInt(value),
              );
              if (selectedAccount) {
                setSelectedTwitterAccount(selectedAccount);
              }
            }}
            value={field.value?.toString() ?? ""}
          >
            <FormControl>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Twitterアカウントを選択" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {twitterAccounts.map((account) => (
                <SelectItem key={account.id} value={account.id.toString()}>
                  {account.name} (@{account.twitterHandle})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TwitterAccountFormField;
