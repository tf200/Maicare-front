"use client";
import { useState } from "react";
import { InputField } from "@/components/FormFields/InputField";
import UseSignIn from "@/hooks/useSignIn";
import MailIcon from "@/components/icons/MailIcon";
import LockIcon from "@/components/icons/LockIcon";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialAlertState: [string, string] = ["", ""];
  const [alertState, setAlertState] =
    useState<[string, string]>(initialAlertState);

  const router = useRouter();

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
      UseSignIn(values, setIsLoading, setAlertState, router);
    },
  });

  return (
    <div className="p-4 sm:p-12.5 xl:p-17.5">
      <div className="flex flex-col items-center justify-center xl:hidden mb-6">
        <Image
          className="dark:hidden pb-2"
          src={"/images/logo/logo.ico"}
          alt="Logo"
          width={80}
          height={12}
        />
        <p className="2xl:px-20 text-[24px]">
          Health<span className="font-bold">People</span>
        </p>
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
          <button
            disabled={isLoading}
            type="submit"
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          >
            {isLoading ? (
              <div className="inline-block h-[1.23rem] w-[1.23rem] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
        {alertState[0] != "" && (
          <h5
            style={{ color: alertState[1] }}
            className="w-full text-center mb-3 text-md font-semibold text-red"
          >
            {alertState[0]}
          </h5>
        )}
      </form>
    </div>
  );
};

export default SignIn;
