import LoginPopup from "@/app/components/auth/LoginPopup";
import Alert from "@/app/components/common/Alert";
import Loading from "@/app/components/common/Loading";
import Modal from "@/app/components/common/Modal";
import { useStore } from "@/app/store";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

const HouseInf = ({ isPrinting, handlePrint, reportId }) => {
  const { fields, fieldsChange } = useStore();
  const { isAuth, userEmail } = useAuth();

  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState({
    variant: "",
    text: "",
  });

  const [clickedForSaved, setClickedForSaved] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    fieldsChange({ selectedFile: file });
  };

  const saveReportHandler = () => {
    setLoading(true);
    setAlerts({ variant: "", text: "" });

    if (fields.selectedFile) {
      if (fields.selectedFile.url) {
        axios
          .post("/api/report", {
            reportId,
            reportData: {
              ...fields,
            },
          })
          .then(() => {
            setLoading(false);
            setAlerts({
              variant: "success",
              text: "Your report has been saved!",
            });
          })
          .catch(() => {
            setLoading(false);
            setAlerts({
              variant: "error",
              text: "There was an error saving your report. Please try again.",
            });
          });
      } else {
        const formData = new FormData();
        formData.append("file", fields.selectedFile);
        formData.append("upload_preset", "report");
        formData.append("folder", "report");
        axios
          .post(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
            formData
          )
          .then((photoRes) => {
            axios
              .post("/api/report", {
                reportId,
                deletePrevPhoto: true,
                reportData: {
                  ...fields,
                  userEmail: userEmail,
                  selectedFile: {
                    url: photoRes.data.url,
                    publicId: photoRes.data.public_id,
                  },
                },
              })
              .then(() => {
                setLoading(false);
                setAlerts({
                  variant: "success",
                  text: "Your report has been saved!",
                });
              })
              .catch(() => {
                setLoading(false);
                setAlerts({
                  variant: "error",
                  text: "There was an error saving your report. Please try again.",
                });
              });
          })
          .catch(() => {
            setLoading(false);
            setAlerts({
              variant: "error",
              text: "There was an error saving your report. Please try again.",
            });
          });
      }
    } else {
      axios
        .post("/api/report", {
          reportId,
          reportData: {
            ...fields,
            userEmail: userEmail,
          },
        })
        .then(() => {
          setLoading(false);
          setAlerts({
            variant: "success",
            text: "Your report has been saved!",
          });
        })
        .catch(() => {
          setLoading(false);
          setAlerts({
            variant: "error",
            text: "There was an error saving your report. Please try again.",
          });
        });
    }
  };

  return (
    <div>
      <div className="font-bold">
        <p className="text-xl py-1.5">{fields.direction}</p>
        <hr className="h-0.5 bg-gray w-[calc(100%+32px)] -ml-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 items-center mt-4 gap-4">
          <label className="text-gray-600 w-full">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              value={""}
            />
            <div className="aspect-video bg-gray-100 flex justify-center items-center overflow-hidden cursor-pointer">
              {fields.selectedFile ? (
                <Image
                  src={
                    fields.selectedFile.url ||
                    URL.createObjectURL(fields.selectedFile)
                  }
                  alt="Selected Image"
                  width={600}
                  height={500}
                  className="object-cover w-full h-full"
                />
              ) : (
                <p className="text-center text-[#2f3758] hover:text-primary_green transition">
                  Add Photo
                </p>
              )}
            </div>
          </label>
          <div>
            <div className="flex-1 flex items-center">
              <div className="px-4 pb-4 pt-4 md:pt-0">
                <h2>PROPERTY DETAILS</h2>
                <div className="mt-3 flex justify-between flex-wrap gap-4">
                  <p>
                    Bedrooms: <span>{fields.bedrooms}</span>
                  </p>
                  <p>
                    Bathrooms: <span>{fields.bathrooms || ""}</span>
                  </p>
                  <p>
                    Sq ft.: <span>{fields.sqFt || ""}</span>
                  </p>
                  <p>
                    Year built: <span>{fields.yearBuild || ""}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 w-full print:hidden gap-4 font-normal">
              <button
                className="bg-primary_green hover:bg-primary_green/80 transition-all text-white px-4 py-2 cursor-pointer rounded-full"
                onClick={
                  isAuth ? saveReportHandler : () => setClickedForSaved(true)
                }
              >
                Save Report
              </button>
              <button
                className="bg-primary_green hover:bg-primary_green/80 transition-all text-white px-4 py-2 cursor-pointer rounded-full"
                onClick={handlePrint}
              >
                Print PDF
              </button>
            </div>
          </div>
        </div>
        <p className="block mt-3">
          Property Description: <span>{fields.description || ""}</span>
        </p>
        {loading && <Loading />}
        <Alert text={alerts.text} />
        {clickedForSaved && (
          <Modal>
            <LoginPopup onClick={() => setClickedForSaved(false)} />
          </Modal>
        )}
      </div>
      {fields.description.length > 1080 && <div className="page-break" />}
    </div>
  );
};

export default HouseInf;
