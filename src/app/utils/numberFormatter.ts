import numeral from "numeral";

export function numberFormat(number: number | string) {
  return numeral(number).format("0,000.00");
}

export function numberFormatInt(number: number | string) {
  return numeral(number).format("0,000");
}

export function formatNumberInput(
  inputValue: string,
  validation?: (n: string) => number
) {
  if (!inputValue) return "0";
  if (inputValue[0] === ".") return "0".concat(inputValue);
  if (inputValue.charAt(inputValue.length - 1) === ".")
    return inputValue.slice(0, inputValue.length - 1).includes(".")
      ? inputValue.slice(0, inputValue.length - 1)
      : inputValue;
  if (validation && validation(inputValue))
    inputValue =
      Math.floor(numberInterpret(inputValue)) < numberInterpret(inputValue)
        ? validation(inputValue).toString()
        : numberFormatInt(validation(inputValue));

  const cleanedValue = inputValue.replace(/[^\d.]/g, "").replace(/^0+/g, "");

  const [integerPart, decimalPart] = cleanedValue.split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let formattedNumber = decimalPart
    ? `${formattedInteger === "" ? "0" : formattedInteger}.${decimalPart}`
    : formattedInteger;

  return formattedNumber === "" ? "0" : formattedNumber;
}

export function numberInterpret(n: string | number) {
  return typeof n === "number" ? n : Number(n.split(",").join(""));
}

export type handler = {
  (e: React.ChangeEvent<any>): void;
  <T_1 = string | React.ChangeEvent<any>>(
    field: T_1
  ): T_1 extends React.ChangeEvent<any>
    ? void
    : (e: string | React.ChangeEvent<any>) => void;
};

export function formatterInputHandlingChangeWithValidation(
  handleChange: handler,
  validation: (n: string) => number
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = formatNumberInput(e.target.value, validation);
    handleChange(e);
  };
}

export function kFormat(number: string | number) {
  const n = Number(number);
  if (-1000 < n && n < 1000) return n.toFixed(2);
  if (n >= 1000000000) return (n / 1000000000).toFixed(1) + "B";
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  return (n / 1000).toFixed(1) + "K";
}