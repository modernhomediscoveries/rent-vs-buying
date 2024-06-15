import { numberInterpret, numberFormat } from "../src/Utils/number-formatter";

export function rentCalc(
  values: Partial<{
    monthlyRentalFee: string;
    rentalFeeIncrease: string;
    insurance: string;
    upfrontCost: string;
    rentalIncome: string;
    rentalIncomeGrowth: string;
  }>
) {
  const monthlyRentalFee = numberInterpret(values?.monthlyRentalFee ?? 0);
  const rentalFeeIncrease =
    numberInterpret(values?.rentalFeeIncrease ?? 0) / 100;
  let insurance = numberInterpret(values?.insurance ?? 0);
  const upfrontCost = numberInterpret(values?.upfrontCost ?? 0);
  let rentalIncome = numberInterpret(values?.rentalIncome ?? 0);
  const rentalIncomeGrowth =
    numberInterpret(values?.rentalIncomeGrowth ?? 0) / 100;

  let mp = monthlyRentalFee;

  const array: number[] = [];
  const sum: number[] = [];
  for (let index = 0; index < 30; index++) {
    insurance = insurance * (1 + rentalFeeIncrease);
    rentalIncome = rentalIncome * (1 + rentalIncomeGrowth);
    mp = mp * (1 + rentalFeeIncrease) + insurance - rentalIncome;
    array.push(mp);
    sum.push(mp * 12);
  }

  return {
    deploy: array.map((item, index) => item + (index === 0 ? upfrontCost : 0)),
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
    expenseGrowth: string;
  }>
) {
  const loanTerm = numberInterpret(values.loanTerm ?? 0);
  let homePrice = numberInterpret(values.homePrice ?? 0);
  const interest = numberInterpret(values.interestRate ?? 0) / 12 / 100;
  const downPayment = numberInterpret(values?.downPayment ?? 0) / 100;
  let propertyTax =
    numberInterpret(values.propertyTax ?? 0) /
    (values.propertyTaxType == "%" ? 1200 : 1);
  let homeInsurance =
    numberInterpret(values.homeInsurance ?? 0) /
    (values.homeInsuranceType == "%" ? 1200 : 1);
  const HOAFee = numberInterpret(values.HOAFee ?? 0);
  let maintenanceCost =
    numberInterpret(values.maintenanceCost ?? 0) /
    (values.maintenanceCostType == "%" ? 1200 : 1);
  const buyClosingCost = numberInterpret(values.buyClosingCost ?? 0) / 1200;
  const sellClosingCost = numberInterpret(values.sellClosingCost ?? 0) / 1200;
  const finalYear = numberInterpret(values.finalYear ?? 0);
  const averageInvestmentReturn =
    numberInterpret(values.averageInvestmentReturn ?? 0) / 100;

  const homeValueAppreciation =
    numberInterpret(values.homeValueAppreciation ?? 0) / 100;
  const expenseGrowth = numberInterpret(values.expenseGrowth ?? 0) / 100;

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
    propertyTax *= values.propertyTaxType == "%" ? 1 : 1 + expenseGrowth;
    maintenanceCost *=
      values.maintenanceCostType == "%" ? 1 : 1 + expenseGrowth;
    homeInsurance *= values.homeInsuranceType == "%" ? 1 : 1 + expenseGrowth;
    // console.log(values.propertyTaxType, propertyTax);
    // console.log(homeInsurance);
    // console.log(maintenanceCost);

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
              homeValueAppreciation / 12) +
          (values.homeInsuranceType == "%" ? 0 : homeInsurance / 12) +
          (values.maintenanceCostType == "%" ? 0 : maintenanceCost / 12) +
          (values.propertyTaxType == "%" ? 0 : propertyTax / 12) +
          HOAFee / 12 +
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
    homePrice *= 1 + homeValueAppreciation;
  }
  return {
    monthlyPayment,
    totalInterest,
    deploy: array,
    line: array.slice(0, finalYear),
    finalYear,
  };
}
