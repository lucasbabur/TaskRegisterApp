import * as React from "react";

import { Box, Button, Flex } from "@chakra-ui/react";

import { useSignal, Signal } from "@preact/signals-react";

import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz";
import { parseJSON } from "date-fns";

import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTasks } from "@/components/generalAbstractions/taskContext/TaskContext";

export function DatepickerComponent() {
  const displayDatepicker = useSignal<boolean>(false);
  const { datePickerDate, setDatePickerDate } = useTasks();

  const setDate = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");

    setDatePickerDate(`${formattedDate}T12:00:00.000Z`);
  };

  const selectedDate = () => {
    let lotalDatePickerDate = datePickerDate.split("T")[0] + "T12:00:00.000Z";

    return new Date(lotalDatePickerDate);
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <Button
        colorScheme="tertiary"
        backgroundColor={"mainColors.tertiary"}
        mt="4"
        onClick={() => {
          displayDatepicker.value = !displayDatepicker.value;
        }}
      >
        {new Date(datePickerDate).toLocaleDateString("pt-BR", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })}
      </Button>
      <Box
        display={displayDatepicker.value == true ? "display" : "none"}
        mt={"2"}
      >
        <Datepicker inline selected={selectedDate()} onChange={setDate} />
      </Box>
    </Flex>
  );
}
