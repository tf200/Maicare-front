import React, { FunctionComponent, ReactNode } from "react";

type Props = {
  title: ReactNode;
  children: ReactNode;
};

const DataCard: FunctionComponent<Props> = ({ title, children }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h2 className="text-title-md font-bold text-slate-800  dark:text-white">{title}</h2>
      {children}
    </div>
  );
};

export default DataCard;
