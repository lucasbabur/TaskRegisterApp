/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, ReactNode } from "react";
import * as taskFunctionsMaster from "./taskFunctions";

import { TaskFormFieldsInterface } from "@/config/forms/taskRegistrationForm/interface";
import { useFirebase } from "@/firebase/firebaseContext";

interface TaskContextProps {
  setTaskDataState: React.Dispatch<
    React.SetStateAction<(TaskFormFieldsInterface & { uid: string })[]>
  >;
  taskDataState: (TaskFormFieldsInterface & { uid: string })[];
  taskFunctions: typeof taskFunctionsMaster;
  setDatePickerDate: Function;
  datePickerDate: string;
}

const TaskContext = createContext<TaskContextProps>({
  // Provide a dummy function and default value
  setTaskDataState: () => {},
  taskDataState: [],
  taskFunctions: taskFunctionsMaster,
  datePickerDate: "",
  setDatePickerDate: () => {},
});

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [taskDataState, setTaskDataState] = useState<
    (TaskFormFieldsInterface & { uid: string })[]
  >([]);
  const [datePickerDate, setDatePickerDate] = useState<string>(
    new Date().toISOString().split("T")[0] + "T12:00:00.000Z"
  );
  const { functions } = useFirebase();

  React.useEffect(() => {
    functions.readTasksByDay(datePickerDate).then((data) => {
      setTaskDataState(data);
    });
  }, []);

  const value = {
    setTaskDataState: setTaskDataState,
    taskDataState: taskDataState,
    taskFunctions: taskFunctionsMaster,
    datePickerDate: datePickerDate,
    setDatePickerDate: (date: string) => {
      setDatePickerDate(date);
      functions.readTasksByDay(date).then((data) => {
        setTaskDataState(data);
      });
    },
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
