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
  const [selected, setSelected] = useState(fields.financed ?? "No");

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      homePurchasePrice: fields.homePurchasePrice ?? "",
      annualHomeValueAppreciation: fields.annualHomeValueAppreciation ?? "3",
      purchaseClosingCosts: fields.purchaseClosingCosts ?? "3",
      financed: fields.financed ?? "No",
      downPayment: fields.downPayment ?? "20",
      interestRate: fields.interestRate ?? "5",
      loanTerm: fields.loanTerm ?? "30",
      finalYear: fields.finalYear ?? "30",
      propertyTax: fields.propertyTax ?? "1500",
      homeInsurance: fields.homeInsurance ?? "1500",
      hOAFee: fields.hOAFee ?? "800",
      maintenanceCost: fields.maintenanceCost ?? "1500",
      expenseGrowth: fields.expenseGrowth ?? "3",
      saleClosingCosts: fields.saleClosingCosts ?? "6",
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
      id="costToBuy"
    >
      {showModal && <HelpScreen message={textIndex} closeModal={closeModal} />}
      <form onSubmit={handleSubmit}>
        <h2 className={`text-xl font-bold py-1.5`}>Cost To Buy A Home</h2>
        <hr className="h-0.5 w-[calc(100%+32px)] -ml-4" />
        <div className="pt-2 pb-3">
          <div>
            <div className="max-w-sm col-span-2">
              <label className="after:content-['*'] after:text-[#EB4747] mb-0.5 block">
                Home Purchase Price
              </label>
              <Input
                name={"homePurchasePrice"}
                value={values.homePurchasePrice}
                prefix={"$"}
                maxValue={999999999}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="mt-2 grid md:grid-cols-3 gap-y-4 items-end">
            <div className="max-w-sm col-span-2">
              <label className="mb-0.5 block">
                Annual Home Value Appreciation
              </label>
              <Input
                name={"annualHomeValueAppreciation"}
                value={values.annualHomeValueAppreciation}
                prefix={"%"}
                suffix={"% - Compounded"}
                maxDecimals={3}
                maxValue={10}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <HelpInfo title={"What is this?"} openModal={() => openModal(0)} />
          </div>
          <div className="mt-2 grid md:grid-cols-3 gap-y-4 items-end">
            <div className="max-w-sm col-span-2">
              <label className="mb-0.5 block">Purchase Closing Costs</label>
              <Input
                name={"purchaseClosingCosts"}
                value={values.purchaseClosingCosts}
                prefix={"%"}
                suffix={"% - Purchase Price"}
                maxDecimals={3}
                maxValue={9}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-span-1">
              <label className="mb-0.5 block">Financed?</label>
              <div className="flex gap-4">
                {["Yes", "No"].map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setSelected(option);
                      fieldsChange({ ...values, financed: option });
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border ${selected === option ? "border-primary_green bg-primary_green" : "border-gray-300"}`}
                    >
                      {selected === option && (
                        <div className="w-1.5 h-1.5 m-auto mt-[4px] rounded-full bg-white"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div className="max-w-sm">
              <label className="after:content-['*'] after:text-[#EB4747] mb-0.5 block">
                Down Payment
              </label>
              <Input
                name={"downPayment"}
                value={values.downPayment}
                prefix={"%"}
                suffix={"% - Purchase Price"}
                maxDecimals={3}
                maxValue={100}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="mt-2">
            <div className="max-w-sm">
              <label className="mb-0.5 block">Interest Rate</label>
              <Input
                name={"interestRate"}
                value={values.interestRate}
                prefix={"%"}
                suffix={"% - Loan Balance"}
                maxDecimals={3}
                maxValue={20}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="mt-2">
            <div className="max-w-sm">
              <label className="mb-0.5 block">Loan Term (Years)</label>
              <Input
                name={"loanTerm"}
                value={values.loanTerm}
                maxValue={30}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="mt-2 grid md:grid-cols-3 gap-y-4 items-end">
            <div className="max-w-sm col-span-2">
              <label className="after:content-['*'] after:text-[#EB4747] mb-0.5 block">
                Final Year (Year Of Sale)
              </label>
              <Input
                name={"finalYear"}
                value={values.finalYear}
                maxDecimals={3}
                maxValue={30}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <HelpInfo
              title={"What is Final Year?"}
              openModal={() => openModal(1)}
            />
          </div>
          <div className="mt-2">
            <div className="max-w-sm">
              <label className="mb-0.5 block">Annual Property Taxes</label>
              <Input
                name={"propertyTax"}
                value={values.propertyTax}
                prefix={"$"}
                maxDecimals={2}
                maxValue={9999999}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="mt-2">
            <div className="max-w-sm">
              <label className="mb-0.5 block">
                Annual Homeowners Insurance
              </label>
              <Input
                name={"homeInsurance"}
                value={values.homeInsurance}
                prefix={"$"}
                maxDecimals={2}
                maxValue={9999999}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="mt-2">
            <div className="max-w-sm">
              <label className="mb-0.5 block">Annual HOA Fee</label>
              <Input
                name={"hOAFee"}
                value={values.hOAFee}
                prefix={"$"}
                maxDecimals={2}
                maxValue={9999999}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="mt-2">
            <div className="max-w-sm">
              <label className="mb-0.5 block">Annual Maintenance</label>
              <Input
                name={"maintenanceCost"}
                value={values.maintenanceCost}
                prefix={"$"}
                maxDecimals={2}
                maxValue={9999999}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="mt-2 grid md:grid-cols-3 gap-y-4 items-end">
            <div className="max-w-sm col-span-2">
              <label className="mb-0.5 block">Annual Expense Growth</label>
              <Input
                name={"expenseGrowth"}
                value={values.expenseGrowth}
                prefix={"%"}
                suffix={"% - Compounded"}
                maxDecimals={3}
                maxValue={20}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <HelpInfo
              title={"What is Annual Expense Growth?"}
              openModal={() => openModal(8)}
            />
          </div>
          <div className="mt-2">
            <div className="max-w-sm">
              <label className="mb-0.5 block">Sale Closing Costs</label>
              <Input
                name={"saleClosingCosts"}
                value={values.saleClosingCosts}
                prefix={"%"}
                suffix={"% - Final Year Value"}
                maxDecimals={3}
                maxValue={20}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </div>
        <BoxButton
          buttonLevel={"COST TO RENT"}
          filled={
            fields.homePurchasePrice && fields.finalYear && fields.downPayment
          }
          scrollTo="costToRent"
        />
      </form>
    </div>
  );
};

export default CostToBuy;
