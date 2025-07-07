import BoxButton from "@/app/components/common/BoxButton";
import Input from "@/app/components/common/Input";
import GoogleAutocomplete from "@/app/components/GoogleAutoComplete";
import { useStore } from "@/app/store";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const PropertyInformation = () => {
  const { fields, fieldsChange } = useStore();
  const [showOptionals, setShowOptionals] = useState(
    fields.propertyDetails ?? false
  );

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      bedrooms: fields.bedrooms ?? "",
      bathrooms: fields.bathrooms ?? "",
      sqFt: fields.sqFt ?? "",
      yearBuild: fields.yearBuild ?? "",
      description: fields.description ?? "",
    },
    onSubmit,
  });

  function onSubmit(values) {
    fieldsChange({ ...values });
  }

  useEffect(() => {
    fieldsChange({ ...values, propertyDetails: showOptionals });
  }, [values, showOptionals, fieldsChange]);

  return (
    <div
      className="bg-white px-4 mb-3 scroll-mt-20 shadow-box rounded-2xl"
      id="property"
    >
      <form onSubmit={handleSubmit}>
        <h2 className={`text-xl font-bold py-1.5`}>Property Information</h2>
        <hr className="h-0.5 w-[calc(100%+32px)] -ml-4" />
        <div className="pt-2 pb-3">
          <div>
            <label className="after:content-['*'] after:text-[#EB4747] mb-0.5 block">
              Street Address
            </label>
            <GoogleAutocomplete />
          </div>
          <div className="mt-2">
            <button
              type="button"
              className="border h-10 px-4 hover:bg-gray-100 rounded"
              onClick={() => setShowOptionals(!showOptionals)}
            >
              <span>Optional:</span>{" "}
              <span className="text-primary_green font-normal">
                property features, description
              </span>
            </button>
          </div>
          {showOptionals && (
            <div className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <label className="mb-0.5 block">Bedrooms</label>
                  <Input
                    name="bedrooms"
                    value={values.bedrooms}
                    maxValue={500}
                    emptyValue
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-0.5 block">Bathrooms</label>
                  <Input
                    name="bathrooms"
                    value={values.bathrooms}
                    maxValue={500}
                    emptyValue
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-0.5 block">Sq. Ft.</label>
                  <Input
                    name={"sqFt"}
                    value={values.sqFt}
                    suffix={"sqft"}
                    maxValue={999999}
                    emptyValue
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-0.5 block">Year built</label>
                  <Input
                    name="yearBuild"
                    value={values.yearBuild}
                    shouldFormat={false}
                    maxValue={9999}
                    emptyValue
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="w-full mt-2">
                <textarea
                  name="description"
                  className="min-h-[3rem] h-52 resize-y border p-4 w-full font-bold rounded"
                  onChange={handleChange}
                  value={values.description}
                  maxLength={3050}
                />
              </div>
            </div>
          )}
        </div>
        <BoxButton
          buttonLevel={"COST TO BUY"}
          filled={fields.direction}
          scrollTo="costToBuy"
        />
      </form>
    </div>
  );
};

export default PropertyInformation;
