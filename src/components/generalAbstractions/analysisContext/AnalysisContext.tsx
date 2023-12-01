/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, ReactNode } from "react";
import * as analysisFunctionsMaster from "./analysisFunctions";

import { TaskFormFieldsInterface } from "@/config/forms/taskRegistrationForm/interface";

interface AnalysisContextProps {
  setTaskDataState: React.Dispatch<
    React.SetStateAction<(TaskFormFieldsInterface & { uid: string })[]>
  >;
  taskDataState: (TaskFormFieldsInterface & { uid: string })[];
  taskFunctions: typeof analysisFunctionsMaster;
  setDatePickerDate: Function;
  datePickerDate: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

let initialDate = new Date();
initialDate.setHours(0, 0, 0, 0);

const AnalysisContext = createContext<AnalysisContextProps>({
  // Provide a dummy function and default value
  setTaskDataState: () => {},
  taskDataState: [],
  taskFunctions: analysisFunctionsMaster,
  datePickerDate: {
    startDate: initialDate,
    endDate: null,
  },
  setDatePickerDate: () => {},
});

interface TaskProviderProps {
  children: ReactNode;
}

export const AnalysisProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [taskDataState, setTaskDataState] = useState<
    (TaskFormFieldsInterface & { uid: string })[]
  >([]);
  const [datePickerDate, setDatePickerDate] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: initialDate,
    endDate: null,
  });

  function setDatePickerDateIntermediary(args: {
    startDate: Date | null;
    endDate: Date | null;
  }) {
    const standardizeDate = (date: Date) => {
      return new Date(date.toISOString().split("T")[0] + "T12:00:00.000Z");
    };

    if (args.startDate == null) return;
    let actualStartDate = standardizeDate(args.startDate);
    setDatePickerDate({
      startDate: actualStartDate,
      endDate: args.endDate,
    });

    if (args.endDate == null) return;
    let actualEndDate = standardizeDate(args.endDate);
    setDatePickerDate({
      startDate: actualStartDate,
      endDate: actualEndDate,
    });
  }

  const value = {
    setTaskDataState: setTaskDataState,
    taskDataState: taskDataState,
    taskFunctions: analysisFunctionsMaster,
    datePickerDate: datePickerDate,
    setDatePickerDate: setDatePickerDateIntermediary,
  };

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
};
