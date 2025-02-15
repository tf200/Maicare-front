"use client";
import React, { useState } from "react";
import UseSignIn from "@/hooks/useSignIn";
import MailIcon from "@/components/icons/MailIcon";
import LockIcon from "@/components/icons/LockIcon";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputFieldBig } from "@/components/FormFields/InputFieldBig";

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialAlertState: [string, string] = ["", ""];
  const [alertState, setAlertState] = useState<[string, string]>(initialAlertState);

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
      UseSignIn(values, setIsLoading, setAlertState);
    },
  });

  return (
    <div className="p-4 sm:p-12.5 xl:p-17.5">
      <div className="flex flex-col items-center justify-center mb-6 xl:hidden">
        <Image
          className="pb-2 dark:hidden"
          src={"/images/logo/logo.png"}
          alt="Logo"
          width={80}
          height={12}
        />
        <p className="2xl:px-20 text-[24px]">
          MAI<span className="font-bold">Care</span>
        </p>
      </div>
      <h2 className="text-2xl font-bold text-slate-800  mb-9 dark:text-white sm:text-title-xl2">
        Meld u aan op de website
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <InputFieldBig
          label="gebruikersnaam"
          type="text"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && formik.errors.username ? formik.errors.username : null}
          placeholder="Typ je gebruikersnaam"
          icon={<MailIcon />}
        />

        <InputFieldBig
          label="Typ je wachtwoord"
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password ? formik.errors.password : null}
          placeholder="6+ tekens, 1 hoofdletter"
          className="mb-8"
          icon={<LockIcon />}
        />
        <div className="mb-5">
          <button
            disabled={isLoading}
            type="submit"
            className="w-full p-4 text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
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
            className="w-full mb-3 font-semibold text-center text-md text-red-600"
          >
            {alertState[0]}
          </h5>
        )}
      </form>
    </div>
  );
};

export default SignIn;
