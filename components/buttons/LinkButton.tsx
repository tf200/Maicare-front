import React, { FunctionComponent } from "react";
import Link from "next/link";

type Props = {
  text: string;
  href: string;
};

const LinkButton: FunctionComponent<Props> = ({ text, href }) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center px-5 py-2 font-medium text-center text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
    >
      {text}
    </Link>
  );
};

export default LinkButton;
