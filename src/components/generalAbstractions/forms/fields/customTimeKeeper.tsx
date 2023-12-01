import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";
import TimeKeeper from "react-timekeeper";

import { Field, useField, FieldHookConfig } from "formik";

export interface CustomTimeKeeper<T> {
  label?: string;
  name: keyof T;
  type?: string;
  placeholder?: string;
  mt?: string;
  reactTimeKeeperProps?: any;
  setTimeExternal?: string; // This is used as a prop to set the time externally
}

export function CustomTimeKeeper<T>(props: CustomTimeKeeper<T>) {
  let { name, label, mt } = props;
  const [field, meta, helpers] = useField(name.toString());

  if (props.setTimeExternal) {
    if (
      props.setTimeExternal.includes(":") &&
      props.setTimeExternal.length > 2 &&
      props.setTimeExternal.length < 6
    ) {
      new Error("Invalid time format." + props.setTimeExternal + " Use HH:MM");
    }
    helpers.setValue(props.setTimeExternal);
  }

  const handleChange = (e: string) => {
    helpers.setValue(e);
  };

  return (
    <Field name={name}>
      {({ field, form }: any) => {
        return (
          <FormControl
            isInvalid={form.errors[name] && form.touched[name]}
            maxWidth="400px"
            mt={mt}
          >
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <FormLabel>{label}</FormLabel>
              <TimeKeeper
                time={field.value ? field.value : "00:00"}
                onChange={(newTime: any) => handleChange(newTime.formatted24)}
                switchToMinuteOnHourSelect
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
