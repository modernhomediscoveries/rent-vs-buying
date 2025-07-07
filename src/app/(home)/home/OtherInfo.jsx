import BoxButton from "@/app/components/common/BoxButton";
import HelpInfo from "@/app/components/common/HelpInfo";
import HelpScreen from "@/app/components/common/HelpScreen";
import Input from "@/app/components/common/Input";
import { useStore } from "@/app/store";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const CostToBuy = ({ setResults }) => {
  const { fields, fieldsChange } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [textIndex, setTextIndex] = useState(1);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      averageInvestmentReturn: fields.averageInvestmentReturn ?? "0",
      annualRentIncome: fields.annualRentIncome ?? "0",
      rentIncomeGrowth: fields.rentIncomeGrowth ?? "0",
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
      id="otherInfo"
    >
      {showModal && <HelpScreen message={textIndex} closeModal={closeModal} />}
      <form onSubmit={handleSubmit}>
        <h2 className={`text-xl font-bold py-1.5`}>Other Information</h2>
        <hr className="h-0.5 w-[calc(100%+32px)] -ml-4" />
        <div className="pt-2 pb-3">
          <div className="grid md:grid-cols-3 gap-y-4 items-center">
            <div className="max-w-sm col-span-2">
              <label className="mb-0.5 block">Average Investment Return</label>
              <Input
                name={"averageInvestmentReturn"}
                value={values.averageInvestmentReturn}
                prefix={"%"}
                suffix={"% - Annually"}
                maxDecimals={3}
                maxValue={30}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <HelpInfo title={"What is This?"} openModal={() => openModal(5)} />
          </div>
          <div className="mt-2 grid md:grid-cols-3 gap-y-4 items-end">
            <div className="max-w-sm col-span-2">
              <label className="mb-0.5 block">Annual Rent Income</label>
              <Input
                name={"annualRentIncome"}
                value={values.annualRentIncome}
                prefix={"$"}
                maxDecimals={3}
                maxValue={999999999}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <HelpInfo title={"What is This?"} openModal={() => openModal(6)} />
          </div>
          <div className="mt-2 grid md:grid-cols-3 gap-y-4 items-end">
            <div className="max-w-sm col-span-2">
              <label className="mb-0.5 block">Rent Income Growth</label>
              <Input
                name={"rentIncomeGrowth"}
                value={values.rentIncomeGrowth}
                prefix={"%"}
                suffix={"% - Compounded"}
                maxDecimals={3}
                maxValue={10}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <HelpInfo title={"What is This?"} openModal={() => openModal(7)} />
          </div>
        </div>
        <BoxButton
          buttonLevel={"FINISH ANALYSIS"}
          filled={
            fields.homePurchasePrice &&
            fields.downPayment &&
            fields.monthlyRent &&
            fields.direction
          }
          scrollTo="resultShow"
          onClick={() => {
            if (
              fields.direction &&
              fields.homePurchasePrice &&
              fields.finalYear &&
              fields.downPayment &&
              fields.monthlyRent
            )
              setResults(true);
          }}
        />
      </form>
    </div>
  );
};

export default CostToBuy;
