import readline from "readline";
import { CanvasRenderService } from "chartjs-node-canvas";
import axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
export const getSessionIDFromConsole = (): Promise<string> =>
  new Promise((resolve) =>
    rl.question("SessionIDを入力してください\n> ", (id) => {
      rl.close();
      resolve(id);
    }),
  );

export const DLSITE_URL = {
  USER_BUY: "https://ssl.dlsite.com/maniax/mypage/userbuy",
  PRODUCT: "https://ssl.dlsite.com/maniax/load/bought/product",
  WORK: (productID: string) => `https://www.dlsite.com/maniax/work/=/product_id/${productID}.html`,
} as const;

export const CHART_WIDTH = 1000;
export const CHART_HEIGHT = 1000;

export const canvasRenderService = new CanvasRenderService(CHART_WIDTH, CHART_HEIGHT, (ChartJS) => {
  ChartJS.plugins.register({
    beforeDraw: (chartInstance) => {
      const ctx = chartInstance.ctx;
      if (!ctx) return;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, chartInstance.width || CHART_WIDTH, chartInstance.height || CHART_HEIGHT);
    },
  });
});

axiosCookieJarSupport(axios);
export const client = axios.create({
  jar: true,
  withCredentials: true,
});
