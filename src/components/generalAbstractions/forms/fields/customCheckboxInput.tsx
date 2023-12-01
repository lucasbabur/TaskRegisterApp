import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";

import { Field } from "formik";

export interface CustomCheckboxInputProps<T> {
  label: string;
  name: keyof T;
  type?: string;
  placeholder?: string;
  mt?: string;
  options: CustomCheckboxOptionsProps[];
}

export interface CustomCheckboxOptionsProps {
  value: string;
  label: string;
}

export function CustomCheckboxInput<T>(props: CustomCheckboxInputProps<T>) {
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

            <Stack direction="column">
              <CheckboxGroup value={field.value}>
                {options.map((option, index) => {
                  var checked = false;

                  for (let i = 0; i < field?.value?.length; i++) {
                    if (field.value[i] == option.value) {
                      checked = true;
                    }
                  }

                  return (
                    <Checkbox
                      key={index}
                      {...field}
                      value={option.value}
                      isChecked={checked}
                    >
                      {option.label}
                    </Checkbox>
                  );
                })}
              </CheckboxGroup>
            </Stack>
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}
