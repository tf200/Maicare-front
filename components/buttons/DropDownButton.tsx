import { cn } from "@/utils/cn";
import React, { Children, useState } from "react";

type DropDownButtonProps = {
  items: {
    title: string;
    disabled?: boolean;
    onClickHandler: () => void;
  }[];
  children: React.ReactNode;
  btnClassName?: string;
};

function DropDownButton({ items, children, btnClassName }: DropDownButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Handle mouse enter event
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Handle mouse leave event
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {items.length && (
        <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700 absolute -left-52 -bottom-22">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" hidden={!isHovered}>
            {items.map((item) => (
              <li>
                <button
                  onClick={item.onClickHandler}
                  className={cn(
                    "px-4 py-2 hover:bg-c_gray disabled:hover:bg-white disabled:opacity-60 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white w-full  text-left"
                  )}
                  disabled={item.disabled}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropDownButton;
