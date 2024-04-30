import React, { FunctionComponent, useMemo } from "react";
import LazyLineChart from "./LazyLineChart";
import { ApexOptions } from "apexcharts";
import { dateFormat } from "@/utils/timeFormatting";
import { RatingHistory } from "@/types/goals";

const ProgressChart: FunctionComponent<{
  data: RatingHistory;
}> = ({ data }) => {
  const options = useMemo<ApexOptions>(() => {
    return {
      tooltip: {
        y: {
          title: {
            formatter(seriesName: string): string {
              return "Evaluatie";
            },
          },
        },
      },
      xaxis: {
        type: "category",
        labels: {
          formatter(value: string): string | string[] {
            return dateFormat(value);
          },
        },
        categories: data.map((report) => report.date) ?? [],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        title: {
          style: {
            fontSize: "0px",
          },
        },
        min: 0,
        max: 10,
      },
    };
  }, [data]);

  const series = useMemo(() => {
    return [
      {
        name: "Evaluation",
        data: data.map((report) => report.rating) ?? [],
      },
    ];
  }, [data]);
  return <LazyLineChart options={options} series={series} />;
};

export default ProgressChart;
