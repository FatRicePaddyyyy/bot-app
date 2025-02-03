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

const AiProviderForm = () => {
  const { form } = useScheduleForm();
  return (
    <FormField
      control={form.control}
      name="aiProvider"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-bold">AI プロバイダー</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="AIプロバイダーを選択" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="GEMINI">Gemini</SelectItem>
              <SelectItem value="OPENAI">OpenAI</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AiProviderForm;
