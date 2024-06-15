import React, { useEffect, useState } from "react";
import { useStore } from "../store";
import {
  formatterInputHandlingChange,
  formatterInputHandlingChangeWithValidation,
  numberInterpret,
  numberFormat,
  formatNumberInput,
} from "../Utils/number-formatter";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

export const homePurchaseInitial = {
  values: {
    homePrice: "100,000",
    homeValueAppreciation: "3",
    downPayment: "20",
    interestRate: "5",
    loanTerm: "30",
    finalYear: "30",
    buyClosingCost: "0",
    propertyTax: "1200",
    propertyTaxType: "$",
    homeInsurance: "1000",
    homeInsuranceType: "$",
    HOAFee: "800",
    maintenanceCost: "500",
    maintenanceCostType: "$",
    sellClosingCost: "0",
    closing: "no",
    expenseGrowth: "3",
  },
  validations: {
    homePrice: (s: string) => {
      return Math.min(numberInterpret(s), 100000000);
    },
    downPayment: (s: string) => {
      return Math.min(numberInterpret(s), 100);
    },
    interestRate: (s: string) => {
      return Math.min(numberInterpret(numberInterpret(s).toFixed(3)), 50);
    },
    loanTerm: (s: string) => {
      return Math.min(numberInterpret(s), 30);
    },
    finalYear: (s: string) => {
      return Math.min(numberInterpret(s), 30);
    },
    buyClosingCost: (s: string) => {
      return Math.min(numberInterpret(s), 20);
    },
    propertyTax: (s: string) => {
      return Math.min(numberInterpret(s), 20);
    },
    homeInsurance: (s: string) => {
      return Math.min(numberInterpret(s), 20);
    },
    HOAFee: (s: string) => {
      return Math.min(numberInterpret(s), 10000000);
    },
    maintenanceCost: (s: string) => {
      return Math.min(numberInterpret(s), 20);
    },
    expenseGrowth: (s: string) => {
      return Math.min(numberInterpret(s), 20);
    },
    homeValueAppreciation: (s: string) => {
      return Math.min(numberInterpret(s), 20);
    },
    sellClosingCost: (s: string) => {
      return Math.min(numberInterpret(s), 20);
    },
    default: (s: string) => Math.min(numberInterpret(s), 10000000),
  },
};

function createArrayOfText(text: string) {
  const array = text.split("<space>");
  return array;
}

