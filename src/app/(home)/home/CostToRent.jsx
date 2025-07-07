import BoxButton from "@/app/components/common/BoxButton";
import HelpInfo from "@/app/components/common/HelpInfo";
import HelpScreen from "@/app/components/common/HelpScreen";
import Input from "@/app/components/common/Input";
import { useStore } from "@/app/store";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const CostToBuy = () => {
  const { fields, fieldsChange } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [textIndex, setTextIndex] = useState(1);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      monthlyRent: fields.monthlyRent ?? "",
      annualRentIncrease: fields.annualRentIncrease ?? "3",
      monthlyReturnInsurance: fields.monthlyReturnInsurance ?? "15",
      upfrontCost: fields.upfrontCost ?? "100",
    },
    onSubmit,
  });

  function onSubmit(values) {
    fieldsChange({ ...values });
  }

  useEffect(() => {
    fieldsChange({ ...values });
  }, [fieldsChange, values]);

  function closeModal() {
    setShowModal(false);
  }

  function openModal(index) {
    setShowModal(true);
    setTextIndex(index);
  }

  return (
    <div
      className="bg-white px-4 mb-3 scroll-mt-20 shadow-box rounded-2xl"
      id="costToRent"
    >
      {showModal && <HelpScreen message={textIndex} closeModal={closeModal} />}
      <form onSubmit={handleSubmit}>
        <h2 className={`text-xl font-bold py-1.5`}>Cost To Rent A Home</h2>
        <hr className="h-0.5 w-[calc(100%+32px)] -ml-4" />
        <div className="pt-2 pb-3">
          <div>
            <div className="max-w-sm col-span-2">
              <label className="after:content-['*'] after:text-[#EB4747] mb-0.5 block">
                Monthly Rent
              </label>
              <Input
                name={"monthlyRent"}
                value={values.monthlyRent}
                prefix={"$"}
                maxValue={999999999}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="mt-2 grid md:grid-cols-3 gap-y-4 items-end">
            <div className="max-w-sm col-span-2">
              <label className="mb-0.5 block">Annual Rent Increase</label>
              <Input
                name={"annualRentIncrease"}
                value={values.annualRentIncrease}
                prefix={"%"}
                suffix={"% - Compounded"}
                maxDecimals={3}
                maxValue={10}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <HelpInfo
              title={"Rental Fee Increase?"}
              openModal={() => openModal(2)}
            />
          </div>
          <div className="mt-2">
            <div className="max-w-sm">
              <label className="mb-0.5 block">Monthly Return Insurance</label>
              <Input
                name={"monthlyReturnInsurance"}
                value={values.monthlyReturnInsurance}
                prefix={"$"}
                maxDecimals={2}
                maxValue={9999999}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="mt-2 grid md:grid-cols-3 gap-y-4 items-end">
            <div className="max-w-sm col-span-2">
              <label className="mb-0.5 block">Upfront Cost</label>
              <Input
                name={"upfrontCost"}
                value={values.upfrontCost}
                prefix={"$"}
                maxDecimals={2}
                maxValue={9999999}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <HelpInfo
              title={"What is Included in This?"}
              openModal={() => openModal(3)}
            />
          </div>
        </div>
        <BoxButton
          buttonLevel={"OTHER INFORMATION"}
          filled={fields.monthlyRent}
          scrollTo="otherInfo"
        />
      </form>
    </div>
  );
};

export default CostToBuy;
