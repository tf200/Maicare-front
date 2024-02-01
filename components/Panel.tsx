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
    <div className="mb-10 bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between py-4 border-b border-stroke px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">{title}</h3>
        <div>{sideActions}</div>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Panel;
