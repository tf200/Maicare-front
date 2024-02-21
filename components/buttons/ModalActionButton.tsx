import React, { ButtonHTMLAttributes, FunctionComponent } from "react";
import clsx from "clsx";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  actionType?: "ACKNOWLEDGE" | "CANCEL" | "CANCEL-2" | "CONFIRM" | "DANGER";
};
const ModalActionButton: FunctionComponent<Props> = ({
  actionType,
  className,
  type = "button",
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={clsx(
        "block rounded px-12.5 py-3  text-center font-medium transition disabled:bg-graydark disabled:dark:bg-whiter disabled:dark:text-black disabled:cursor-not-allowed",
        {
          "border-meta-1 text-white bg-meta-1 hover:bg-opacity-90":
            actionType === "DANGER",
          "border bg-primary text-white hover:bg-white hover:text-primary":
            actionType === "ACKNOWLEDGE",
          "border-primary bg-primary text-white hover:bg-opacity-90":
            actionType === "CONFIRM",
          "bg-gray text-black hover:bg-meta-1 hover:text-white":
            actionType === "CANCEL",
          "bg-gray-2 text-black hover:bg-meta-1 hover:text-white":
            actionType === "CANCEL-2",
        },
        className
      )}
    >
      {props.children}
    </button>
  );
};

export default ModalActionButton;
