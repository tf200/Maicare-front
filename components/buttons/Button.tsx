import React, { ButtonHTMLAttributes, FunctionComponent } from "react";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

const Button: FunctionComponent<PropsType> = ({
  isLoading = false,
  children,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      {...props}
      className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
    >
      {isLoading ? "Submitting..." : children}
    </button>
  );
};

export default Button;
