import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import {
  productivityOptions,
  plannedOrUnplannedOptions,
  sittedOrStandingOptions,
} from "../../../config/forms/taskRegistrationForm/optionsData";

import { Flex, Text, Box } from "@chakra-ui/react";

import { useTasks } from "@/components/generalAbstractions/taskContext/TaskContext";
import { CustomRadioButtonOptionsObject } from "@/components/generalAbstractions/forms";

import * as React from "react";

interface OptionsDataProps {
  [key: string]: any;
}

function removeEveryTextButEmojis(text: string) {
  const regex = /[\u0000-\u1eeff]/g; // Regex to remove all characters aside from emojis
  return text.replace(regex, "");
}

export function TaskCharts() {
  const { taskDataState, taskFunctions } = useTasks();
  const COLORS = ["#ba3622", "#851e25", "#520c30", "#1c997f"];

  function aggregateData(options: OptionsDataProps[], key: string): any[] {
    const initialData: { [key: string]: number } = options.reduce(
      (acc, option) => {
        acc[option.value] = 0;
        return acc;
      },
      {}
    );

    taskDataState.forEach((task: any) => {
      const timeSpent = taskFunctions.minutesInATask(
        task.startTime,
        task.endTime
      );
      initialData[task[key]] += timeSpent;
    });

    return options.map((option) => ({
      name: removeEveryTextButEmojis(option.label),
      time: initialData[option.value],
    }));
  }

  const productivityDataChart = aggregateData(
    productivityOptions,
    "productivityLevel"
  );
  const plannedOrUnplannedDataChart = aggregateData(
    plannedOrUnplannedOptions,
    "planned"
  );
  const sittedOrStandingDataChart = aggregateData(
    sittedOrStandingOptions,
    "sittedOrStanding"
  );

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      mt={12}
      mb={12}
    >
      <Text variant="heading">Graphs</Text>
      <Text variant="paragraph">Important graphs</Text>
      <Box mt={12} />
      <Text variant="paragraph" mb={5}>
        Time per productivity level
      </Text>
      <ResponsiveContainer width={400} height={250}>
        <BarChart
          width={400}
          height={250}
          data={productivityDataChart}
          margin={{ right: 36.8 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="time" />
          <Tooltip />
          <Bar dataKey="time" fill="#ba3622" />
        </BarChart>
      </ResponsiveContainer>
      <Box mt={6} />
      <ResponsiveContainer width={400} height={300}>
        <PieChart width={400} height={300} margin={{ left: 10 }}>
          <Pie
            data={productivityDataChart}
            dataKey="time"
            nameKey="name"
            outerRadius={120}
            cx="50%"
            cy="50%"
          >
            {productivityDataChart.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <Text variant="paragraph" mt={6}>
        Planned time
      </Text>
      <ResponsiveContainer width={400} height={300}>
        <PieChart width={400} height={300} margin={{ left: 10 }}>
          <Pie
            data={plannedOrUnplannedDataChart}
            dataKey="time"
            nameKey="name"
            outerRadius={120}
            cx="50%"
            cy="50%"
          >
            {plannedOrUnplannedDataChart.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <Text variant="paragraph" mt={6}>
        Sitted time
      </Text>
      <ResponsiveContainer width={400} height={300}>
        <PieChart width={400} height={300} margin={{ left: 10 }}>
          <Pie
            data={sittedOrStandingDataChart}
            dataKey="time"
            nameKey="name"
            outerRadius={120}
            cx="50%"
            cy="50%"
          >
            {sittedOrStandingDataChart.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Flex>
  );
}
