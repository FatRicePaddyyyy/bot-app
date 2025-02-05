import { Cron } from "croner";
import { type z } from "zod";

import { type Schedule, type taskFormSchema } from "../server/types";

export const convertToCronExpression = (schedule: Schedule): string | null => {
  if (!schedule) return null;

  switch (schedule.type) {
    case "MINUTES":
      return `*/${schedule.minutes} * * * *`;

    case "DAILY":
      const [hours, minutes] = schedule.timeOfDay?.split(":") ?? ["0", "0"];
      return `${minutes} ${hours} * * *`;

    case "WEEKLY":
      if (
        !schedule.timeOfDay ||
        !schedule.daysOfWeek ||
        schedule.daysOfWeek.length === 0
      ) {
        return null;
      }
      const [hour, minute] = schedule.timeOfDay.split(":");
      const days = schedule.daysOfWeek.join(",");
      return `${minute} ${hour} * * ${days}`;

    default:
      return null;
  }
};

// 次回実行時間を計算する関数を修正
export const getNextExecutionTime = (
  cronExpression: string | null,
): string | null => {
  if (!cronExpression) return null;

  try {
    const job = new Cron(cronExpression);
    const next = job.nextRun();

    if (!next) return null;

    // 日本時間で保存するため、タイムゾーンオフセットを追加
    return (
      next
        .toLocaleString("sv-SE", { timeZone: "Asia/Tokyo" })
        .replace(" ", "T") + "+09:00"
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
    return null;
  }
};

export const parseCronToSchedule = (
  cronExpression: string,
): z.infer<typeof taskFormSchema>["schedule"] => {
  const [minute, hour, , , dayOfWeek] = cronExpression.split(" ");

  // 分間隔の場合
  if (minute?.includes("/")) {
    return {
      type: "MINUTES",
      minutes: parseInt(minute.split("/")[1] ?? "0"),
    };
  }

  // 週次の場合
  if (dayOfWeek !== "*") {
    return {
      type: "WEEKLY",
      timeOfDay: `${hour?.padStart(2, "0")}:${minute?.padStart(2, "0")}`,
      daysOfWeek: dayOfWeek?.split(",").map(Number) ?? [],
    };
  }

  // 日次の場合
  return {
    type: "DAILY",
    timeOfDay: `${hour?.padStart(2, "0")}:${minute?.padStart(2, "0")}`,
  };
};
