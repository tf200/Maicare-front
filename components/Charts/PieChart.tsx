import React, { FunctionComponent, useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useCareTypeRevenue } from "@/utils/stats";
import { cn } from "@/utils/cn";
import { formatPrice } from "@/utils/priceFormatting";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const COLORS = ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF"];

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
    // events: {
    //   mounted: (chart) => {
    //     chart.windowResizeHandler();
    //   },
    // },
  },
  colors: COLORS,
  labels: ["Label1", "Label2", "Label3", "Label4"],
  legend: {
    show: false,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const PieChart: FunctionComponent<{
  series: number[];
  labels: string[];
  height?: number;
}> = ({ series, labels, height }) => {
  const optionsWithLabels = useMemo(() => {
    return {
      ...options,
      labels: labels,
    };
  }, []);
  return (
    <div>
      <ReactApexChart options={optionsWithLabels} series={series} type="donut" height={300} />
      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {labels?.map((item, index) => (
          <Label
            key={index}
            label={item}
            value={series[index] + ""}
            color={COLORS[index % COLORS.length]}
          />
        ))}
      </div>
    </div>
  );
};

const Label: FunctionComponent<{
  label: string;
  value: string;
  color: string;
}> = ({ label, value, color }) => {
  return (
    <div className="w-full px-8 sm:w-1/2">
      <div className="flex w-full items-center">
        <span className={cn(`mr-2 block h-3 w-full max-w-3 rounded-full bg-[${color}]`)}></span>
        <p className="flex w-full justify-between text-sm font-medium text-slate-800  dark:text-white">
          <span> {label} </span>
        </p>
      </div>
    </div>
  );
};

export default PieChart;
