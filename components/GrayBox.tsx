import React, { FunctionComponent, PropsWithChildren } from "react";

const GrayBox: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mb-6 bg-gray rounded-md p-4 dark:bg-graydark dark:text-white">
      {children}
    </div>
  );
};

export default GrayBox;
