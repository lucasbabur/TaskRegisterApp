import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";

import { CustomTick } from "./AnalysisCharts/CustomTick";
import { Flex, Text, Box, Button, Select } from "@chakra-ui/react";

import {
  calculateDayPlannedTime,
  calculateDayProductivityScore,
  calculateDayStandingTime,
} from "./ScoringFunctions";

import { calculateMonitoringaverageProductivityPerMinute } from "./MonitoringFunctions";

import { useAnalysis } from "@/components/generalAbstractions/analysisContext/AnalysisContext";
import { useFirebase } from "@/firebase/firebaseContext";
import { TaskFormFieldsInterface } from "@/config/forms/taskRegistrationForm/interface";

import { MonitoringGridConsistency } from "./AnalysisCharts/MonitoringConsistencyGrid";

import * as React from "react";

interface OptionsDataProps {
  [key: string]: any;
}

interface TasksScores {
  name: string;
  ProductivityScore: string | number;
  PlannedTime: string | number;
  StandingTime: string | number;
}

export interface TasksMonitoringScores {
  name: string;
  ProductivityScore: number;
}

export function AnalysisCharts() {
  const { datePickerDate } = useAnalysis();
  const { functions } = useFirebase();
  const [tasksScores, setTasksScores] = React.useState<TasksScores[]>([]);
  const [monitoringTasksScores, setMonitoringTasksScores] = React.useState<
    TasksMonitoringScores[]
  >([]);
  const [monitoringList, setMonitoringList] = React.useState<string[]>([]);

  React.useEffect(() => {
    functions.readMonitoring().then((monitoringList) => {
      setMonitoringList(monitoringList);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const COLORS = ["#ba3622", "#851e25", "#520c30", "#1c997f"];

  function separateTasksByDay(
    tasks: (TaskFormFieldsInterface & { day: Date })[]
  ): { [key: string]: (TaskFormFieldsInterface & { day: Date })[] } {
    const tasksByDay: {
      [key: string]: (TaskFormFieldsInterface & { day: Date })[];
    } = {};

    tasks.forEach((task) => {
      const taskDay = task.day.toISOString().split("T")[0]; // Convert Date to ISO string and split to get the date part
      if (!tasksByDay[taskDay]) {
        tasksByDay[taskDay] = [];
      }
      tasksByDay[taskDay].push(task);
    });

    return tasksByDay;
  }

  async function aggregateTaskData() {
    if (!datePickerDate.startDate || !datePickerDate.endDate) return;
    const startDate = datePickerDate.startDate;
    const endDate = datePickerDate.endDate;

    const foundTasks: (TaskFormFieldsInterface & { uid: string; day: Date })[] =
      await functions.readTasksByRange(startDate, endDate);
    const tasksByDay = separateTasksByDay(foundTasks);

    // Calculate scores for each day and create an array of scores
    const localTasksScores: TasksScores[] = Object.keys(tasksByDay).map(
      (day) => {
        const dailyTasks = tasksByDay[day];

        const dayProductivityScore = calculateDayProductivityScore(dailyTasks);
        const dayPlannedTime = calculateDayPlannedTime(dailyTasks);
        const dayStandingTime = calculateDayStandingTime(dailyTasks);

        return {
          name: day,
          ProductivityScore: dayProductivityScore,
          PlannedTime: dayPlannedTime,
          StandingTime: dayStandingTime,
        };
      }
    );

    // Update the local state or perform any necessary action with the calculated scores
    setTasksScores(localTasksScores);
  }

  async function aggregateMonitoringData(newMonitoring: string) {
    if (!datePickerDate.startDate || !datePickerDate.endDate) return;
    const startDate = datePickerDate.startDate;
    const endDate = datePickerDate.endDate;

    const foundTasks: (TaskFormFieldsInterface & { uid: string; day: Date })[] =
      await functions.readTasksWhichContainsTheGivenMonitoring(
        newMonitoring,
        startDate,
        endDate
      );
    const tasksByDay = separateTasksByDay(foundTasks);

    const chartData: TasksMonitoringScores[] = Object.keys(tasksByDay).map(
      (day) => {
        const dailyTasks = tasksByDay[day];

        const productivityScore =
          calculateMonitoringaverageProductivityPerMinute(dailyTasks);

        return {
          name: day,
          ProductivityScore: productivityScore,
        };
      }
    );

    setMonitoringTasksScores(chartData);
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      mt={12}
      mb={12}
    >
      <Button onClick={aggregateTaskData}>Analyse 🔎</Button>

      <Text variant="heading">Graphs</Text>
      <Text variant="paragraph" maxWidth="300px" textAlign="center">
        When you select a range and click analyse, the data will appear below
      </Text>
      <Box mt={12} />

      <ResponsiveContainer width="60%" height={400}>
        <LineChart
          data={tasksScores}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis ticks={[0, 25, 50, 75, 100]} tick={<CustomTick />} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="ProductivityScore"
            stroke={COLORS[0]}
          />
          <Line type="monotone" dataKey="PlannedTime" stroke={COLORS[1]} />
          <Line type="monotone" dataKey="StandingTime" stroke={COLORS[2]} />
        </LineChart>
      </ResponsiveContainer>

      <Text variant="heading">Monitoring Data</Text>
      <Text variant="paragraph" maxWidth="300px" textAlign="center">
        Select a monitoring to see its data on the range selected
      </Text>

      <Select
        placeholder="Select option"
        mt="5"
        maxWidth="400px"
        mb="5"
        onChange={async (e) => {
          const newMonitoring = e.target.value;
          await aggregateMonitoringData(newMonitoring); // Pass the new value directly to the function
        }}
      >
        {monitoringList.map((monitoring, index) => {
          return (
            <option key={index + monitoring} value={monitoring}>
              {monitoring}
            </option>
          );
        })}
      </Select>
      <ResponsiveContainer width="60%" height={400}>
        <LineChart
          data={monitoringTasksScores}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis ticks={[0, 25, 50, 75, 100]} tick={<CustomTick />} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="ProductivityScore"
            stroke={COLORS[0]}
          />
        </LineChart>
      </ResponsiveContainer>

      <MonitoringGridConsistency data={monitoringTasksScores} />
    </Flex>
  );
}
