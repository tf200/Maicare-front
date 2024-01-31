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
      {isLoading ? (
        <div className="inline-block my-[2px] h-[1.23rem] w-[1.23rem] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
