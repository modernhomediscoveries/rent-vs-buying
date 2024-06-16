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

  let mp = monthlyRentalFee;

  const array: number[] = [];
  const sum: number[] = [];
  for (let index = 0; index < 30; index++) {
    insurance = insurance * (1 + rentalFeeIncrease);

    mp = mp * (1 + rentalFeeIncrease);

    array.push(mp + insurance);
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

    homeInsurance: string;

    HOAFee: string;
    maintenanceCost: string;

    homeValueAppreciation: string;
    buyClosingCost: string;
    sellClosingCost: string;
    finalYear: string;
    averageInvestmentReturn: string;
    closing: string;
    expenseGrowth: string;
    rentalIncome: string;
    rentalIncomeGrowth: string;
  }>
) {
  let rentalIncome = numberInterpret(values?.rentalIncome ?? 0);
  const rentalIncomeGrowth =
    numberInterpret(values?.rentalIncomeGrowth ?? 0) / 100;
  const loanTerm = numberInterpret(values.loanTerm ?? 0);
  let homePrice = numberInterpret(values.homePrice ?? 0);
  const interest = numberInterpret(values.interestRate ?? 0) / 12 / 100;
  const downPayment = numberInterpret(values?.downPayment ?? 0) / 100;
  let propertyTax = numberInterpret(values.propertyTax ?? 0);
  let homeInsurance = numberInterpret(values.homeInsurance ?? 0);
  const HOAFee = numberInterpret(values.HOAFee ?? 0);
  let maintenanceCost = numberInterpret(values.maintenanceCost ?? 0);
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
    propertyTax *= 1 + expenseGrowth;
    maintenanceCost *= 1 + expenseGrowth;
    homeInsurance *= 1 + expenseGrowth;
    // console.log(values.propertyTaxType, propertyTax);
    // console.log(homeInsurance);
    // console.log(maintenanceCost);
    rentalIncome = rentalIncome * (1 + rentalIncomeGrowth);
    for (let index1 = 0; index1 < 12; index1++) {
      const i = interest * totalBalance;
      const principalPaid = monthlyPayment - i;
      totalInterest = totalInterest + i;
      totalBalance = totalBalance - principalPaid;

      yearI.push(
        (i > 0 ? i : 0) +
          homePrice * (-homeValueAppreciation / 12) +
          homeInsurance / 12 +
          maintenanceCost / 12 +
          propertyTax / 12 +
          HOAFee / 12 +
          (index === 0 && values.closing == "no"
            ? homePrice * buyClosingCost
            : 0) +
          (index + 1 == finalYear ? homePrice * sellClosingCost : 0) -
          rentalIncome / 12
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
