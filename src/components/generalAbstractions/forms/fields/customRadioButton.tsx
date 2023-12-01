import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

import { Field } from "formik";

export interface CustomRadioButtonProps<T> {
  label: string;
  name: keyof T;
  type?: string;
  placeholder?: string;
  mt?: string;
  options: CustomRadioButtonOptionsObject[];
}

export interface CustomRadioButtonOptionsObject {
  value: string;
  label: string;
}

export function CustomRadioButton<T>(props: CustomRadioButtonProps<T>) {
  let { name, label, mt, options } = props;

  return (
    <Field name={name}>
      {({ field, form }: any) => {
        return (
          <FormControl
            isInvalid={form.errors[name] && form.touched[name]}
            maxWidth="400px"
            mt={mt}
          >
            <FormLabel>{label}</FormLabel>
            <RadioGroup
              {...field}
              id={props.name}
              display="flex"
              variant="filled"
            >
              <Stack direction="row">
                {options.map((option, index) => {
                  return (
                    <Radio
                      {...field}
                      key={index + option.value.toString()}
                      value={option.value}
                    >
                      {option.label}
                    </Radio>
                  );
                })}
              </Stack>
            </RadioGroup>
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}
