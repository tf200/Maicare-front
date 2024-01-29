import React, {FunctionComponent, InputHTMLAttributes, ReactNode} from "react";

type InputFieldType = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  icon?: ReactNode
}

export const InputField: FunctionComponent<InputFieldType> = ({
  label,
  className,
  icon,
  id,
  ...props
                                                       }) => {
  return (
    <div className={"mb-4"}>
      <label htmlFor={id} className="mb-2.5 block font-medium text-black dark:text-white">
        {label}
      </label>
      <div className="relative">
        <input
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          id={id}
          {...props}
        />
        {icon && <span className="absolute right-4 top-4">
          {icon}
        </span>}
      </div>
    </div>
  )
}
