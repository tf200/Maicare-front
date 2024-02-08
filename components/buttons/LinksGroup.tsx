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
    return getIsActive
      ? getIsActive(pathname, href)
      : pathname.startsWith(href);
  }
  return (
    <div className="flex items-center mb-4.5">
      {options.map((option) => (
        <Link
          key={option.href}
          href={option.href}
          className={clsx(
            "inline-flex border py-1 px-2 font-medium hover:border-primary hover:bg-primary hover:text-white dark:hover:border-primary sm:py-3 sm:px-6",
            {
              "border-primary bg-primary text-white": isActive(option),
              "border-stroke text-black bg-white": !isActive(option),
            }
          )}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
};

export default ButtonsGroup;
