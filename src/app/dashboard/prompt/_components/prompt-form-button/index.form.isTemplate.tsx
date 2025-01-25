import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";

import { Checkbox } from "~/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { type promptCreationSchema } from "~/server/types";

export const IsTemplateFormItem = ({
  promptForm,
}: {
  promptForm: UseFormReturn<z.infer<typeof promptCreationSchema>>;
}) => {
  return (
    <FormField
      control={promptForm.control}
      name="isTemplate"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-2">
          <div className="flex flex-row items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="h-5 w-5 rounded-sm border-2 border-gray-300 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
              />
            </FormControl>
            <FormLabel className="text-sm text-gray-500">
              テンプレートとして保存する
            </FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
