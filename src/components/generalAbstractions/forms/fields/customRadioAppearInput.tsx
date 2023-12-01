import {
  FormControl,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  FormErrorMessage,
} from "@chakra-ui/react";

import { Field, useField } from "formik";

export interface Option {
  option: string;
  shallAppearComponents?: boolean;
}

interface CustomRadioFieldInputProps<T> {
  label: string;
  name: keyof T;
  options: Option[];
  mt?: string | number;
  children?: React.ReactNode;
}

export function CustomRadioAppearInput<T>(
  props: CustomRadioFieldInputProps<T>
) {
  // Use Formik's useField to get form state
  const { name, children, options, label, mt } = props;

  const [field, meta, helpers] = useField(name.toString());

  const handleChange = (e: string) => {
    // Update Formik's state
    helpers.setValue(e);
  };

  const renderChildren = () => {
    const selectedOption = options.find(
      (o: Option) => o.option === field.value
    );
    if (selectedOption && selectedOption.shallAppearComponents) {
      return children;
    }
    return null;
  };
  if (options)
    return (
      <Field name={name}>
        {({ field, form }: any) => (
          <FormControl
            mt={mt}
            isInvalid={form.errors[name] && form.touched[name]}
            maxWidth="400px"
          >
            <FormLabel>{label}</FormLabel>
            <RadioGroup
              {...field}
              onChange={(e) => handleChange(e)}
              name={name}
            >
              <Stack spacing={5} direction="row">
                {options.map((option: Option, index: number) => (
                  <Radio key={index} value={option.option}>
                    {option.option}
                  </Radio>
                ))}
              </Stack>
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            </RadioGroup>
            {renderChildren()}
          </FormControl>
        )}
      </Field>
    );

  return null;
}
