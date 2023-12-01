import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";

import { Field } from "formik";

export interface CustomSelectFieldProps<T> {
  label: string;
  name: keyof T;
  options: { value: string; label: string }[];
  mt?: string;
}

export function CustomSelectField<T>(props: CustomSelectFieldProps<T>) {
  let { name, label, options, mt } = props;
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl
          isInvalid={form.errors[name] && form.touched[name]}
          maxWidth="400px"
          mt={mt}
        >
          <FormLabel>{label}</FormLabel>
          <Select {...field} id={name}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
