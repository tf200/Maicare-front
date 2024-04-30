import React, { FunctionComponent } from "react";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  text: string;
  href: string;
  className?: string;
  target?: string;
};

const LinkButton: FunctionComponent<Props> = ({
  text,
  href,
  target,
  className,
}) => {
  return (
    <Link
      href={href}
      target={target}
      className={clsx(
        "inline-flex rounded-md items-center justify-center px-5 py-2 font-medium text-center text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-10",
        className
      )}
    >
      {text}
    </Link>
  );
};

export default LinkButton;
