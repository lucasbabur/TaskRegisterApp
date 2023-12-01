import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import {
  productivityScore,
  totalPlannedTimeSpentPercentage,
  totalProductivityScore,
  totalTimeSpent,
  averageProductivityScore,
  EmojiTransformer as ET,
} from "./TaskTableFunctions";

import { useTasks } from "../../generalAbstractions/taskContext/TaskContext";

import { EditModal } from "./EditModal";
import { RemoveButton } from "./RemoveButton";

import React from "react";

export function TaskTable() {
  const { taskDataState } = useTasks();

  return (
    <TableContainer mt={5}>
      <Table variant="simple" size="sm">
        <TableCaption>Tasks of the day</TableCaption>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Task</Th>
            <Th>Start - Finish</Th>
            <Th>🪑 or 🚶‍♂️?</Th>
            <Th>Productivity</Th>
            <Th>Planned?</Th>
            <Th>Influences</Th>
            <Th>Score</Th>
            <Th>Edit</Th>
            <Th>Remove</Th>
          </Tr>
        </Thead>
        <Tbody>
          {taskDataState &&
            taskDataState.map((item, index) => {
              let {
                taskName,
                startTime,
                endTime,
                sittedOrStanding,
                productivityLevel,
                planned,
                influences,
                uid,
              } = item;

              return (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{taskName}</Td>
                  <Td>{startTime + " - " + endTime}</Td>
                  <Td>{ET.sittedOrStanding(sittedOrStanding)}</Td>
                  <Td>{ET.productivityLevel(productivityLevel)}</Td>
                  <Td>{ET.plannedOrUnplanned(planned)}</Td>
                  <Td>{ET.influences(influences)}</Td>
                  <Td>
                    {productivityScore(
                      productivityLevel,
                      startTime,
                      endTime,
                      planned
                    )}
                  </Td>
                  <Td>{uid && <EditModal uid={uid} />}</Td>
                  <Td>{uid && <RemoveButton uid={uid} />}</Td>
                </Tr>
              );
            })}
        </Tbody>
        <Tfoot>
          {taskDataState && (
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>{totalTimeSpent(taskDataState) + " " + "minutes"}</Th>
              <Th></Th>
              <Th>{averageProductivityScore(taskDataState)}</Th>
              <Th>{totalPlannedTimeSpentPercentage(taskDataState) + "%"}</Th>
              <Th></Th>
              <Th>{totalProductivityScore(taskDataState)}</Th>
            </Tr>
          )}
        </Tfoot>
      </Table>
    </TableContainer>
  );
}

export default TaskTable;
