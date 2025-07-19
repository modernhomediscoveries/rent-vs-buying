import { kFormat } from "@/app/utils/numberFormatter";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ lines, labels, startXAxis }) => {
 const frequency = [];
  const dataLength = lines?.[0]?.deploy?.length ?? 31; // Default to 31 points (0-30)
  for (let i = 0; i < dataLength; i++) {
    frequency.push(i); // Now starts at 0
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      tooltip: {
        position: "nearest",
        padding: 5,
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 16,
        },
        callbacks: {
          title: function (tooltipItems) {
            return `Year ${tooltipItems[0].label}`;
          },
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
          color: "black",
        },
      },
    },
    scales: {
      y: {
        border: {
          dash: [0, 4],
          color: "black",
        },
        ticks: {
          font: {
            size: 16,
          },
          color: "black",
          callback: function (value) {
            return kFormat(Number(value));
          },
        },
        grid: {
          color: (context) =>
            context.tick.value === 0 ? "black" : "transparent",
          lineWidth: (context) => (context.tick.value === 0 ? 0 : 1),
        },
      },
      x: {
        ticks: {
          color: "black",
        },
        grid: {
          display: true,
          color: (ctx) => {
            return ctx.index === 0 || ctx.index === frequency.length - 1
              ? "black"
              : "transparent";
          },
          lineWidth: (ctx) => {
            return ctx.index === 0 || ctx.index === frequency.length - 1
              ? 2
              : 1;
          },
        },
        border: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels: labels || frequency.map((data) => data),
    datasets: lines?.map((item, index) => ({
      label: item.label || "",
      data: item.deploy?.map((data) => Number(data)) || [],
      borderColor: index === 0 ? "#36a2eb" : "#EB4747",
      backgroundColor: index === 0 ? "#36a2eb" : "#EB4747",
      pointHoverBackgroundColor: index === 0 ? "#36a2eb" : "#EB4747",
      pointHitRadius: 4,
      pointRadius: 0,
    })),
  };

  return (
    <Line
      data={data}
      options={options}
      className="font-bold"
    />
  );
};

export default LineChart;
