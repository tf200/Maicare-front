import { ApexOptions } from "apexcharts";
import React, { FunctionComponent, useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const MOCK_PROGRESS_REPORTS_DATA = [
  {
    date: "2024-03-01",
    evaluation: 5, // out of 10
  },
  {
    date: "2024-03-02",
    evaluation: 10, // out of 10
  },
  {
    date: "2024-03-03",
    evaluation: 8, // out of 10
  },
  {
    date: "2024-03-04",
    evaluation: 7, // out of 10
  },
  {
    date: "2024-03-05",
    evaluation: 9, // out of 10
  },
  {
    date: "2024-03-06",
    evaluation: 3, // out of 10
  },
  {
    date: "2024-03-07",
    evaluation: 5, // out of 10
  },
  {
    date: "2024-03-08",
    evaluation: 6, // out of 10
  },
];

const OPTIONS: ApexOptions = {
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
};

const GoalProgress: FunctionComponent = () => {
  const options = useMemo(() => {
    return {
      ...OPTIONS,
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: MOCK_PROGRESS_REPORTS_DATA.map((report) => report.date),
      },
      yaxis: {
        max: 10,
        min: 0,
        tickAmount: 5,
      },
    };
  }, []);

  const series = useMemo(() => {
    return [
      {
        name: "Evaluation",
        data: MOCK_PROGRESS_REPORTS_DATA.map((report) => report.evaluation),
      },
    ];
  }, []);
  return (
    <div>
      <ReactApexChart
        width={"100%"}
        height={350}
        options={options}
        series={series}
      />
    </div>
  );
};

export default GoalProgress;
