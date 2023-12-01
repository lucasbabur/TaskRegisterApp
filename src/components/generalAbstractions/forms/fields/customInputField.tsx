import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

import { Field } from "formik";

export interface CustomInputFieldProps<T> {
  label: string;
  name: keyof T;
  type?: string;
  placeholder?: string;
  mt?: string;
}

export function CustomInputField<T>(props: CustomInputFieldProps<T>) {
  let { name, label, mt } = props;

  return (
    <Field name={name}>
      {({ field, form }: any) => {
        return (
          <FormControl
            isInvalid={form.errors[name] && form.touched[name]}
            maxWidth="400px"
            mt={mt}
          >
            <FormLabel mb={0}>{label}</FormLabel>
            <Input {...field} id={name} {...props} />
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}
