import { cn } from "@/utils/cn";
import { useField } from "formik";

type DaysOfWeekSelectProps = {
  name: string;
  label?: string;
};

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export function DaysOfWeekSelect({ name, label = "" }: DaysOfWeekSelectProps) {
  const [field, meta, helpers] = useField<number[]>(name);

  const handleChange = (day: number) => {
    if (field.value.includes(day)) {
      helpers.setValue(field.value.filter((d) => d !== day));
    } else {
      helpers.setValue([...field.value, day].sort());
    }
  };

  return (
    <div>
      <label className="block font-medium text-gray-700 mb-3">{label}</label>
      {DAYS_OF_WEEK.map((day, i) => {
        return (
          <DayButton
            content={day}
            key={day}
            selected={field.value.includes(i)}
            onClick={() => handleChange(i)}
          />
        );
      })}
    </div>
  );
}

type DayButtonProps = {
  content: string;
  selected?: boolean;
  onClick?: () => void;
};

function DayButton({ content, selected = false, onClick }: DayButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "bg-blue-300 text-white w-[70px] h-[30px] rounded-lg mb-2 mr-2",
        selected && "bg-primary font-bold"
      )}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