function HomePurchase() {
  const { fields, fieldsChange } = useStore();
  const [purchaseData, setPurchaseData] = useState(homePurchaseInitial.values);
  const [showWindow, setShowWindow] = useState(-1);
  const [text, setText] = useState<string>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPurchaseData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  function typeHandleChange(name: string, value: string) {
    setPurchaseData((prev) => ({
      ...prev,
      [name]: value,
      [name.replace("Type", "")]: formatNumberInput(
        prev[name.replace("Type", "")],
        homePurchaseInitial.validations[name.replace("Type", "")]
      ),
    }));
  }

  useEffect(() => {
    fieldsChange(purchaseData);
  }, [purchaseData]);
  return (
    <>
      {text && (
        <div className="fixed top-0 left-0 w-full min-h-screen flex justify-center items-center z-50 bg-black bg-opacity-20 backdrop-blur-sm ">
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
      <form className="py-6 px-4 shadow w-full space-y-5 bg-white">
        <h2 className="w-full py-2 bg-gray-800 text-white font-bold text-lg">
          Home Purchase
        </h2>
        <div className="flex flex-col text-start w-full">
          <label>Home Purchase Price:</label>
          <div className="relative md:md:pr-5">
            <input
              name="homePrice"
              value={purchaseData.homePrice}
              onChange={formatterInputHandlingChangeWithValidation(
                handleChange,
                homePurchaseInitial.validations.homePrice
              )}
              type="text"
              className="h-10 px-6 rounded border w-full md:w-2/3"
            />
            <span className="absolute left-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
              $
            </span>
          </div>
        </div>
        <div className="flex flex-col text-start">
          <label>Annual Home Value Appreciation:</label>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 justify-between items-center">
            <div className="relative w-full md:w-2/3">
              <input
                name="homeValueAppreciation"
                value={purchaseData.homeValueAppreciation}
                onChange={formatterInputHandlingChangeWithValidation(
                  handleChange,
                  homePurchaseInitial.validations.homeValueAppreciation
                )}
                type="text"
                className="h-10 px-2 rounded border w-full"
              />
              <span className="absolute right-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
                % - year
              </span>
            </div>
            <div className="w-full md:w-1/3 flex flex-col md:items-start">
              <div className="relative ">
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
                    <TooltipTrigger className="text-[#2ea6e9] text-sm">
                      Whats this?
                    </TooltipTrigger>
                    <TooltipContent className="w-[600px]">
                      <p>
                        {" "}
                        This is the percentage amount that you anticipate your
                        home's value will appreciate on average each year over
                        the duration of your ownership of the property. <br /> A
                        good conservative benchmark is the average US annual
                        inflation rate, which has been just over 3% annually for
                        the last one hundred years.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-start ">
          <label>Purchase Closing Costs:</label>
          <div className="flex justify-between items-center gap-5">
            <div className="relative  w-full md:w-2/3">
              <input
                name="buyClosingCost"
                value={purchaseData.buyClosingCost}
                onChange={formatterInputHandlingChangeWithValidation(
                  handleChange,
                  homePurchaseInitial.validations.buyClosingCost
                )}
                type="text"
                className="h-10 px-2 rounded border w-full"
              />
              <span className="absolute right-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
                %
              </span>
            </div>
            <div className="md:w-1/3 flex flex-col items-start ">
              Financed?
              <div className="flex gap-2">
                <label className="flex gap-1">
                  <input
                    type="radio"
                    name="closing"
                    value={"yes"}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label className="flex gap-1">
                  <input
                    type="radio"
                    name="closing"
                    defaultChecked
                    value={"no"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-start md:pr-5">
          <label>Down Payment:</label>
          <div className="relative w-full md:w-2/3">
            <input
              name="downPayment"
              onChange={formatterInputHandlingChangeWithValidation(
                handleChange,
                homePurchaseInitial.validations.downPayment
              )}
              value={purchaseData.downPayment}
              type="text"
              className="h-10 px-2 rounded border w-full"
            />
            <span className="absolute right-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
              %
            </span>
          </div>
        </div>
        <div className="flex flex-col text-start md:pr-5">
          <label>Interest Rate:</label>
          <div className="relative w-full md:w-2/3">
            <input
              name="interestRate"
              value={purchaseData.interestRate}
              onChange={formatterInputHandlingChangeWithValidation(
                handleChange,
                homePurchaseInitial.validations.interestRate
              )}
              type="text"
              className="h-10 px-2 rounded border w-full"
            />
            <span className="absolute right-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
              %
            </span>
          </div>
        </div>
        <div className="flex flex-col text-start md:pr-5">
          <label>Loan Term:</label>
          <div className="relative w-full md:w-2/3">
            <input
              name="loanTerm"
              value={purchaseData.loanTerm}
              onChange={formatterInputHandlingChangeWithValidation(
                handleChange,
                homePurchaseInitial.validations.loanTerm
              )}
              type="text"
              className="h-10 px-2 rounded border w-full"
            />
            <span className="absolute right-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
              years
            </span>
          </div>
        </div>{" "}
        <div className="flex flex-col text-start">
          <label>Final Year:</label>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 justify-between items-center">
            {" "}
            <div className="relative w-full md:w-2/3">
              <input
                name="finalYear"
                value={purchaseData.finalYear}
                onChange={formatterInputHandlingChangeWithValidation(
                  handleChange,
                  homePurchaseInitial.validations.finalYear
                )}
                type="text"
                className="h-10 px-2 rounded border w-full"
              />
              <span className="absolute right-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
                year
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
                    <TooltipTrigger className="text-[#2ea6e9] text-sm">
                      What is Final Year?
                    </TooltipTrigger>
                    <TooltipContent className="w-[600px]">
                      <p>
                        The Final Year, in this context, refers to the number of
                        years from now when you plan to sell or move out of the
                        property you are renting or purchasing.
                        <br />
                        For example, if you plan to move out in 5 years, then
                        the final year is 5 years from now.
                        <br />
                        This period is crucial for financial planning, as it
                        influences decisions about renting versus buying,
                        mortgage terms, potential capital gains, and overall
                        housing strategy.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-start md:pr-5">
          <label>Property Tax:</label>
          <div className="relative w-full md:w-2/3">
            <input
              name="propertyTax"
              value={purchaseData.propertyTax}
              onChange={formatterInputHandlingChangeWithValidation(
                handleChange,
                fields.propertyTaxType == "%"
                  ? homePurchaseInitial.validations.propertyTax
                  : homePurchaseInitial.validations.default
              )}
              type="text"
              className="h-10 px-2 rounded border w-full"
            />
            <span className="absolute right-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
              <button
                type="button"
                className=" text-[#2ea6e9]"
                onClick={() => {
                  typeHandleChange(
                    "propertyTaxType",
                    fields.propertyTaxType == "%" ? "$" : "%"
                  );
                }}
              >
                {fields.propertyTaxType}
              </button>{" "}
              - year
            </span>
          </div>
        </div>
        <div className="flex flex-col text-start md:pr-5">
          <label>Home Insurance:</label>
          <div className="relative w-full md:w-2/3">
            <input
              name="homeInsurance"
              value={purchaseData.homeInsurance}
              onChange={formatterInputHandlingChangeWithValidation(
                handleChange,
                fields.homeInsuranceType == "%"
                  ? homePurchaseInitial.validations.homeInsurance
                  : homePurchaseInitial.validations.default
              )}
              type="text"
              className="h-10 px-6 rounded border w-full"
            />
            <span className="absolute left-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
              $
            </span>
            <span className="absolute right-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
              <button
                type="button"
                className=" text-[#2ea6e9]"
                onClick={() => {
                  typeHandleChange(
                    "homeInsuranceType",
                    fields.homeInsuranceType == "%" ? "$" : "%"
                  );
                }}
              >
                {fields.homeInsuranceType}
              </button>{" "}
              - year
            </span>
          </div>
        </div>
        <div className="flex flex-col text-start md:pr-5">
          <label>HOA Fee:</label>
          <div className="relative w-full md:w-2/3">
            <input
              name="HOAFee"
              value={purchaseData.HOAFee}
              onChange={formatterInputHandlingChangeWithValidation(
                handleChange,
                homePurchaseInitial.validations.HOAFee
              )}
              type="text"
              className="h-10 px-6 rounded border w-full"
            />
            <span className="absolute left-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
              $
            </span>
            <span className="absolute right-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
              year
            </span>
          </div>
        </div>
        <div className="flex flex-col text-start md:pr-5">
          <label>Maintenance Cost:</label>
          <div className="relative w-full md:w-2/3">
            <input
              name="maintenanceCost"
              value={purchaseData.maintenanceCost}
              onChange={formatterInputHandlingChangeWithValidation(
                handleChange,
                fields.maintenanceCostType == "%"
                  ? homePurchaseInitial.validations.maintenanceCost
                  : homePurchaseInitial.validations.default
              )}
              type="text"
              className="h-10 px-2 rounded border w-full"
            />
            <span className="absolute right-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
              <button
                type="button"
                className=" text-[#2ea6e9]"
                onClick={() => {
                  typeHandleChange(
                    "maintenanceCostType",
                    fields.maintenanceCostType == "%" ? "$" : "%"
                  );
                }}
              >
                {fields.maintenanceCostType}
              </button>{" "}
              - year
            </span>
          </div>
        </div>
        <div className="flex flex-col text-start md:pr-5">
          <label>Expense Growth:</label>
          <div className="relative w-full md:w-2/3">
            <input
              name="expenseGrowth"
              value={purchaseData.expenseGrowth}
              onChange={formatterInputHandlingChangeWithValidation(
                handleChange,
                homePurchaseInitial.validations.expenseGrowth
              )}
              type="text"
              className="h-10 px-2 rounded border w-full"
            />
            <span className="absolute right-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
              %
            </span>
          </div>
        </div>
        <div className="flex flex-col text-start md:pr-5">
          <label>Sale Closing Costs:</label>
          <div className="relative w-full md:w-2/3">
            <input
              name="sellClosingCost"
              value={purchaseData.sellClosingCost}
              onChange={formatterInputHandlingChangeWithValidation(
                handleChange,
                homePurchaseInitial.validations.sellClosingCost
              )}
              type="text"
              className="h-10 px-2 rounded border w-full"
            />
            <span className="absolute right-0 top-0 h-10 px-2 flex justify-center items-center text-gray-500 font-thin">
              %
            </span>
          </div>
        </div>
      </form>
    </>
  );
}

export default HomePurchase;
