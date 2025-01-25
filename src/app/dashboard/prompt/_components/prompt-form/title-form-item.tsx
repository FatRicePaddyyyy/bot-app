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

export const TitleFormItem = ({
  promptForm,
}: {
  promptForm: UseFormReturn<z.infer<typeof promptCreationSchema>>;
}) => {
  return (
    <FormField
      control={promptForm.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>タイトル</FormLabel>
          <FormControl>
            <Input placeholder="タイトル" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
