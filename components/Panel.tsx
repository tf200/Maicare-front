import React, { FunctionComponent, PropsWithChildren } from "react";

type Props = {
  title: string;
  sideActions?: React.ReactNode;
};

const Panel: FunctionComponent<PropsWithChildren<Props>> = ({
  title,
  children,
  sideActions,
}) => {
  return (
    <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark flex justify-between items-center">
        <h3 className="font-medium text-black dark:text-white">{title}</h3>
        <div>{sideActions}</div>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Panel;
