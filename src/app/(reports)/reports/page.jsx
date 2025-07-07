"use client";

import Deleteconfirmation from "@/app/(reports)/DeleteConfirmation";
import Header from "@/app/(reports)/Header";
import Item from "@/app/(reports)/Item";
import Alert from "@/app/components/common/Alert";
import Loading from "@/app/components/common/Loading";
import Modal from "@/app/components/common/Modal";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const Reports = () => {
  const [results, setResults] = useState([]);
  const [itemId, setItemId] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [alerts, setAlerts] = useState({
    text: "",
  });

  const { isAuth, userEmail } = useAuth();

  useEffect(() => {
    if (userEmail) {
      axios
        .get(`/api/myReports/${userEmail}`)
        .then((res) => {
          setResults(res.data);
          setInitialLoading(false);
        })
        .catch(() => {
          setInitialLoading(false);
        });
    }
  }, [userEmail]);

  const deleteHandler = (value) => {
    if (value === "yes") {
      setLoading(true);
      setAlerts({ text: "" });
      axios
        .delete("/api/report/" + itemId)
        .then(() => {
          setLoading(false);
          setAlerts({
            text: "Your report has been deleted!",
          });
          setModal(false);
          const temp = [...results];
          const newResults = temp.filter((el) => el._id !== itemId);
          setResults(newResults);
        })
        .catch(() => {
          setLoading(false);
          setAlerts({
            text: "There was an error deleting your report. Please try again.",
          });
          setModal(false);
        });
    } else {
      setModal(false);
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && !isAuth) {
      if (window.top !== window.self) {
        window.top.location.href = "https://estategather.com/report-redirect";
      } else {
        window.location.href = "https://estategather.com/report-redirect";
      }
    }
  }, [isAuth]);

  return (
    <div className="bg-white">
      <div>
        <Header reportPage />
        <div className="max-w-[75rem] mx-auto p-3 md:py-3 md:px-0">
          {initialLoading ? (
            <Loading />
          ) : results.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {results
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                .map((report, index) => (
                  <Item
                    report={report}
                    key={index}
                    setItemId={setItemId}
                    modal={modal}
                    setModal={setModal}
                  />
                ))}
            </div>
          ) : (
            <p className="text-2xl text-center mx-auto">
              You Have No Reports Yet!
            </p>
          )}
          {modal && itemId && (
            <Modal>
              <Deleteconfirmation onClick={deleteHandler} />
            </Modal>
          )}
          {loading && <Loading />}
          <Alert text={alerts.text} />
        </div>
      </div>
    </div>
  );
};

export default Reports;

