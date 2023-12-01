import {
  CustomRadioButtonOptionsObject,
  CustomCheckboxOptionsProps,
} from "../../../components/generalAbstractions/forms";

export const influencesOptions: CustomCheckboxOptionsProps[] = [
  {
    value: "Coffee",
    label: "Coffee ☕",
  },
  {
    value: "Alpha GPC",
    label: "Alpha GPC 💊",
  },
  {
    value: "NSDR",
    label: "Non-sleep deep rest 😴",
  },
  {
    value: "Intense exercises",
    label: "Intense exercises 🏋️‍♀️",
  },
  {
    value: "Fasting",
    label: "Fasting 🕸️",
  },
  {
    value: "Sick",
    label: "Sick 🤒",
  },
  {
    value: "Extremely sick",
    label: "Extremely sick 😷",
  },
  {
    value: "Cold",
    label: "Cold 🥶",
  },
  {
    value: "Hot",
    label: "Hot 🥵",
  },
  {
    value: "Tired",
    label: "Tired 😩", // Place three emojis to represent tiredness -> 😴, a different one ->
  },
  {
    value: "Sleepy",
    label: "Sleepy 🥱",
  },
  {
    value: "Nothing",
    label: "Nothing",
  },
];

export const productivityOptions: CustomRadioButtonOptionsObject[] = [
  {
    value: "4",
    label: "Eagle 🦅",
  },
  {
    value: "3",
    label: "Horse 🐎",
  },
  {
    value: "2",
    label: "Chicken 🐔",
  },
  {
    value: "1",
    label: "Sloth 🦥",
  },
];

export const sittedOrStandingOptions: CustomRadioButtonOptionsObject[] = [
  {
    value: "Sitted",
    label: "Sitted 🪑",
  },
  {
    value: "Standing",
    label: "Standing 🧍", // person standing symbol here ->
  },
  {
    value: "Both",
    label: "Both 🪑🧍",
  },
];

export const plannedOrUnplannedOptions: CustomRadioButtonOptionsObject[] = [
  {
    value: "Yes",
    label: "Yes 📝",
  },
  {
    value: "No",
    label: "No ❌",
  },
];
