import React, { FunctionComponent } from "react";
import Link from "next/link";
import clsx from "clsx";
import { UrlObject } from "node:url";

type Props = {
  text: string;
  href: string;
  className?: string;
};

const LinkButton: FunctionComponent<Props> = ({ text, href, className }) => {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center px-5 py-2 font-medium text-center text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-10",
        className
      )}
    >
      {text}
    </Link>
  );
};

export default LinkButton;
