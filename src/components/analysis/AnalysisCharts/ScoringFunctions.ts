import { TaskFormFieldsInterface } from "@/config/forms/taskRegistrationForm/interface";
import { minutesInATask } from "@/components/generalAbstractions/taskContext/taskFunctions";

const MAX_PRODUCTIVITY_SCORE = 16 * 60 * 1.5 * 4; // 16 hours * 60 minutes * 1.5 (planned) * 4 (max productivity level)
const MAX_TIME_SCORE = 16 * 60; // 16 hours * 60 minutes

// All these functions calculate the score for a day in a percentage.
// They are called by the AnalysisCharts component to create the chart.

export function calculateDayProductivityScore(
  tasks: TaskFormFieldsInterface[]
) {
  let totalScore = 0;

  tasks.map((task) => {
    totalScore =
      parseInt(task.productivityLevel) *
      (task.planned ? 1.5 : 1) *
      minutesInATask(task.startTime, task.endTime);
  });

  let finalResult =
    Math.round((totalScore / MAX_PRODUCTIVITY_SCORE) * 10000) / 100;

  if (finalResult > 100) {
    return 100;
  } else {
    return finalResult;
  }
}

export function calculateDayPlannedTime(tasks: TaskFormFieldsInterface[]) {
  let totalPlannedTime = 0;

  tasks.map((task) => {
    if (task.planned) {
      totalPlannedTime += minutesInATask(task.startTime, task.endTime);
    }
  });

  let finalResult =
    Math.round((totalPlannedTime / MAX_TIME_SCORE) * 10000) / 100;

  if (finalResult > 100) {
    return 100;
  } else {
    return finalResult;
  }
}

export function calculateDayStandingTime(tasks: TaskFormFieldsInterface[]) {
  let totalStandingTime = 0;

  tasks.map((task) => {
    if (task.sittedOrStanding === "Standing") {
      totalStandingTime += minutesInATask(task.startTime, task.endTime);
    } else if (task.sittedOrStanding === "Both") {
      totalStandingTime += minutesInATask(task.startTime, task.endTime) / 2;
    }
  });

  let finalResult =
    Math.round((totalStandingTime / MAX_TIME_SCORE) * 10000) / 100;

  if (finalResult > 100) {
    return 100;
  } else {
    return finalResult;
  }
}
