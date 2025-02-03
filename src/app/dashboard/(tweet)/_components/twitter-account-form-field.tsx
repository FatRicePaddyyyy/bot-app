import React from "react";

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
import { useScheduleForm } from "./schedule-form";

const TwitterAccountFormField = () => {
  const { form, selectedTwitterAccount, twitterAccounts, setSelectedTwitterAccount } =
    useScheduleForm();
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
