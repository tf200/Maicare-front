import React, { FunctionComponent, PropsWithChildren } from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HealtyTool",
  description: "This is Login Page for HealtyTool",
};

const AuthLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <main className="h-[100vh]">
      <div className="rounded-sm h-full border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center h-full">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" href="/public">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/logo.ico"}
                  alt="Logo"
                  width={90}
                  height={12}
                />
              </Link>

              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
              </p>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
