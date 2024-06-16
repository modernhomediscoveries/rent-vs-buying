import React, { FC } from "react";
import { Line } from "react-chartjs-2";

// ***** no quites esto que se rompe ******
import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  SubTitle,
  Title,
  Tooltip,
  TooltipItem,
  TooltipModel,
} from "chart.js/auto";
import { kFormat } from "../Utils/number-formatter";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  SubTitle,
  Title,
  Tooltip,
  Legend
);
export type line = Partial<{
  label: string;
  deploy: (number | string)[];
  color: string;
}>;

/** lines: objects that describes the diferent lines in the chart:
 * { label:name of the line,
 * deploy: values to be deployed,
 * color: color of the line(optional)}
 */
const LineChart: FC<
  Partial<{
    lines: line[];
    title: string;
    subtitle: string;
    labels: number[];
    startXAxis: number;
    tooltipTitleLabel: (xAxis: string) => string;
  }>
> = ({ title, subtitle, lines, labels, startXAxis, tooltipTitleLabel }) => {
  const frequency: number[] = [];

  const colors = ["#526D82", "#952323", "#12486B", "#8EA5EB", "#E98EAD"];

  for (let i = 0; i < (lines?.[0].deploy?.length ?? 0); i++) {
    frequency.push(i + (startXAxis ?? 1));
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      tooltip: {
        callbacks: {
          title:
            tooltipTitleLabel &&
            ((context) => context.map((item) => tooltipTitleLabel(item.label))),
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
      legend: {
        labels: {
          pointStyle: "circle",
          usePointStyle: true,
        },
      },

      title: {
        display: title ? true : false,
        text: title ?? "This deploy the data",
      },
      subtitle: {
        display: subtitle ? true : false,
        text: subtitle ?? "No subtitle",
      },
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: 15,
          },
          callback: function (value, index, values) {
            return kFormat(Number(value));
          },
        },
      },
      x: {
        ticks: {},
      },
    },
  };

  const data: ChartData<"line", number[], number> = {
    labels: labels ?? frequency.map((data) => data),
    datasets:
      lines?.map((item) => ({
        label: item.label ?? "",
        data: item.deploy?.map((data) => Number(data)) ?? [],
        pointHoverBackgroundColor: "red",
        pointRadius: 0,
        pointHitRadius: 4,
        pointBorderWidth: 0,
      })) ?? [],
  };

  return (
    <div>
      <Line data={data} options={options} height={600} />
    </div>
  );
};

export default LineChart;
