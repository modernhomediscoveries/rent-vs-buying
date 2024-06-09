import { numberInterpret, numberFormat } from "../src/Utils/number-formatter";

export function rentCalc(
  values: Partial<{
    monthlyRentalFee: string;
    rentalFeeIncrease: string;
    insurance: string;
    upfrontCost: string;
  }>
) {
  const monthlyRentalFee = numberInterpret(values?.monthlyRentalFee ?? 0);
  const rentalFeeIncrease =
    numberInterpret(values?.rentalFeeIncrease ?? 0) / 100;
  const insurance = numberInterpret(values?.insurance ?? 0);
  const upfrontCost = numberInterpret(values?.upfrontCost ?? 0);

  let mp = monthlyRentalFee;

  const array: number[] = [];
  const sum: number[] = [];
  for (let index = 0; index < 30; index++) {
    mp = mp * (1 + rentalFeeIncrease);
    array.push(mp);
    sum.push(mp * 12);
  }

  return {
    deploy: array.map(
      (item, index) => item + insurance + (index === 0 ? upfrontCost : 0)
    ),
    sum,
  };
}

export function buyCalc(
  values: Partial<{
    loanTerm: string;
    homePrice: string;
    downPayment: string;
    interestRate: string;
    propertyTax: string;
    propertyTaxType: string;
    homeInsurance: string;
    homeInsuranceType: string;
    HOAFee: string;
    maintenanceCost: string;
    maintenanceCostType: string;
    homeValueAppreciation: string;
    buyClosingCost: string;
    sellClosingCost: string;
    finalYear: string;
    averageInvestmentReturn: string;
    closing: string;
  }>
) {
  const loanTerm = numberInterpret(values.loanTerm ?? 0);
  let homePrice = numberInterpret(values.homePrice ?? 0);
  const interest = numberInterpret(values.interestRate ?? 0) / 12 / 100;
  const downPayment = numberInterpret(values?.downPayment ?? 0) / 100;
  const propertyTax =
    numberInterpret(values.propertyTax ?? 0) /
    (values.propertyTaxType == "%" ? 1200 : 12);
  const homeInsurance =
    numberInterpret(values.homeInsurance ?? 0) /
    (values.homeInsuranceType == "%" ? 1200 : 12);
  const HOAFee = numberInterpret(values.HOAFee ?? 0) / 12;
  const maintenanceCost =
    numberInterpret(values.maintenanceCost ?? 0) /
    (values.maintenanceCostType == "%" ? 1200 : 12);
  const buyClosingCost = numberInterpret(values.buyClosingCost ?? 0) / 1200;
  const sellClosingCost = numberInterpret(values.sellClosingCost ?? 0) / 1200;
  const finalYear = numberInterpret(values.finalYear ?? 0);
  const averageInvestmentReturn =
    numberInterpret(values.averageInvestmentReturn ?? 0) / 100;

  const homeValueAppreciation =
    numberInterpret(values.homeValueAppreciation ?? 0) / 1200;

  let totalBalance =
    homePrice *
    (1 - downPayment + (values?.closing === "yes" ? buyClosingCost : 0));
  let totalInterest = 0;
  const array: {
    balance: number;
    interest: number;
    totalPaid: number;
  }[] = [];

  const monthlyPayment =
    (totalBalance * interest) /
    (1 - 1 / Math.pow(1 + interest, loanTerm * 12) || 1);

  let investment =
    homePrice *
    (downPayment + (values?.closing === "yes" ? buyClosingCost : 0));

  for (
    let index = 0;
    index < (loanTerm > finalYear ? loanTerm : finalYear);
    index++
  ) {
    const yearI: number[] = [];
    for (let index1 = 0; index1 < 12; index1++) {
      const i = interest * totalBalance;
      const principalPaid = monthlyPayment - i;

      totalInterest = totalInterest + i;
      totalBalance = totalBalance - principalPaid;

      yearI.push(
        (i > 0 ? i : 0) +
          homePrice *
            ((values.propertyTaxType == "%" ? propertyTax : 0) +
              (values.maintenanceCostType == "%" ? maintenanceCost : 0) +
              (values.homeInsuranceType == "%" ? homeInsurance : 0) -
              homeValueAppreciation) +
          (values.homeInsuranceType == "%" ? 0 : homeInsurance) +
          (values.maintenanceCostType == "%" ? 0 : maintenanceCost) +
          (values.propertyTaxType == "%" ? 0 : propertyTax) +
          HOAFee +
          (index === 0 && values.closing == "no"
            ? homePrice * buyClosingCost
            : 0) +
          (index + 1 == finalYear ? homePrice * sellClosingCost : 0)
      );
    }

    array.push({
      balance: totalBalance,
      interest:
        yearI.reduce((acc, curr) => acc + curr, 0) / yearI.length +
        (investment * averageInvestmentReturn) / 12,
      totalPaid:
        yearI.reduce((acc, curr) => acc + curr, 0) +
        investment * averageInvestmentReturn,
    });
    investment *= 1 + averageInvestmentReturn;
  }
  return {
    monthlyPayment,
    totalInterest,
    deploy: array,
    line: array.slice(0, finalYear),
    finalYear,
  };
}
