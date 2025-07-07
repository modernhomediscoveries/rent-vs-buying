"use client";

import CostToBuy from "@/app/(home)/home/CostToBuy";
import CostToRent from "@/app/(home)/home/CostToRent";
import OtherInfo from "@/app/(home)/home/OtherInfo";
import PropertyInformation from "@/app/(home)/home/PropertyInformation";
import HouseInf from "@/app/(home)/results/HouseInf";
import LineChart from "@/app/(home)/results/LineChart";
import ResultsTable from "@/app/(home)/results/ResultsTable";
import Loading from "@/app/components/common/Loading";
import ProgressBar from "@/app/components/ProgressBar";
import Sidebar from "@/app/components/Sidebar";
import { useStore } from "@/app/store";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const Page = () => {
  const [result, setResult] = useState(false);
  const [chartResult, setChartResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    isPrinting,
    setIsPrinting,
    fieldsChange,
    buyResult,
    rentResult,
    calcBuy,
    calcRent,
  } = useStore();
  const printRef = useRef(null);

  const searchParams = useSearchParams();
  const reportId = searchParams.get("reportId");

  useEffect(() => {
    printRef.current?.scrollTo(0, 0);
  }, [printRef]);

  const promiseResolveRef = useRef(null);

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
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
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
  });

  useEffect(() => {
    calcBuy();
    calcRent();
  }, [calcBuy, calcRent, result]);

  useEffect(() => {
    const sumBuy = buyResult.deploy.reduce(
      (acc, item) => acc.concat(item.interest + acc[acc.length - 1]),
      [0]
    );
    const sumRent = rentResult.deploy.reduce(
      (acc, item) => acc.concat(item + acc[acc.length - 1]),
      [0]
    );
    if (buyResult.deploy.length != 0)
      setChartResult(
        (sumBuy[buyResult.finalYear] < sumRent[buyResult.finalYear]
          ? `Renting Is Cheaper`
          : "Buying Is Cheaper") + ` Over The Next ${buyResult.finalYear} Years`
      );
  }, [buyResult.deploy, buyResult.finalYear, rentResult.deploy]);

  useEffect(() => {
    let currentDocumentHeight = 0;
    const sendMessageUpdatingHeight = (height) => {
      window.parent.postMessage(
        { eventName: "SET_HEIGHT", payload: { height } },
        "*"
      );
    };
    const handleDocumentMutation = () => {
      const documentHeight = document.body.scrollHeight;
      if (documentHeight && documentHeight !== currentDocumentHeight) {
        currentDocumentHeight = documentHeight;
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

  useEffect(() => {
    if (reportId) {
      setLoading(true);
      setResult(true);
      axios
        .get(`/api/report/${reportId}`)
        .then((res) => {
          if (res.data) {
            fieldsChange(res.data);
            calcBuy();
            calcRent();
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [calcBuy, calcRent, fieldsChange, reportId]);

  return (
    <>
      {result ? (
        <main
          id="resultShow"
          ref={printRef}
          className={`m-auto font-medium bg-white w-full ${
            isPrinting
              ? "w-[800px] px-1 md:px-3 py-3"
              : "h-screen px-1 md:px-3 py-3 max-w-[77rem] overflow-auto scroll-smooth no-scrollbar"
          }`}
        >
          <div className="flex flex-col gap-3 w-full max-w-[77rem] px-3 rounded-2xl shadow-box print:gap-2">
            <HouseInf
              setResults={setResult}
              isPrinting={isPrinting}
              handlePrint={handlePrint}
              reportId={reportId || ""}
            />
            <div>
              <h2 className="font-bold text-xl mb-2">{chartResult}</h2>
              <LineChart
                lines={[
                  {
                    label: "Buy",
                    deploy: buyResult?.line?.map((item) => item.interestRate),
                  },
                  {
                    label: "Rent",
                    deploy: rentResult.deploy,
                  },
                ]}
              />
            </div>
            <ResultsTable
              rentInfo={rentResult ?? []}
              buyInfo={buyResult ?? []}
            />
            <div className="transition-all font-bold border-t-2 py-2 -ml-4 w-[calc(100%+32px)] text-center">
              <button onClick={() => setResult(false)} className="print:opacity-0 hover:text-primary_green">
                {"<"} BACK TO ANALYSIS {">"}
              </button>
            </div>
          </div>
        </main>
      ) : (
        <main className="flex flex-col items-center justify-between pt-[76px] w-full max-w-full m-auto relative font-bold h-screen scroll-smooth no-scrollbar overflow-auto overflow-x-hidden overscroll-auto">
          <ProgressBar />
          <div className="flex w-full max-w-[77rem] px-1 md:px-3 gap-0 md:gap-3 relative">
            <div className="w-0 md:w-[288px] shrink-0 h-1">
              <Sidebar setResults={setResult} />
            </div>
            <div className="w-full">
              <PropertyInformation />
              <CostToBuy />
              <CostToRent />
              <OtherInfo setResults={setResult} />
            </div>
          </div>
        </main>
      )}
      {loading && <Loading />}
    </>
  );
};

export default Page;
