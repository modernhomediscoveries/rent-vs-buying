"use client";

import { formatNumberInput } from "@/app/utils/numberFormatter";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

export interface InputProps {
  name: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  prefix?: string | null;
  suffix?: string | null;
  maxDecimals?: number;
  shouldFormat?: boolean;
  maxValue?: number;
  emptyValue?: boolean;
}

export const Input: FC<InputProps> = ({
  name,
  value,
  onChange,
  prefix = "",
  suffix = "",
  maxDecimals,
  shouldFormat = true,
  maxValue,
  emptyValue = false,
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getInitialDisplay = () => {
    if (emptyValue && (value === "" || value === 0)) return "";
    return shouldFormat
      ? formatNumberInput(value.toString())
      : value.toString();
  };

  const [displayValue, setDisplayValue] = useState(getInitialDisplay());

  useEffect(() => {
    if (emptyValue && (value === "" || value === 0)) {
      setDisplayValue("");
    } else {
      setDisplayValue(
        shouldFormat ? formatNumberInput(value.toString()) : value.toString()
      );
    }
  }, [value, shouldFormat, emptyValue]);

  const cleanInputValue = (val: string) => {
    return val
      .replace(prefix ?? "", "")
      .replace(suffix ?? "", "")
      .replace(/,/g, "")
      .replace(/[^0-9.]/g, "")
      .trim();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const cleanedValue = cleanInputValue(rawValue);
    let inputValue = cleanedValue;

    if (maxDecimals !== undefined && inputValue.includes(".")) {
      const [intPart, decimalPart] = inputValue.split(".");
      inputValue = `${intPart}.${decimalPart.slice(0, maxDecimals)}`;
    }

    const numericValue = parseFloat(inputValue);

    const formattedDisplay = shouldFormat
      ? formatNumberInput(inputValue)
      : inputValue;

    setDisplayValue(formattedDisplay);

    if (
      maxValue !== undefined &&
      !isNaN(numericValue) &&
      numericValue > maxValue
    ) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        const finalDisplay = shouldFormat
          ? formatNumberInput(maxValue.toString())
          : maxValue.toString();

        setDisplayValue(finalDisplay);

        const fakeEvent = {
          ...event,
          target: {
            ...event.target,
            name,
            value: maxValue.toString(),
          },
        };

        onChange(fakeEvent as ChangeEvent<HTMLInputElement>);
      }, 800);
    } else {
      const normalizedValue = isNaN(numericValue)
        ? ""
        : numericValue.toString();

      const fakeEvent = {
        ...event,
        target: {
          ...event.target,
          name,
          value: normalizedValue,
        },
      };

      onChange(fakeEvent as ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="relative">
      <input
        name={name}
        value={displayValue}
        onChange={handleChange}
        className={`h-10 w-full font-bold rounded placeholder:text-gray-500 ${
          prefix ? "pl-8" : "pl-4"
        } ${suffix ? "pr-24" : "pr-4"} border`}
        type="text"
        inputMode="decimal"
      />
      {prefix && (
        <div className="flex justify-center items-center rounded-l w-10 h-10 absolute left-0 top-0 pointer-events-none">
          {prefix}
        </div>
      )}
      {suffix && (
        <div className="flex justify-center items-center h-10 absolute right-4 top-0 pointer-events-none whitespace-nowrap">
          {suffix}
        </div>
      )}
    </div>
  );
};

export default Input;
