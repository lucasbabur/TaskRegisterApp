import * as React from "react";

import { Grid, GridItem, Box, Text, Flex } from "@chakra-ui/react";

import { TasksMonitoringScores } from "../AnalysisCharts";

export function MonitoringGridConsistency(props: {
  data: TasksMonitoringScores[];
}) {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap={6}
      p="4"
      m="4"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
    >
      {props.data.map((item) => {
        return (
          <GridItem
            key={item.name}
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
            p="8"
            m="2"
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bg="white.100"
          >
            <Text>{item.name}</Text>
            <Text fontSize="md" fontWeight="bold">
              ✅
            </Text>
          </GridItem>
        );
      })}
    </Grid>
  );
}
