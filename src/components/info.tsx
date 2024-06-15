import React, { useEffect, useState } from "react";
import { useStore } from "../store";
import {
  formatterInputHandlingChange,
  formatterInputHandlingChangeWithValidation,
  numberInterpret,
} from "../Utils/number-formatter";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

export const rentInit = {
  values: {
    averageInvestmentReturn: "0",
    rentalIncome: "0",
    rentalIncomeGrowth: "0",
  },
  validations: {
    averageInvestmentReturn: (s: string) => {
      return Math.min(numberInterpret(s), 20);
    },
    rentalIncome: (s: string) => {
      return Math.min(numberInterpret(s), 1000000);
    },
    rentalIncomeGrowth: (s: string) => {
      return Math.min(numberInterpret(s), 20);
    },
  },
};

export default function Info() {
  const { fieldsChange } = useStore();
  const [homeRent, setHomeRent] = useState(rentInit.values);
  const [text, setText] = useState<string>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setHomeRent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  useEffect(() => {
    fieldsChange(homeRent);
  }, [homeRent]);

  function createArrayOfText(text: string) {
    const array = text.split("<space>");
    return array;
  }
  return (
    <>
      {text && (
        <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center z-50 bg-black bg-opacity-20 backdrop-blur-sm">
          <div className="w-[700px] max-w-full bg-white rounded py-8 px-4">
            <div className="flex justify-end mb-4">
              {" "}
              <button
                onClick={() => {
                  setText("");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-4 font-light text-start space-y-2">
              {createArrayOfText(text).map((item, index) => {
                return (
                  <p key={index} className="index">
                    {item}
                  </p>
                );
              })}
            </div>
            <hr className="my-8" />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setText("");
                }}
                className="bg-gray-900 text-white px-4 py-1 rounded text-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <form className="space-y-5 py-6 px-4 shadow bg-white">
        <h2 className="w-full py-2 bg-gray-800 text-white font-bold text-lg">
          Your Information
        </h2>
        <div className="flex flex-col text-start">
          <label>Average Investment Return:</label>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 justify-between items-center">
            {" "}
            <div className="relative w-full md:w-2/3">
              <input
                name="averageInvestmentReturn"
                value={homeRent.averageInvestmentReturn}
                onChange={formatterInputHandlingChangeWithValidation(
                  handleChange,
                  rentInit.validations.averageInvestmentReturn
                )}
                type="text"
                className="h-10 px-2 rounded border w-full"
              />
              <span className="absolute right-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
                %
              </span>
            </div>
            <div className="w-full md:w-1/3 flex flex-col md:items-start">
              <div className="">
                {" "}
                <p className="flex items-center text-[#9CA3AF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 "
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  HELP
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-[#2ea6e9] text-sm text-start">
                      Whats this?
                    </TooltipTrigger>
                    <TooltipContent className="w-[600px]">
                      <p>
                        Average Investment Return refers to the typical annual
                        earnings your investments generate over time.
                        Historically, the 30-year return of the S&P 500 has
                        averaged around 10–12%. <br /> When you purchase a home,
                        whether with cash or a down payment, you incur an
                        opportunity cost. This means the money used for the home
                        purchase isn't available for other investments that
                        could potentially yield returns.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-start">
          <label>Rental Income:</label>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 justify-between items-center">
            {" "}
            <div className="relative w-full md:w-2/3">
              <input
                name="rentalIncome"
                value={homeRent.rentalIncome}
                onChange={formatterInputHandlingChangeWithValidation(
                  handleChange,
                  rentInit.validations.rentalIncome
                )}
                type="text"
                className="h-10 px-2 pl-6 rounded border w-full"
              />
              <span className="absolute left-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
                $
              </span>
            </div>
            <div className="w-full md:w-1/3 flex flex-col md:items-start">
              <div className="">
                {" "}
                <p className="flex items-center text-[#9CA3AF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 "
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  HELP
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-[#2ea6e9] text-sm text-start">
                      Whats this?
                    </TooltipTrigger>
                    <TooltipContent className="w-[600px]">
                      <p>
                        This refers to the estimated monthly income you expect
                        to receive from roommates, renting out a second unit, or
                        other rental arrangements after purchasing your home.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-start">
          <label>Rental Income Growth:</label>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 justify-between items-center">
            {" "}
            <div className="relative w-full md:w-2/3">
              <input
                name="rentalIncomeGrowth"
                value={homeRent.rentalIncomeGrowth}
                onChange={formatterInputHandlingChangeWithValidation(
                  handleChange,
                  rentInit.validations.rentalIncomeGrowth
                )}
                type="text"
                className="h-10 px-2 rounded border w-full"
              />
              <span className="absolute right-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
                %
              </span>
            </div>
            <div className="w-full md:w-1/3 flex flex-col md:items-start">
              <div className="">
                {" "}
                <p className="flex items-center text-[#9CA3AF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 "
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  HELP
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-[#2ea6e9] text-sm text-start">
                      Whats this?
                    </TooltipTrigger>
                    <TooltipContent className="w-[600px]">
                      <p>
                        Rental Income Growth is the amount you anticipate your
                        rental income to increase each year. A good benchmark
                        could be the average inflation rate.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
