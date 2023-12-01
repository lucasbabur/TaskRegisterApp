import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";

import InputMask from "react-input-mask";

import { Field } from "formik";

export interface CustomDateInputFieldProps<T> {
  label: string;
  name: keyof T;
  mt?: string;
}

export function CustomDateInputField<T>(props: CustomDateInputFieldProps<T>) {
  let { name, label, mt } = props;
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl
          isInvalid={form.errors[name] && form.touched[name]}
          mt={mt}
          maxWidth="400px"
        >
          <FormLabel>{label}</FormLabel>
          <InputMask
            mask="99/99/9999"
            value={field.value}
            onChange={(e: any) => {
              form.setFieldTouched(name, true); // Manually set touched
              field.onChange(e);
            }}
          >
            {
              // @ts-ignore
              (inputProps: any): React.ReactNode => (
                <Input {...inputProps} id={name} />
              )
            }
          </InputMask>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
