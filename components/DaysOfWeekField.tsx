import { cn } from "@/utils/cn";
import { useField } from "formik";
import { useCallback } from "react";

type DaysOfWeekFieldProps = {
  name: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
};

export type WeekDayType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export default function DaysOfWeekField({
  name,
  label,
  className = "",
  disabled = false,
  required = false,
}: DaysOfWeekFieldProps) {
  const [field, meta, helpers] = useField<WeekDayType[]>(name);

  const handleChange = useCallback(
    (day: WeekDayType) => {
      if (field.value.includes(day)) {
        const newDays = field.value.filter((d) => d !== day);
        helpers.setValue(newDays, false);

        // Handle formik errors
        if (required && newDays.length === 0) {
          helpers.setError("This field is required, select some day!");
        } else {
          helpers.setError("");
        }
      } else {
        const newDays = [...field.value, day].sort();
        helpers.setValue(newDays, false);

        // Handle formik errors
        if (required && newDays.length > 0) {
          helpers.setError("");
        }
      }
    },
    [field.value, disabled]
  );

  return (
    <div className={cn("mb-5", className)}>
      {label && <label className="block font-medium text-gray-700 mb-3">{label}</label>}
      {DAYS_OF_WEEK.map((day, i) => {
        return (
          <DayButton
            content={day}
            key={day}
            selected={field.value.includes(i as WeekDayType)}
            onClick={() => handleChange(i as WeekDayType)}
            disabled={disabled}
          />
        );
      })}

      {meta.error && <div className="text-red text-sm my-2">{meta.error}</div>}
    </div>
  );
}

type DayButtonProps = {
  content: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

function DayButton({ content, selected = false, disabled = false, onClick }: DayButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "bg-blue-300 text-white w-[70px] h-[30px] rounded-lg mb-2 mr-2",
        selected ? (disabled ? "!bg-body font-bold" : "!bg-primary font-bold") : "",
        disabled && "bg-bodydark cursor-default"
      )}
      onClick={disabled ? () => {} : onClick}
    >
      {content}
    </button>
  );
}
