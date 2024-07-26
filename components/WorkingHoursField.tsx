import { useField } from "formik";
import { useState } from "react";
import InputField from "./FormFields/InputField";
import Icon from "./Icon";
import { cn } from "@/utils/cn";

type WorkingHoursFieldProps = {
  name: string;
  label?: string;
  className?: string;
};

type HoursPeriodValue = [string, string];

export default function WorkingHoursField({ name, label, className = "" }: WorkingHoursFieldProps) {
  const [field, meta, helpers] = useField<HoursPeriodValue[]>(name);
  const [totalHoursPeriods, setTotalHoursPeriods] = useState(field.value.length);

  console.log(field.value);
  console.log(totalHoursPeriods);

  return (
    <div className={cn("w-[600px]", className)}>
      {label && <label className="block font-medium text-gray-700 mb-3">{label}</label>}

      {new Array(totalHoursPeriods).fill(0).map((_, i) => {
        return <HoursPeriod value={field.value[i]} />;
      })}

      <button
        type="button"
        className="border-dashed border-purple-200 hover:bg-purple-200 text-purple-500 border-2 block rounded-lg w-full mt-3"
      >
        <Icon name="plus" /> Add period
      </button>
    </div>
  );
}

type HoursPeriodProps = {
  value: HoursPeriodValue;
};

function HoursPeriod({ value }: HoursPeriodProps) {
  const [start, end] = value;

  return (
    <div className="flex gap-2 mb-2">
      <InputField type="time" className="w-1/2" value={start} />
      <Icon name="arrow-right" className="w-5 h-5 mt-3" />
      <InputField type="time" className="w-1/2" value={end} />
      <Icon name="trash" className="w-5 h-5 mt-3 text-red" />
    </div>
  );
}
