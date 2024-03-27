"use client";
import React from "react";
import DataStatsThree from "../DataStats/DataStatsThree";
import ChartSeven from "../Charts/ChartSeven";
import ToDoList from "../Todo/ToDoList";

const Charts: React.FC = () => {
  return (
    <>
      <DataStatsThree />

      <div className="mt-7.5 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-7">
          <ChartSeven />
        </div>
        <ToDoList />
      </div>
    </>
  );
};

export default Charts;
