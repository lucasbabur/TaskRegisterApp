import { TaskFormFieldsInterface } from "@/config/forms/taskRegistrationForm/interface";
import { minutesInATask } from "@/components/generalAbstractions/taskContext/taskFunctions";

export function calculateMonitoringaverageProductivityPerMinute(
  tasks: TaskFormFieldsInterface[]
): number {
  let totalProductivity = 0;
  let totalTimeSpent = 0;

  tasks.forEach((task) => {
    const minutesInTaskValue = minutesInATask(task.startTime, task.endTime);
    const productivityScore = parseInt(task.productivityLevel);
    const timeMultiplier = task.planned === "Yes" ? 1.5 : 1;

    console.log(task);

    totalProductivity +=
      minutesInTaskValue * productivityScore * timeMultiplier;
    totalTimeSpent += minutesInTaskValue;
  });

  const MAX_PRODUCTIVITY = 4 * totalTimeSpent * 1.5;

  if (totalTimeSpent === 0) return 0;

  return Math.round((totalProductivity / MAX_PRODUCTIVITY) * 10000) / 100; // Returning as a percentage
}
