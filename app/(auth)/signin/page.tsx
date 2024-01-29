"use client";
import { useState } from "react";
import { InputField } from "@/components/FormFields/InputField";
import useSignIn from "@/hooks/useSignIn";
import MailIcon from "@/components/icons/MailIcon";
import LockIcon from "@/components/icons/LockIcon";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [älertMessage, setAlertMessage] = useState<string>("");
  const classes = useStyles();

  const requiredMessage = "This field is required.";
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(requiredMessage),
      password: Yup.string().required(requiredMessage),
    }),
    onSubmit: (values) => {
      console.log(values);
      useSignIn(values, setIsLoading, setAlertMessage);
    },
  });

  return (
    <div className="p-4 sm:p-12.5 xl:p-17.5">
      <div className="flex justify-center">
          <Image
            className="dark:hidden xl:hidden mb-6"
            src={"/images/logo/logo.ico"}
            alt="Logo"
            width={90}
            height={12}
          />
      </div>
      <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Sign In to the website
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <InputField
          label="User Name"
          type="text"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.username && formik.errors.username
              ? formik.errors.username
              : null
          }
          placeholder="Enter your user name"
          icon={<MailIcon />}
        />

        <InputField
          label="Type Password"
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : null
          }
          placeholder="6+ Characters, 1 Capital letter"
          icon={<LockIcon />}
        />
        <div className="mb-5">
          <LoadingButton
            loadingIndicator={
              <CircularProgress
                size={26}
                className={classes.customCircularProgress}
              />
            }
            loading={isLoading}
            className={classes.loadingButton}
            type="submit"
          >
            <span className="normal-case text-[16px]">Sign In</span>
          </LoadingButton>
        </div>
        <h5 className="w-full text-center mb-3 text-lg font-semibold text-red">
          {älertMessage}
        </h5>
      </form>
    </div>
  );
};

export default SignIn;

const useStyles = makeStyles(() => ({
  loadingButton: {
    "&:hover": {
      backgroundColor: "#4F61E3",
    },
    width: "100%",
    cursor: "pointer",
    borderRadius: "8px",
    borderWidth: "1px",
    color: "white",
    backgroundColor: "#3C50E0",
    paddingTop: "16px",
    paddingBottom: "16px",
  },
  customCircularProgress: {
    color: "white",
  },
}));
