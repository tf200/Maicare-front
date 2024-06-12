import React, { FunctionComponent, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Button from "@/components/buttons/Button";
import * as Yup from "yup";
import { useMutation } from "react-query";
import api from "@/utils/api";
import { omit } from "@/utils/omit";

type ResetPasswordFormType = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

type ErrorResponse = {
  response: {
    data: {
      [key: string]: string[];
    };
  };
};

const validationSchema: Yup.ObjectSchema<ResetPasswordFormType> = Yup.object({
  current_password: Yup.string().required("Password is required"),
  new_password: Yup.string().required("New Password is required"),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.new_password === value;
    }),
});

type ChangePasswordFormType = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

type ChangePasswordReqDto = Omit<ChangePasswordFormType, "confirm_password">;

async function changePassword(data: ChangePasswordReqDto) {
  const response = await api.post("change-password/", data);
  return response.data;
}
const useChangePassword = () => {
  return useMutation(changePassword);
};

const ChangePasswordForm: FunctionComponent = (props) => {
  const [sucessMessage, setSucessMessage] = useState(null);
  const {
    mutate: changePassword,
    isLoading,
    error: passwordError,
    isSuccess,
  } = useChangePassword();
  const formik = useFormik<ResetPasswordFormType>({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      changePassword(omit(values, ["confirm_password"]), {
        onSuccess: (data) => {
          setSucessMessage(data.message);
          resetForm();
        },
      });
    },
  });

  const renderPasswordError = () => {
    if (passwordError && (passwordError as ErrorResponse).response) {
      const errorResponse = passwordError as ErrorResponse;
      const { current_password, new_password } = errorResponse.response.data;
      const errorMessages = current_password || new_password || [];

      return errorMessages.map((item, index) => (
        <p key={index} className="text-red">
          • {item}
        </p>
      ));
    }
    return null;
  };

  const { handleSubmit, handleChange, values, errors, touched } = formik;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {renderPasswordError()}
        {sucessMessage && <p className="text-green-500">{sucessMessage}</p>}
        <InputField
          name="current_password"
          type="password"
          label="Password"
          required={true}
          placeholder={"Enter your password"}
          value={values.current_password}
          onChange={handleChange}
          error={touched.current_password && errors.current_password}
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
        <Button isLoading={isLoading} formNoValidate={true} type="submit">
          Change Password
        </Button>
      </form>
    </FormikProvider>
  );
};

export default ChangePasswordForm;
