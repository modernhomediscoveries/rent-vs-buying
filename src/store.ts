import { create } from "zustand";
import { buyCalc, rentCalc } from "./logic";
import { homePurchaseInitial } from "./components/HomePurchase";
import { rentInit } from "./components/HomeRent";

type Store = {
  fields: Partial<typeof homePurchaseInitial.values & typeof rentInit.values>;
  fieldsChange: (
    ...args: {
      [k: string]: number | string | boolean | File | null | undefined;
    }[]
  ) => void;

  buyResult: ReturnType<typeof buyCalc>;
  calcBuy: () => void;

  rentResult: ReturnType<typeof rentCalc>;
  calcRent: () => void;
};

export const useStore = create<Store>()((set) => ({
  fields: {},

  fieldsChange: (values) =>
    set((state) => ({
      fields: { ...state.fields, ...values },
    })),

  buyResult: {
    monthlyPayment: 0,
    totalInterest: 0,
    deploy: [],
    line: [],
    finalYear: 0
  },
  calcBuy: () => set((state) => ({ buyResult: buyCalc(state.fields) ?? [] })),

  rentResult: {
    sum: [],
    deploy: [],
  },
  calcRent: () =>
    set((state) => ({ rentResult: rentCalc(state.fields) ?? [] })),
}));
