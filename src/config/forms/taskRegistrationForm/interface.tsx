import {
  influencesOptions,
  productivityOptions,
  sittedOrStandingOptions,
} from "./optionsData";

export const influences = influencesOptions.map((influence) => influence.value);
export const sittedOrStanding = sittedOrStandingOptions.map(
  (Option) => Option.value
);
export const productivityLevel = productivityOptions.map(
  (Option) => Option.value
);

export type TypeInfluence = (typeof influences)[number];
export type TypeSittedOrStanding = (typeof sittedOrStanding)[number];
export type TypeProductivityLevel = (typeof productivityLevel)[number];

export const TaskFormFields = {
  startTime: "",
  endTime: "",
  taskName: "",
  sittedOrStanding: "" as TypeSittedOrStanding,
  productivityLevel: "" as TypeProductivityLevel,
  influences: [] as TypeInfluence[],
  planned: "",
  monitoredTasks: [] as string[] | undefined,
  isMonitoring: "",
};

type PartialTaskFormFields = Partial<typeof TaskFormFields>;
type RequiredFields = Required<
  Pick<
    typeof TaskFormFields,
    | "taskName"
    | "sittedOrStanding"
    | "productivityLevel"
    | "influences"
    | "planned"
    | "startTime"
    | "endTime"
    | "isMonitoring"
  >
>;

export type TaskFormFieldsInterface = PartialTaskFormFields & RequiredFields;
