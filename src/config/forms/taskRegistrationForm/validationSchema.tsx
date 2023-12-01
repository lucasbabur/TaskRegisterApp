import * as Yup from "yup";

import {
  TaskFormFieldsInterface,
  sittedOrStanding,
  influences,
  productivityLevel,
} from "./interface";

const mandatoryInformation = "Mandatory information";

function convertTimeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export const validationSchema: Yup.Schema<TaskFormFieldsInterface> = Yup.object(
  {
    taskName: Yup.string().required(mandatoryInformation),
    sittedOrStanding: Yup.string()
      .oneOf(sittedOrStanding)
      .required(mandatoryInformation),
    productivityLevel: Yup.string()
      .oneOf(productivityLevel)
      .required(mandatoryInformation),
    influences: Yup.array()
      .nonNullable()
      .min(
        1,
        "At least one influence must be selected. If none of the options apply, select 'Nothing'"
      )
      .of(
        Yup.string()
          .oneOf(influences)
          .nonNullable()
          .required(mandatoryInformation)
      )
      .required(mandatoryInformation),
    planned: Yup.string().required(mandatoryInformation),
    startTime: Yup.string().required(mandatoryInformation),
    endTime: Yup.string()
      .required(mandatoryInformation)
      .when("startTime", {
        is: (startTime: string | undefined) => !!startTime,
        then: (schema) =>
          schema.test({
            test: (endTime: string | undefined, context) => {
              const startTime = context.parent.startTime as string;
              if (
                typeof startTime === "string" &&
                typeof endTime === "string"
              ) {
                const start = convertTimeToMinutes(startTime);
                const end = convertTimeToMinutes(endTime);
                return start < end;
              }
              return true;
            },
            message: "End time must be later than start time",
          }),
      }),
    isMonitoring: Yup.string().required(mandatoryInformation),
    monitoredTasks: Yup.array()
      .of(Yup.string().required("Each monitoring must be a valid string")) // Ensures each element is a string
      .when("isMonitoring", {
        is: (isMonitoring: string | undefined) => isMonitoring === "yes",
        then: (schema) =>
          schema
            .required(mandatoryInformation)
            .min(
              1,
              "At least one monitoring must be selected. If none of the options apply, select 'No'"
            ),
      }),
  }
);
