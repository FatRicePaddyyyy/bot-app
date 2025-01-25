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
import { type promptCreationSchema } from "~/server/types";

export const ContentFormItem = ({
  promptForm,
}: {
  promptForm: UseFormReturn<z.infer<typeof promptCreationSchema>>;
}) => {
  return (
    <FormField
      control={promptForm.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>内容</FormLabel>
          <FormControl>
            <Input placeholder="内容" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
