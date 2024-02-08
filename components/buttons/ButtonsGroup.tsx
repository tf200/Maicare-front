import React, { FunctionComponent } from "react";
import { ButtonOption } from "@/types/selection-option";
import Button from "@/components/buttons/Button";
import clsx from "clsx";

type Props = {
  options: ButtonOption[];
  selectedOption: ButtonOption;
  onOptionChange: (option: ButtonOption) => void;
};

/**
 * ButtonsGroup component
 * @param options
 * @param selectedOption active option is selected based on the value, feel free to provide immutable options and selectedOption
 * @param onOptionChange
 * @constructor
 */
const ButtonsGroup: FunctionComponent<Props> = ({
  options,
  selectedOption,
  onOptionChange,
}) => {
  return (
    <div className="flex items-center">
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={() => onOptionChange(option)}
          className={clsx(
            "inline-flex border py-1 px-2 font-medium text-white hover:border-primary hover:bg-primary hover:text-white dark:hover:border-primary sm:py-3 sm:px-6",
            {
              "border-primary bg-primary":
                option.value === selectedOption.value,
              "border-stroke": option.value !== selectedOption.value,
            }
          )}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default ButtonsGroup;
