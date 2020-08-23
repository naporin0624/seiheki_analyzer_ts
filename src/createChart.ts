import { ChartData } from "chart.js";
import { canvasRenderService } from "./settings";
import { Categories } from "./types";

const getRandomColor = (): string => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r},${g},${b}, 0.3)`;
};

const createChartData = (args: { [key: string]: number }): ChartData => {
  const _args: { [key: string]: number } = JSON.parse(JSON.stringify(args));
  _args["その他"] = 0;
  Object.entries(_args).forEach(([key, value]) => {
    if (value > 1) return;

    _args["その他"] += value;
    if (key !== "その他") delete _args[key];
  });

  return {
    labels: Object.keys(_args),
    datasets: [
      {
        label: "seiheki_analyzer",
        data: Object.values(_args),
        backgroundColor: Object.values(_args).map(() => getRandomColor()),
      },
    ],
  };
};

export const createChart = (data: Categories): Promise<Buffer> => {
  return canvasRenderService.renderToBuffer({
    type: "pie",
    data: createChartData(data),
    options: { legend: { labels: { fontColor: "#000", fontSize: 20, fontStyle: "bold" } } },
  });
};
