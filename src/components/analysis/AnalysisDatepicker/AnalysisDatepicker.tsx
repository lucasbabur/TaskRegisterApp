import * as React from "react";

import { Box, Button, Flex } from "@chakra-ui/react";

import { useSignal } from "@preact/signals-react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAnalysis } from "@/components/generalAbstractions/analysisContext/AnalysisContext";

export function DatepickerAnalysisComponent() {
  const displayDatepicker = useSignal<boolean>(false);
  const { setDatePickerDate, datePickerDate } = useAnalysis();

  const setDate = (dates: any) => {
    const [start, end] = dates;
    setDatePickerDate({
      startDate: start,
      endDate: end,
    });
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
        {datePickerDate.startDate?.toLocaleDateString("pt-BR", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })}{" "}
        -{" "}
        {datePickerDate.endDate?.toLocaleDateString("pt-BR", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })}
      </Button>
      <Box
        display={displayDatepicker.value == true ? "flex" : "none"}
        mt={"2"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Datepicker
          inline
          selected={datePickerDate.startDate}
          startDate={datePickerDate.startDate}
          endDate={datePickerDate.endDate}
          onChange={setDate}
          selectsRange
        />
      </Box>
    </Flex>
  );
}
