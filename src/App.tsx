import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import HomePurchase from "./components/HomePurchase";
import HomeRent from "./components/HomeRent";
import Table from "./components/Table";
import React from "react";
import LineChart from "./components/LineChart";
import { useStore } from "./store";
import Info from "./components/info";
import { cn } from "./lib/utils";

function App() {
  const { calcBuy, calcRent, buyResult, rentResult } = useStore();
  const [result, setResult] = useState<string>();
  const [isPrinting, setIsPrinting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  // We store the resolve Promise being used in `onBeforeGetContent` here
  const promiseResolveRef: {
    current:
      | ((
          // sections
          value: any
        ) => void)
      | null;
  } = useRef(null);

  // We watch for the state to change here, and for the Promise resolve to be available
  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      setTimeout(() => {
        if (isPrinting && promiseResolveRef.current)
          promiseResolveRef.current("");
      }, 1000);
    }
  }, [isPrinting]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      });
    },
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
  });

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

  useEffect(() => {
    let currentDocumentHeight = 0;

    const sendMessageUpdatingHeight = (height: number) => {
      window.parent.postMessage(
        { eventName: "SET_HEIGHT", payload: { height } },
        "*"
      );
    };

    const handleDocumentMutation = () => {
      const documentHeight = document.body.scrollHeight;

      if (documentHeight && documentHeight !== currentDocumentHeight) {
        currentDocumentHeight = documentHeight;
        console.log(documentHeight);
        sendMessageUpdatingHeight(documentHeight);
      }
    };

    const observer = new MutationObserver(handleDocumentMutation);

    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      childList: true,
      characterData: true,
    });
  }, []);

  return (
    <main
      ref={printRef}
      className={cn(
        isPrinting ? "w-[800px] px-4 min-h-screen text-center" : ""
      )}
    >
      <div
        className={cn(
          "flex flex-col md:flex-row justify-between gap-10 bg-center bg-cover",
          isPrinting ? "" : "bg-[url('/texture-2.png')]"
        )}
      >
        <HomePurchase />
        <div className=" w-full flex flex-col print:break-before-page">
          <HomeRent />
          <hr className="print:break-before-page print:mb-8" />
          <Info />
          <div
            className={cn(
              "h-full flex justify-center items-end",
              isPrinting ? "hidden" : ""
            )}
          >
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
      {result && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handlePrint}
            className={cn(
              "px-8 h-10 bg-[#2AB499] text-white flex justify-between items-center gap-3 hover:bg-[#66fbde] border hover:border-[#2AB499] hover:text-black transition-all",
              isPrinting ? "hidden" : ""
            )}
          >
            <p>Print</p>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
              />
            </svg>
          </button>
        </div>
      )}

      <h3 className="my-10 text-xl font-bold print:break-before-page">
        {result ?? "..."}
      </h3>
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
      <div className="mt-10 print:break-before-page">
        `
        <Table rentInfo={rentResult ?? []} buyInfo={buyResult ?? []} />
      </div>
    </main>
  );
}

export default App;
