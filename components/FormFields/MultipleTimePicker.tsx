import React, { FunctionComponent } from "react";
import { FormikErrors, useField } from "formik";
import InputField from "@/components/FormFields/InputField";
import Button from "@/components/buttons/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import MinusIcon from "@/components/icons/MinusIcon";

const MultipleTimePicker: FunctionComponent<{
  name: string;
  label: string;
  required?: boolean;
  error?: any;
}> = (props) => {
  const [inputProps, metaProps, helperProps] = useField<string[]>({
    name: props.name,
  });
  return (
    <div className="mb-6">
      <div className="mb-2.5 block text-black dark:text-white">
        {props.label} {props.required && <span className="text-meta-1">*</span>}
      </div>
      <div>
        <div className="flex flex-col gap-2">
          {inputProps.value.map((time, index) => (
            <div className="flex flex-row gap-2">
              <InputField
                key={index}
                className="w-1/4"
                type="time"
                value={time}
                onChange={async (e) => {
                  const newTimes = [...inputProps.value];
                  newTimes[index] = e.target.value;
                  await helperProps.setTouched(true);
                  await helperProps.setValue(newTimes);
                }}
              />
              <Button
                buttonType={"Danger"}
                className="px-4"
                onClick={async () => {
                  await helperProps.setTouched(true);
                  await helperProps.setValue(
                    inputProps.value.filter((_, i) => i !== index)
                  );
                }}
              >
                <MinusIcon className="h-7.5" />
              </Button>
            </div>
          ))}
          <div>
            <Button
              onClick={() => {
                helperProps.setValue([...inputProps.value, ""]);
                helperProps.setTouched(true);
              }}
              className={"px-4"}
            >
              <PlusIcon className="h-7.5" />
            </Button>
          </div>
        </div>
      </div>
      {props.error && (
        <div className="text-red mt-2 text-sm">{props.error}</div>
      )}
    </div>
  );
};

export default MultipleTimePicker;
