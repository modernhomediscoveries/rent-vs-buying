import React, { FC } from "react";
import { buyCalc, rentCalc } from "../logic";
import { numberFormat } from "../Utils/number-formatter";

const Table: FC<{
  rentInfo: ReturnType<typeof rentCalc>;
  buyInfo: ReturnType<typeof buyCalc>;
}> = ({ buyInfo, rentInfo }) => {
  return (
    <div className="overflow-x-auto">
      {" "}
      <table className="min-w-full divide-y divide-gray-200 shadow overflow-hidden sm:rounded-lg">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th
              scope="col"
              className="px-6  text-left text-xs font-medium uppercase tracking-wider"
            >
              Staying Length
            </th>
            <th
              scope="col"
              className="  text-left text-xs font-medium uppercase tracking-wider border-x"
            >
              <div className="text-center py-2">
                <p>Average Buying Cost</p>
              </div>
              <div className="flex justify-between border-t px-6 py-2 ">
                <div className="">
                  <p>Monthly</p>
                </div>
                <div className="">
                  <p>Annual</p>
                </div>
              </div>
            </th>
            <th
              scope="col"
              className="text-left text-xs font-medium uppercase tracking-wider border-x"
            >
              <div className="text-center py-2">
                <p>Average Renting Cost</p>
              </div>
              <div className="flex justify-between border-t px-6 py-2 ">
                <div className="">
                  <p>Monthly</p>
                </div>
                <div className="">
                  <p>Annual</p>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {buyInfo.deploy.slice(0, buyInfo.finalYear).map((item, index) => (
            <tr key={index} className="even:bg-slate-100">
              <td className="px-6 py-4 whitespace-nowrap border-r">
                <div className="">
                  <p>{index + 1} Year</p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex justify-between gap-10">
                  <p>${numberFormat(item.interest)}</p>
                  <p>${numberFormat(item.totalPaid)}</p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-l">
                <div className="flex justify-between gap-10">
                  <p>${numberFormat(rentInfo.deploy[index])}</p>
                  <p>${numberFormat(rentInfo.sum[index])}</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
