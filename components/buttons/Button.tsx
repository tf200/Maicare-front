import React, { ButtonHTMLAttributes, FunctionComponent } from "react";
import LoadingCircle from "@/components/icons/LoadingCircle";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  loadingText?: string;
};

const Button: FunctionComponent<PropsType> = ({
  isLoading = false,
  children,
  type = "button",
  loadingText,
  ...props
}) => {
  return (
    <button
      type={type}
      {...props}
      className="flex justify-center w-full p-3 font-medium rounded bg-primary text-gray"
    >
      {isLoading ? (
        <>
          <span className="animate-spin">
            <LoadingCircle />
          </span>
          <span className="ml-2">{loadingText ?? "Loading..."}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
