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
      className="flex justify-center w-full p-3 font-medium rounded bg-primary text-gray"
    >
      {isLoading ? "Submitting..." : children}
    </button>
  );
};

export default Button;
