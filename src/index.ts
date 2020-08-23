import { writeFileSync, mkdirSync, statSync } from "fs";
import { JSDOM } from "jsdom";
import { DLSITE_URL, client, getSessionIDFromConsole } from "./settings";
import { createChart } from "./createChart";
import { Product, Categories } from "./types";

const isExistDir = (dirPath: string): boolean => {
  try {
    statSync(dirPath)
    return true;
  } catch(e) {
    return false;
  }
}

const getCategories = async (url: string): Promise<string[]> => {
  console.log(`${url}を取得中....`);
  const res = await client.get(url);
  const jsdom = new JSDOM(res.data);
  const document = jsdom.window.document;

  const genre = document.querySelector(".main_genre");
  const arr: string[] = [];
  genre?.querySelectorAll("a").forEach((a) => arr.push(a.innerHTML));
  return arr;
};

const getCategoryRates = async (urls: string[]): Promise<Categories> => {
  const workCategories = await Promise.all(urls.map((url) => getCategories(url)));
  const categories = workCategories.reduce((a, b) => [...a, ...b], []);
  const categoryCount = Array.from(new Set(categories))
    .map((c) => ({ name: c, count: categories.filter((c1) => c1 === c).length }))
    .sort((a, b) => b.count - a.count);
  return categoryCount
    .map(({ name, count }) => ({ [name]: (count * 100) / categories.length }))
    .reduce((a, b) => ({ ...a, ...b }), {});
};
const printCategories = (categories: Categories) => {
  console.log("================================================");

  Object.entries(categories).forEach(([name, rate]) => {
    const r = Math.ceil(rate * 100) / 100;
    console.log(`${name}: ${r}%`);
  });
};

const main = async (): Promise<void> => {
  const sessionId = await getSessionIDFromConsole();
  const res = await client.get<Product>(DLSITE_URL.PRODUCT, { headers: { Cookie: `__DLsite_SID=${sessionId};` } });
  const myProduct = res.data;
  const workURLs: string[] = myProduct.boughts.map((id) => DLSITE_URL.WORK(id));
  const categoryRates = await getCategoryRates(workURLs);

  const buffer = await createChart(categoryRates);
  if(!isExistDir("./output")) mkdirSync("output");
  writeFileSync("./output/analyzed.png", buffer);

  printCategories(categoryRates);
};

main().catch(console.error);
