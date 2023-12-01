import { TaskFormFieldsInterface } from "@/config/forms/taskRegistrationForm/interface";

// Did this in a class because it is easier to fold and unfold in vscode
export class EmojiTransformer {
  static sittedOrStanding = (EmojiString: string) => {
    switch (EmojiString) {
      case "Sitted":
        return "🪑";
      case "Standing":
        return "🧍";
      case "Both":
        return "🪑🧍";
      default:
        return EmojiString;
    }
  };
  static productivityLevel = (EmojiString: string) => {
    switch (EmojiString) {
      case "4":
        return "🦅";
      case "3":
        return "🐎";
      case "2":
        return "🐔";
      case "1":
        return "🦥";
      default:
        return EmojiString;
    }
  };
  static influences = (InfluencesArr: string[]) => {
    return InfluencesArr.map((influence) => {
      switch (influence) {
        case "Coffee":
          return "☕";
        case "Alpha GPC":
          return "💊";
        case "NSDR":
          return "😴";
        case "Intense exercises":
          return "🏋️‍♀️";
        case "Fasting":
          return "🕸️";
        case "Sick":
          return "🤒";
        case "Extremely sick":
          return "😷";
        case "Cold":
          return "🥶";
        case "Hot":
          return "🥵";
        case "Tired":
          return "😩";
        case "Sleepy":
          return "🥱";
        case "Nothing":
          return "";
        default:
          return influence;
      }
    });
  };
  static plannedOrUnplanned = (EmojiString: string) => {
    switch (EmojiString) {
      case "Yes":
        return "✅";
      case "No":
        return "❌";
      default:
        return EmojiString;
    }
  };
}

// This functions receives a string 10:00 - 11:00 and returns the number of minutes spent in that task
export function minutesInATask(startTime: string, endTime: string): number {
  let [startHour, startMinute] = startTime.split(":");
  let [endHour, endMinute] = endTime.split(":");
  return (
    (parseInt(endHour) - parseInt(startHour)) * 60 +
    parseInt(endMinute) -
    parseInt(startMinute)
  );
}

export function productivityScore(
  productivityLevel: string,
  startTime: string,
  endTime: string,
  planned: string
): number {
  return (
    Number(productivityLevel) *
    minutesInATask(startTime, endTime) *
    (planned === "Yes" ? 1.5 : 1)
  );
}

export function totalTimeSpent(data: TaskFormFieldsInterface[]): number {
  const finalTime = data.reduce((acc, item) => {
    return acc + minutesInATask(item.startTime, item.endTime);
  }, 0);

  return finalTime;
}

export function totalPlannedTimeSpentPercentage(
  data: TaskFormFieldsInterface[]
): number {
  return (
    Math.round(
      (data.reduce((acc, item) => {
        return (
          acc +
          (item.planned === "Yes"
            ? minutesInATask(item.startTime, item.endTime)
            : 0)
        );
      }, 0) /
        totalTimeSpent(data)) *
        10000
    ) / 100
  );
}

export function totalProductivityScore(
  data: TaskFormFieldsInterface[]
): number {
  return data.reduce((acc, item) => {
    return (
      acc +
      productivityScore(
        item.productivityLevel,
        item.startTime,
        item.endTime,
        item.planned
      )
    );
  }, 0);
}

export function averageProductivityScore(
  data: TaskFormFieldsInterface[]
): number {
  return (
    Math.round(
      (data.reduce((acc, item) => {
        return acc + Number(item.productivityLevel);
      }, 0) *
        100) /
        data.length
    ) / 100
  );
}
