import type { UseFormReturn } from "react-hook-form";
import React from "react";

import type { ScheduleTask } from "~/server/types";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const DAYS_OF_WEEK = [
  { value: 0, label: "日曜日" },
  { value: 1, label: "月曜日" },
  { value: 2, label: "火曜日" },
  { value: 3, label: "水曜日" },
  { value: 4, label: "木曜日" },
  { value: 5, label: "金曜日" },
  { value: 6, label: "土曜日" },
] as const;

type Props = {
  form: UseFormReturn<ScheduleTask>;
};

export const ScheduleFieldForm = ({ form }: Props) => {
  return (
    <div className="space-y-8">
      <FormField
        control={form.control}
        name="schedule.type"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-bold">スケジュールタイプ</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="スケジュールタイプを選択" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="MINUTES">分間隔で実行</SelectItem>
                <SelectItem value="DAILY">毎日指定時刻に実行</SelectItem>
                <SelectItem value="WEEKLY">毎週指定曜日に実行</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("schedule.type") === "MINUTES" && (
        <FormField
          control={form.control}
          name="schedule.minutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">実行間隔（分）</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value?.toString()}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="間隔を選択" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 5, 10, 15, 30, 60].map((value) => (
                    <SelectItem key={value} value={value.toString()}>
                      {value}分ごと
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {(form.watch("schedule.type") === "DAILY" ||
        form.watch("schedule.type") === "WEEKLY") && (
        <FormField
          control={form.control}
          name="schedule.timeOfDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">実行時刻</FormLabel>
              <Input
                type="time"
                className="bg-white"
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
              />
              <FormDescription>
                指定した時刻に実行されます（24時間形式）
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {form.watch("schedule.type") === "WEEKLY" && (
        <FormField
          control={form.control}
          name="schedule.daysOfWeek"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">実行する曜日</FormLabel>
              <div className="flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map((day) => (
                  <Button
                    key={day.value}
                    type="button"
                    variant={
                      field.value?.includes(day.value) ? "default" : "outline"
                    }
                    onClick={() => {
                      const newValue = field.value ?? [];
                      const index = newValue.indexOf(day.value);
                      if (index === -1) {
                        field.onChange([...newValue, day.value].sort());
                      } else {
                        field.onChange(newValue.filter((v) => v !== day.value));
                      }
                    }}
                  >
                    {day.label}
                  </Button>
                ))}
              </div>
              <FormDescription>
                実行する曜日を1つ以上選択してください
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default ScheduleFieldForm;
