import { Button } from "@chakra-ui/react";

import * as React from "react";
import { Formik, FormikHelpers, Form, FormikValues } from "formik";
import * as Yup from "yup";

export interface FormAbstractionProps<T> {
  children: React.ReactNode;
  validationSchema: Yup.Schema<T>;
  initialValues: T;
  submitButtonText: string;
  submitButtonProps?: any;
  onSubmit: (data: T) => void;
}

export function FormWrapper<T extends FormikValues>(
  superProps: FormAbstractionProps<T>
) {
  const initialValues: T = superProps.initialValues;

  const handleSubmit = (values: T, actions: FormikHelpers<T>) => {
    superProps.onSubmit(values);
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={superProps.validationSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          {superProps.children}

          <Button
            mt={6}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
            {...superProps.submitButtonProps}
          >
            {superProps.submitButtonText}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
