import React, { FunctionComponent, useMemo, useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useInflowsOutflows } from "@/utils/stats";
import { monthFormat, monthYearFormat } from "@/utils/timeFormatting";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    // events: {
    //   beforeMount: (chart) => {
    //     chart.windowResizeHandler();
    //   },
    // },
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [],
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
    // max: 100,
  },
};

const InflowOutflow: FunctionComponent = (props) => {
  const { data } = useInflowsOutflows();
  const optionsWithCategories = useMemo(() => {
    if (!data) return options;
    return {
      ...options,
      xaxis: {
        ...options.xaxis,
        categories: data.map((item) => monthFormat(item.date)),
      },
    };
  }, [data]);
  const series = useMemo(() => {
    if (!data) return [];
    return [
      {
        name: "Kosten",
        data: data.map((item) => item.outflow),
      },
      {
        name: "Inkomen",
        data: data.map((item) => item.inflow),
      },
    ];
  }, [data]);
  return (
    <>
      <div className="flex w-full flex-wrap gap-3 sm:gap-5 pl-5">
        <div className="flex min-w-47.5">
          <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
          </span>
          <div className="w-full">
            <p className="font-semibold text-primary">Kosten</p>
            {data && (
              <p className="text-sm font-medium">
                {monthYearFormat(data[0]?.date)} -{" "}
                {monthYearFormat(data[data.length - 1]?.date)}
              </p>
            )}
          </div>
        </div>
        <div className="flex">
          <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
          </span>
          <div className="w-full">
            <p className="font-semibold text-secondary">Inkomen</p>
            {data && (
              <p className="text-sm font-medium">
                {monthYearFormat(data[0]?.date)} -{" "}
                {monthYearFormat(data[data.length - 1]?.date)}
              </p>
            )}
          </div>
        </div>
      </div>
      <ReactApexChart
        options={optionsWithCategories}
        series={series}
        width={"100%"}
        type="area"
        height={350}
      />
    </>
  );
};

export default InflowOutflow;

const Legend: FunctionComponent<{
  className: string;
}> = () => {
  return (
    <div className="flex min-w-47.5">
      <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
        <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
      </span>
      <div className="w-full">
        <p className="font-semibold text-primary">Outflows</p>
        <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
      </div>
    </div>
  );
};
