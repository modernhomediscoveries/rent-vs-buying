"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useStore } from "../store";

const SidebarButton = ({ label, targetId, completed }) => (
  <button
    onClick={() => document.getElementById(targetId)?.scrollIntoView()}
    className="flex justify-between items-center w-full border-b-[1px] py-3 hover:text-primary_green font-bold text-[#2f3748]"
  >
    {label} {">"}
    {completed && (
      <svg
        fill="#2ab499"
        width="20px"
        height="20px"
        viewBox="-3.5 0 19 19"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#2ab499"
      >
        <path d="M4.63 15.638a1.028 1.028 0 0 1-.79-.37L.36 11.09a1.03 1.03 0 1 1 1.58-1.316l2.535 3.043L9.958 3.32a1.029 1.029 0 0 1 1.783 1.03L5.52 15.122a1.03 1.03 0 0 1-.803.511.89.89 0 0 1-.088.004z" />
      </svg>
    )}
  </button>
);

const Sidebar = ({ setResults }) => {
  const { fields, setProgress, fieldsChange } = useStore();
  const [imageUrl, setImageUrl] = useState(null);
  const prevFileRef = useRef(null);
  const [propertyDone, setPropertyDone] = useState(false);
  const [buyDone, setBuyDone] = useState(false);
  const [rentDone, setRentDone] = useState(false);
  const [otherDone, setOtherDone] = useState(false);

  useEffect(() => {
    return () => {
      if (imageUrl && !fields.selectedFile?.url) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl, fields.selectedFile]);

  useEffect(() => {
    if (fields.selectedFile && prevFileRef.current !== fields.selectedFile) {
      prevFileRef.current = fields.selectedFile;
      if (fields.selectedFile.url) {
        setImageUrl(fields.selectedFile.url);
      } else {
        if (imageUrl) URL.revokeObjectURL(imageUrl);
        setImageUrl(URL.createObjectURL(fields.selectedFile));
      }
    } else if (!fields.selectedFile) {
      setImageUrl(null);
    }
  }, [fields.selectedFile, imageUrl]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    fieldsChange({ selectedFile: file });
  };

  useEffect(() => {
    setPropertyDone(fields.direction);
    setBuyDone(
      fields.homePurchasePrice && fields.finalYear && fields.downPayment
    );
    setRentDone(fields.monthlyRent);
    setOtherDone(
      fields.direction &&
        fields.homePurchasePrice &&
        fields.finalYear &&
        fields.downPayment &&
        fields.monthlyRent
    );
  }, [fields]);

  useEffect(() => {
    setProgress(
      (propertyDone ? 1 : 0) + (buyDone ? 1 : 0) + (rentDone ? 1 : 0)
    );
  }, [buyDone, propertyDone, rentDone, setProgress]);

  return (
    <div className="bg-white md:fixed shadow-box min-[300px]:hidden md:block rounded-2xl">
      <div className="flex flex-col items-center justify-center w-72 bg-white p-3 pb-0 rounded-2xl">
        <label className="text-gray-600 font-medium w-full pb-4">
          <input type="file" className="hidden" onChange={handleFileChange} />
          <div className="relative w-full aspect-video bg-gray-100 cursor-pointer flex justify-center items-center">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Selected Image"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <p className="text-center font-bold text-[#2f3758] hover:text-primary_green transition">
                Add Photo
              </p>
            )}
            {imageUrl && (
              <div className="absolute top-0 left-0 w-full h-full bg-black flex justify-center items-center bg-opacity-40 z-20">
                <p className="text-center font-bold text-white hover:text-primary_green transition">
                  Change Photo
                </p>
              </div>
            )}
          </div>
        </label>
        <hr className="h-0.5 bg-gray w-full" />
        <div className="w-full text-center">
          <SidebarButton
            label="PROPERTY INFORMATION"
            targetId="property"
            completed={propertyDone}
          />
          <SidebarButton
            label="COST TO BUY"
            targetId="costToBuy"
            completed={buyDone}
          />
          <SidebarButton
            label="COST TO RENT"
            targetId="costToRent"
            completed={rentDone}
          />
          <SidebarButton
            label="OTHER INFORMATION"
            targetId="otherInfo"
            completed={otherDone}
          />
          <button
            onClick={() => {
              if (propertyDone && buyDone && rentDone) setResults(true);
              setTimeout(() => {
                document
                  .querySelector("main")
                  ?.scrollTo(
                    0,
                    document.getElementById("resultShow")?.offsetTop ?? 0
                  );
              });
            }}
            className="w-full my-3 text-[#2f3748] hover:text-primary_green transition-all font-bold"
          >
            {"<"} UPDATE: ANALYSIS {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
