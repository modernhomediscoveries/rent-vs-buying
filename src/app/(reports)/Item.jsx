import { formatNumberInput } from "@/app/utils/numberFormatter";
import { EllipsisIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Item = ({ report, setItemId, modal, setModal }) => {
  const [deleteButton, setDeleteButton] = useState(false);

  const addressSplit = report.direction.split(",");
  const trimmedParts = addressSplit.map((part) => part.trim());

  return (
    <div className="relative">
      <div
        className="absolute bg-white hover:bg-[#f3f4f6] top-3 right-3 z-10 cursor-pointer rounded-md px-1"
        onClick={() => {
          setDeleteButton(!deleteButton);
        }}
      >
        <EllipsisIcon />
      </div>
      {deleteButton && (
        <ul className="absolute bg-white hover:bg-[#f3f4f6] top-10 right-3 z-10 cursor-pointer rounded-md transition-all">
          <li
            className="border-b pl-2 pr-5 py-1"
            onClick={() => {
              setDeleteButton(!deleteButton);
              setModal(!modal);
              setItemId(report._id);
            }}
          >
            Delete
          </li>
        </ul>
      )}
      <Link href={`/?reportId=${report._id}`}>
        <div className="bg-white shadow-box rounded-xl min-h-[325px]">
          <Image
            src={report.selectedFile?.url || "/house.png"}
            alt=""
            className={`w-full h-full aspect-video ${
              report.selectedFile?.url ? "rounded-t-xl" : "opacity-40"
            }`}
            width={500}
            height={500}
          />
          <div className="p-3 space-y-2">
            <div>
              <p className="font-semibold line-clamp-2">
                {trimmedParts.slice(0, -1).join(", ") || ""}
              </p>
              <p>{trimmedParts[trimmedParts.length - 1] || ""}</p>
            </div>
            <p>
              <small>Analyzed over {moment(report.createdAt).fromNow()}</small>
            </p>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="font-semibold">Purchase Price</p>
                <p>${formatNumberInput(report.homePurchasePrice)}</p>
              </div>
              <div>
                <p className="font-semibold">Monthly Rent</p>
                <p>${formatNumberInput(report.monthlyRent)}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;
