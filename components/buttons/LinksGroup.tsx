"use client";

import React, { FunctionComponent } from "react";
import { LinkOption } from "@/types/selection-option";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  options: LinkOption[];
};

const ButtonsGroup: FunctionComponent<Props> = ({ options }) => {
  const pathname = usePathname();

  function isActive({ getIsActive, href }: LinkOption) {
    return getIsActive ? getIsActive(pathname, href) : pathname.startsWith(href);
  }
  return (
    <div className="flex items-center">
      <div className="flex gap-2 rounded-xl p-3 bg-white shadow overflow-hidden">
        {options.map((option) => (
          <Link
            key={option.href}
            href={option.href}
            className={clsx(
              "inline-flex border rounded-lg py-1 px-2 sm:py-2 sm:px-5 font-medium hover:border-primary hover:bg-primary hover:text-white dark:hover:border-primary",
              {
                "border-primary bg-primary text-white": isActive(option),
                "text-black bg-white border-none": !isActive(option),
              }
            )}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ButtonsGroup;
