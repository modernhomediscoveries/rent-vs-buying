import { useEffect, useState } from "react";
import "./App.css";
import HomePurchase from "./components/HomePurchase";
import HomeRent from "./components/HomeRent";
import Table from "./components/Table";
import React from "react";
import LineChart from "./components/LineChart";
import { useStore } from "./store";
import Info from "./components/info";

function App() {
  const { calcBuy, calcRent, buyResult, rentResult } = useStore();
  const [result, setResult] = useState<string>();

  function calc() {
    calcBuy();
    calcRent();
  }
  useEffect(() => {
    const sumBuy = buyResult.deploy.reduce<number[]>(
      (acc, item) => acc.concat(item.interest + acc[acc.length - 1]),
      [0]
    );
    const sumRent = rentResult.deploy.reduce<number[]>(
      (acc, item) => acc.concat(item + acc[acc.length - 1]),
      [0]
    );
    if (buyResult.deploy.length != 0)
      setResult(
        (sumBuy[buyResult.finalYear] < sumRent[buyResult.finalYear]
          ? `Buying Is Cheaper`
          : "Renting Is Cheaper") +
          ` Over The Next ${buyResult.finalYear} Years`
      );
  }, [buyResult, rentResult]);

  return (
    <main>
      <div className="flex flex-col md:flex-row justify-between gap-10 bg-[url('/texture-2.png')] bg-center bg-cover">
        <HomePurchase />
        <div className=" w-full flex flex-col">
          <HomeRent />
          <Info />
          <div className="h-full flex justify-center items-end">
            <button
              onClick={() => {
                calc();
              }}
              className="px-10 h-10 bg-[#2AB499] text-white flex justify-between items-center gap-2 hover:bg-[#66fbde] border hover:border-[#2AB499] hover:text-black transition-all"
            >
              Calculate
            </button>
          </div>
        </div>
      </div>

      <h3 className="my-10 text-xl font-bold">{result ?? "..."}</h3>
      <LineChart
        lines={[
          {
            label: "buy",
            deploy: buyResult?.line?.map((item) => item.interest),
          },
          {
            label: "rent",
            deploy: rentResult.deploy,
          },
        ]}
      />
      <div className="mt-10">
        `
        <Table rentInfo={rentResult ?? []} buyInfo={buyResult ?? []} />
      </div>
    </main>
  );
}

export default App;
