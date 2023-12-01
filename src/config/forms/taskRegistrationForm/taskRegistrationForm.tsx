/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";

import { useFirebase } from "../../../firebase/firebaseContext";
import { TaskFormFieldsInterface, TaskFormFields } from "./interface";

import {
  useToast,
  Text,
  Link,
  UseToastOptions,
  Flex,
  Button,
} from "@chakra-ui/react";

import {
  CustomInputField,
  CustomRadioButton,
  CustomCheckboxInput,
  FormWrapper,
  CustomTimeKeeper,
  CustomRadioAppearInput,
} from "../../../components/generalAbstractions/forms";

import { Signal, useSignal } from "@preact/signals-react";
import { useTasks } from "@/components/generalAbstractions/taskContext/TaskContext";

import { validationSchema } from "./validationSchema";
import {
  sittedOrStandingOptions,
  productivityOptions,
  influencesOptions,
  plannedOrUnplannedOptions,
} from "./optionsData";

interface TaskRegistrationFormProps {
  isDisabled?: boolean;
  initialValuesObject?: TaskFormFieldsInterface;
  submitButtonTitle?: string;
  afterSubmitFunction?: (
    dataWithMetadata: TaskFormFieldsInterface & { uid: string },
    setTaskDataState: React.Dispatch<
      React.SetStateAction<(TaskFormFieldsInterface & { uid: string })[]>
    >,
    taskDataState: (TaskFormFieldsInterface & { uid: string })[]
  ) => void;
  uid?: string;
}

const toastSucessMessage: UseToastOptions = {
  title: "Your task was sucessfuly sent.",
  description: "Your task was sucessfuly registered. Keep it up!",
  status: "success",
  duration: 9000,
  isClosable: true,
};

const toastFailMessage: UseToastOptions = {
  title: "Your task was not sent.",
  description: "Your task was not registered. A problem occurred.",
  status: "error",
  duration: 9000,
  isClosable: true,
};

const PageController = (props: {
  pageNumber: number;
  actualPageNumber: number;
  children: React.ReactNode;
}) => {
  let { pageNumber, actualPageNumber } = props;

  if (pageNumber == actualPageNumber) {
    return <>{props.children}</>;
  } else {
    return null;
  }
};

export function TaskRegistrationForm(props: TaskRegistrationFormProps) {
  // Hooks
  let { setTaskDataState, taskDataState, datePickerDate } = useTasks();
  const [monitoringList, setMonitoringList] = React.useState<string[]>([]);
  let { functions } = useFirebase();
  let toast = useToast();

  // Signals
  let isSubmitButtonDisabled = useSignal<boolean | undefined>(props.isDisabled);
  let pageNumber = useSignal<number>(2);

  // Props
  let { uid, afterSubmitFunction } = props;

  React.useEffect(() => {
    functions.readMonitoring().then((monitoringList) => {
      setMonitoringList(monitoringList);
    });
  }, []);

  const handleTaskOperation = async (data: TaskFormFieldsInterface) => {
    let dataWithUID: TaskFormFieldsInterface & { uid: string };
    let dataWithDay: TaskFormFieldsInterface & { day: string };
    let operationPromise: any;

    if (uid) {
      dataWithUID = { ...data, uid: uid };
      operationPromise = functions.editTask(dataWithUID);
    } else {
      dataWithDay = {
        ...data,
        day: datePickerDate,
      };
      operationPromise = functions.writeTask(dataWithDay);
    }

    operationPromise
      .then((uid: string) => {
        dataWithUID = { ...data, uid: uid };
        if (afterSubmitFunction)
          afterSubmitFunction(dataWithUID, setTaskDataState, taskDataState);

        toast(toastSucessMessage);
        pageNumber.value = 1;
      })
      .catch((error: any) => {
        toast(toastFailMessage);
        console.error(error);
      })
      .finally(() => {
        isSubmitButtonDisabled.value = false;
      });
  };

  return (
    <FormWrapper<TaskFormFieldsInterface>
      validationSchema={validationSchema}
      initialValues={
        props.initialValuesObject ? props.initialValuesObject : TaskFormFields
      }
      submitButtonText="Send"
      submitButtonProps={{
        isDisabled: isSubmitButtonDisabled.value,
        backgroundColor: "mainColors.primary",
        display: "none",
      }}
      onSubmit={async (data) => {
        isSubmitButtonDisabled.value = true;
        await handleTaskOperation(data);
        setTimeout(() => {
          isSubmitButtonDisabled.value = false;
        }, 10000);
      }}
    >
      <Flex display="flex" alignItems="center" flexDirection="column" mt={4}>
        <PageController pageNumber={1} actualPageNumber={pageNumber.value}>
          <CustomTimeKeeper<TaskFormFieldsInterface>
            name="startTime"
            mt="4"
            reactTimeKeeperProps={{
              hour24Mode: true,
            }}
          />

          <CustomTimeKeeper<TaskFormFieldsInterface>
            name="endTime"
            reactTimeKeeperProps={{
              hour24Mode: true,
            }}
          />

          <Button
            mt="4"
            onClick={() => {
              pageNumber.value = 2;
            }}
            backgroundColor={"mainColors.primary"}
            color="white"
            colorScheme="primary"
          >
            Next Page
          </Button>
        </PageController>
        <PageController pageNumber={2} actualPageNumber={pageNumber.value}>
          <CustomInputField<TaskFormFieldsInterface>
            name="taskName"
            label="Task name"
            placeholder="Task Name"
            mt="2"
          />

          <CustomRadioAppearInput<TaskFormFieldsInterface>
            name="isMonitoring"
            label="Is it a task being monitored?"
            options={[
              {
                option: "yes",
                shallAppearComponents: true,
              },
              {
                option: "no",
                shallAppearComponents: false,
              },
            ]}
            mt={4}
          >
            <CustomCheckboxInput<TaskFormFieldsInterface>
              name="monitoredTasks"
              label="Monitorings"
              mt="4"
              options={monitoringList.map((monitoring) => {
                return {
                  value: monitoring,
                  label: monitoring,
                };
              })}
            />
          </CustomRadioAppearInput>
          <CustomRadioButton<TaskFormFieldsInterface>
            options={sittedOrStandingOptions}
            name="sittedOrStanding"
            label="Sitted or standing?"
            mt="2"
          />
          <CustomRadioButton<TaskFormFieldsInterface>
            options={productivityOptions}
            name="productivityLevel"
            label="Productivity level"
            mt="4"
          />
          <CustomRadioButton<TaskFormFieldsInterface>
            options={plannedOrUnplannedOptions}
            name="planned"
            label="Was it scheduled?"
            mt="4"
          />
          <CustomCheckboxInput<TaskFormFieldsInterface>
            options={influencesOptions}
            name="influences"
            label="Influences"
            mt="4"
          />
          <Flex width="220px" justifyContent="space-between" mt="4">
            <Button
              isLoading={isSubmitButtonDisabled.value}
              type="submit"
              isDisabled={isSubmitButtonDisabled.value}
              backgroundColor={"mainColors.primary"}
              color="white"
              width="100px"
              colorScheme="primary"
            >
              {props.submitButtonTitle ? props.submitButtonTitle : "Submit"}
            </Button>
            <Button
              width="100px"
              backgroundColor={"mainColors.secondary"}
              color="white"
              onClick={() => {
                pageNumber.value = 1;
              }}
              colorScheme="secondary"
            >
              Go Back
            </Button>
          </Flex>
        </PageController>
      </Flex>
    </FormWrapper>
  );
}
