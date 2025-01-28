import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type createTwitterAccountInput } from "~/server/types";

type formFieldsNames = keyof z.infer<typeof createTwitterAccountInput>;

export const TwitterAccountFormField = ({
  settingForm,
  formLabel,
  name,
  placeholder,
}: {
  settingForm: UseFormReturn<z.infer<typeof createTwitterAccountInput>>;
  formLabel: string;
  name: formFieldsNames;
  placeholder: string;
}) => {
  return (
    <FormField
      control={settingForm.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formLabel}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
