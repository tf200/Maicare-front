import React, { FunctionComponent } from "react";
import { ButtonOption } from "@/types/selection-option";
import Button from "@/components/buttons/Button";
import clsx from "clsx";

type Props = {
  options: ButtonOption[];
  selectedOption?: ButtonOption["value"];
  onOptionClicked: (option: ButtonOption) => void;
};

/**
 * ButtonsGroup component
 * @param options
 * @param selectedOption active option is selected based on the value, feel free to provide immutable options and selectedOption
 * @param onOptionChange
 * @constructor
 */
const ToolbarButtonsGroup: FunctionComponent<Props> = ({
  options,
  selectedOption,
  onOptionClicked,
}) => {
  return (
    <div className="flex items-center">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onOptionClicked(option)}
          className={clsx(
            "inline-flex border py-2 px-4 font-medium hover:border-primary hover:bg-primary hover:text-white dark:hover:border-primary first:rounded-l-full first:pl-6 last:rounded-r-full last:pr-6",
            {
              "border-primary bg-primary text-white":
                option.value === selectedOption,
              "border-primary text-primary": option.value !== selectedOption,
            }
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ToolbarButtonsGroup;
