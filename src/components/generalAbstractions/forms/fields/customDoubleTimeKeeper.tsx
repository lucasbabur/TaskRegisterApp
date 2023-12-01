import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Container,
  Flex,
} from "@chakra-ui/react";
import TimeKeeper from "react-timekeeper";

import { Field, useField } from "formik";

export interface DoubleTimeKeeperProps<T> {
  label?: string;
  name: keyof T;
  type?: string;
  placeholder?: string;
  mt?: string;
  reactTimeKeeperProps?: any;
  children?: React.ReactNode;
}

export function CustomDoubleTimeKeeper<T>(props: DoubleTimeKeeperProps<T>) {
  let { name, label, mt } = props;
  const [field, meta, helpers] = useField(name.toString());

  const handleChange = (time: string, isStartTime: boolean) => {
    const [startTime, endTime] = field.value.split(" - ");
    if (isStartTime) {
      helpers.setValue(`${time} - ${endTime || "00:00"}`);
    } else {
      helpers.setValue(`${startTime || "00:00"} - ${time}`);
    }
  };

  return (
    <Field name={name}>
      {({ field, form }: any) => {
        const [startTime, endTime] = field.value
          ? field.value.split(" - ")
          : ["00:00", "00:00"];
        return (
          <FormControl
            isInvalid={form.errors[name] && form.touched[name]}
            mt={mt}
          >
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <TimeKeeper
                time={startTime}
                onChange={(newTime: any) =>
                  handleChange(newTime.formatted24, true)
                }
                {...props.reactTimeKeeperProps}
              />
              {props.children}
              <Button
                backgroundColor={"mainColors.secondary"}
                color="white"
                width="260px"
                onClick={() => {
                  if (field.value == "") return;
                  let [startTime, endTime] = field.value.split(" - ");
                  helpers.setValue(`${endTime} - ${startTime}`);
                }}
                mt="2"
                mb="2"
              >
                Troca
              </Button>
              <TimeKeeper
                time={endTime}
                onChange={(newTime: any) =>
                  handleChange(newTime.formatted24, false)
                }
                {...props.reactTimeKeeperProps}
              />
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            </Flex>
          </FormControl>
        );
      }}
    </Field>
  );
}
