import React, { ButtonHTMLAttributes, FunctionComponent } from "react";
import clsx from "clsx";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  actionType?: "ACKNOWLEDGE" | "CANCEL" | "CONFIRM" | "DANGER";
};
const ModalActionButton: FunctionComponent<Props> = ({
  actionType,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        "block rounded px-12.5 py-3  text-center font-medium transition",
        {
          "border-meta-1 text-white bg-meta-1 hover:bg-opacity-90":
            actionType === "DANGER",
          "border bg-primary text-white hover:bg-white hover:text-primary":
            actionType === "ACKNOWLEDGE",
          "border-primary bg-primary text-white hover:bg-opacity-90":
            actionType === "CONFIRM",
          "bg-gray text-black hover:bg-meta-1 hover:text-white":
            actionType === "CANCEL",
        },
        className
      )}
    >
      {props.children}
    </button>
  );
};

export default ModalActionButton;
