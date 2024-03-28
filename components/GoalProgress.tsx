import { ApexOptions } from "apexcharts";
import React, { FunctionComponent, useMemo } from "react";
import { useParams } from "next/navigation";
import { useGetGoal } from "@/utils/goal/getGoal";
import dynamic from "next/dynamic";
import { number, string } from "yup";
import { dateFormat } from "@/utils/timeFormatting";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

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
    curve: "smooth",
  },
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
  title: {
    text: "Evaluatie",
    align: "left",
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

const GoalProgress: FunctionComponent<{
  goalId: number;
}> = ({ goalId }) => {
  const { clientId } = useParams();

  const {
    data: goalReportsData,
    isLoading: isGoalLoading,
    isError: isGetGoalError,
  } = useGetGoal(goalId, parseInt(clientId as string));

  const options: ApexOptions = useMemo(() => {
    return {
      ...OPTIONS,
      chart: {
        id: "basic-bar",
      },
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
        categories:
          goalReportsData?.goals_report.map((report) => report.created_at) ??
          [],
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
  }, [goalReportsData]);

  const series = useMemo(() => {
    return [
      {
        name: "Evaluation",
        data:
          goalReportsData?.goals_report.map((report) => report.rating) ?? [],
      },
    ];
  }, [goalReportsData]);
  return (
    <div>
      {goalReportsData && (
        <ReactApexChart
          width={"100%"}
          height={350}
          options={options}
          series={series}
          type="line"
        />
      )}
    </div>
  );
};

export default GoalProgress;
