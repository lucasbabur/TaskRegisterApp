import React from "react";

import { Container, Text } from "@chakra-ui/react";

import {
  Navbar,
  NavbarButton,
  NavbarItem,
  NavbarLogo,
  NavbarToggleColorModeButton,
} from "../components/home/Navbar/index";

import { TaskRegistrationForm } from "../config/forms/taskRegistrationForm";
import { TaskTable } from "../components/home/TaskTable";
import { TaskCharts } from "../components/home/TaskCharts";
import { DatepickerComponent } from "../components/home/Datepicker";
import { TaskProvider } from "@/components/generalAbstractions/taskContext/TaskContext";

export default function Swibc() {
  return (
    <>
      <TaskProvider>
        <Container>
          <TaskRegistrationForm
            afterSubmitFunction={(task, setTaskDataState, taskDataState) => {
              setTaskDataState([...taskDataState, task]);
            }}
          />

          <DatepickerComponent />
        </Container>

        <TaskTable />
        <TaskCharts />
      </TaskProvider>
    </>
  );
}
