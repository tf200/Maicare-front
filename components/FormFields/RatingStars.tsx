import React from "react";
import StarIcon from "../svg/StarIcon";
import { useGetGoal } from "@/utils/goal/getGoal";
import { useParams } from "next/navigation";
import { useField } from "formik";
import { cn } from "@/utils/cn";

interface RatingProps {
  label?: string;
  name: string;
  required?: boolean;
  className?: string;
}

const StarIconComponent: React.FC<{
  width: number;
  selected: boolean;
  height: number;
}> = ({ width, height, selected }) => {
  return (
    <>
      {selected ? (
        <StarIcon width={width} height={height} color="#FACA15" />
      ) : (
        <StarIcon width={width} height={height} color="gray" />
      )}
    </>
  );
};

const Rating: React.FC<RatingProps> = ({
  label,
  name,
  required,
  className,
}) => {
  const [fieldInput, meta, helpers] = useField<number>({
    name,
  });

  const handleClick = async (newValue: number) => {
    await helpers.setTouched(true);
    helpers.setValue(newValue);
  };

  return (
    <div className={cn(className, "pb-3 w-fit")}>
      {label && (
        <label
          htmlFor={"rate"}
          className="mb-2.5 block text-black dark:text-white"
        >
          {label} {required && <span className="text-meta-1">*</span>}
        </label>
      )}

      <div className="flex" id="rate">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
          <div
            className="cursor-pointer"
            onClick={() => {
              handleClick(index);
            }}
            key={index}
          >
            <StarIconComponent
              key={index}
              width={23}
              height={23}
              selected={index <= fieldInput.value ? true : false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rating;
