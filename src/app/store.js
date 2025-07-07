import { buyCalc, rentCalc } from "@/app/logic";
import { create } from "zustand";

export const useStore = create((set) => ({
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
    finalYear: 0,
  },

  calcBuy: () =>
    set((state) => ({
      buyResult: buyCalc(state.fields) || [],
    })),

  rentResult: {
    sum: [],
    deploy: [],
  },

  calcRent: () =>
    set((state) => ({
      rentResult: rentCalc(state.fields) || [],
    })),

  isPrinting: false,
  setIsPrinting(val) {
    set(() => ({
      isPrinting: val,
    }));
  },

  progress: 0,
  setProgress(val) {
    set(() => ({
      progress: val,
    }));
  },
}));
