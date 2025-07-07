import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

function Toastify({ text }) {
  useEffect(() => {
    if (!text) return;
    toast(text);
  }, [text]);

  return <ToastContainer hideProgressBar />;
}

export default Toastify;
