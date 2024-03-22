import React, { FunctionComponent } from "react";
import { FormikProvider, useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Button from "@/components/buttons/Button";
import * as Yup from "yup";

type ResetPasswordFormType = {
  password: string;
  new_password: string;
  confirm_password: string;
};

const validationSchema: Yup.ObjectSchema<ResetPasswordFormType> = Yup.object({
  password: Yup.string().required("Password is required"),
  new_password: Yup.string().required("New Password is required"),
  confirm_password: Yup.string().required("Confirm Password is required"),
});

const ResetPasswordForm: FunctionComponent = (props) => {
  const formik = useFormik<ResetPasswordFormType>({
    initialValues: {
      password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { handleSubmit, handleChange, values, errors, touched } = formik;
  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          name="password"
          type="password"
          label="Password"
          required={true}
          placeholder={"Enter your password"}
          value={values.password}
          onChange={handleChange}
          error={touched.password && errors.password}
        />
        <InputField
          name="new_password"
          type="password"
          label="New Password"
          required={true}
          placeholder={"Enter your new password"}
          value={values.new_password}
          onChange={handleChange}
          error={touched.new_password && errors.new_password}
        />
        <InputField
          name="confirm_password"
          type="password"
          label="Confirm Password"
          required={true}
          placeholder={"Confirm your new password"}
          value={values.confirm_password}
          onChange={handleChange}
          error={touched.confirm_password && errors.confirm_password}
          className="mb-6"
        />
        <Button formNoValidate={true} type="submit">
          Submit
        </Button>
      </form>
    </FormikProvider>
  );
};

export default ResetPasswordForm;
