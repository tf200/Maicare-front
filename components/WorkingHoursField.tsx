import { useField } from "formik";
import { useCallback, useState } from "react";
import InputField from "./FormFields/InputField";
import Icon from "./Icon";
import { cn } from "@/utils/cn";

type HourType = `${0 | 1}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `${2}${0 | 1 | 2 | 3}`;
type MinuteType = `${0 | 1 | 2 | 3 | 4 | 5}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;

export type TimeType = `${HourType}:${MinuteType}` | "";
export type TimePeriodValue = [TimeType, TimeType] | ["", ""];

type WorkingHoursFieldProps = {
  name: string;
  label?: string;
  className?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
};

export default function WorkingHoursField({
  name,
  label,
  className = "",
  min = 1,
  max = 5,
  disabled = false,
}: WorkingHoursFieldProps) {
  const [field, meta, helpers] = useField<TimePeriodValue[]>(name);
  const [totalTimePeriods, setTotalTimePeriods] = useState(
    min > field.value.length ? min : field.value.length
  );

  return (
    <div className={cn("w-[600px] mb-5", className)}>
      {label && <label className="block font-medium text-gray-700 mb-3">{label}</label>}
      {meta.touched && meta.error && <div className="text-red text-sm my-2">{meta.error}</div>}

      {new Array(totalTimePeriods).fill(0).map((_, i) => {
        return (
          <TimePeriod
            key={i}
            value={field.value[i] || ["", ""]}
            deletable={totalTimePeriods > min}
            disabled={disabled}
            onChange={(start, end, shouldValidate = false) => {
              helpers.setTouched(true, shouldValidate);
              helpers.setValue(
                [...field.value.slice(0, i), [start, end], ...field.value.slice(i + 1)],
                shouldValidate
              );
            }}
            onDelete={() => {
              helpers.setValue([...field.value.slice(0, i), ...field.value.slice(i + 1)], false);
              setTotalTimePeriods((prevTotalTimePeriods) => prevTotalTimePeriods - 1);
            }}
            onError={(error) => {
              helpers.setError(error);
            }}
          />
        );
      })}

      {totalTimePeriods < max && !disabled && (
        <button
          type="button"
          className="border-dashed bg-purple-200 hover:bg-purple-300 text-purple-500 block rounded-lg w-full mt-3"
          onClick={() =>
            setTotalTimePeriods((prevTotalTimePeriods) =>
              prevTotalTimePeriods < max ? prevTotalTimePeriods + 1 : prevTotalTimePeriods
            )
          }
        >
          <Icon name="plus" /> Add period
        </button>
      )}
    </div>
  );
}

type TimePeriodProps = {
  value: TimePeriodValue;
  onChange: (start: TimeType, end: TimeType, shouldValidate?: boolean) => void;
  onError?: (error: string) => void;
  onDelete?: () => void;
  deletable?: boolean;
  disabled?: boolean;
};

function TimePeriod({
  value,
  onChange,
  onDelete,
  deletable = true,
  disabled = false,
  onError,
}: TimePeriodProps) {
  const [start, end] = value;

  const handleChange = useCallback((start: TimeType, end: TimeType) => {
    if (start && end && compareTime(start, end)) {
      onError?.("Invalid time period!");
    } else if (start === "" || end === "") {
      onError?.("The start and the end of time period shoudn't be emplty!");
    } else {
      onError?.("");
    }

    onChange?.(start, end, false);
  }, []);

  return (
    <div className="flex gap-2 mb-3">
      <InputField
        type="time"
        className="w-1/2 cursor-pointer"
        value={start}
        onChange={(e) => handleChange(e.target.value as TimeType, end)}
        disabled={disabled}
      />
      <Icon name="arrow-right" className="w-5 h-5 mt-3" />
      <InputField
        type="time"
        className="w-1/2 cursor-pointer"
        value={end}
        onChange={(e) => handleChange(start, e.target.value as TimeType)}
        disabled={disabled}
      />
      {deletable && !disabled && (
        <Icon name="trash" className="w-5 h-5 mt-3 text-red cursor-pointer" onClick={onDelete} />
      )}
    </div>
  );
}

// time format HH:MM
function compareTime(start: string, end: string) {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  if (startHour > endHour) {
    return true;
  }

  if (startHour === endHour && startMinute > endMinute) {
    return true;
  }

  return false;
}
