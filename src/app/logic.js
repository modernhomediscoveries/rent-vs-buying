import { numberInterpret } from "@/app/utils/numberFormatter";

export function rentCalc(values) {
  const monthlyRent = numberInterpret(values?.monthlyRent ?? 0);
  const annualRentIncrease =
    numberInterpret(values?.annualRentIncrease ?? 0) / 100;
  let monthlyReturnInsurance = numberInterpret(
    values?.monthlyReturnInsurance ?? 0
  );
  const upfrontCost = numberInterpret(values?.upfrontCost ?? 0);

  let mp = monthlyRent;

  const array = [];
  const sum = [];

  for (let index = 0; index < 30; index++) {
    monthlyReturnInsurance = monthlyReturnInsurance * (1 + annualRentIncrease);
    mp = mp * (1 + annualRentIncrease);

    array.push(mp + monthlyReturnInsurance);
    sum.push(mp * 12);
  }

  return {
    deploy: array.map((item, index) => item + (index === 0 ? upfrontCost : 0)),
    sum,
  };
}

export function buyCalc(values) {
  const loanTerm = numberInterpret(values?.loanTerm ?? 0);
  let homePurchasePrice = numberInterpret(values?.homePurchasePrice ?? 0);
  const interestRate = numberInterpret(values?.interestRate ?? 0) / 12 / 100;
  const downPayment = numberInterpret(values?.downPayment ?? 0) / 100;
  let propertyTax = numberInterpret(values?.propertyTax ?? 0);
  let homeInsurance = numberInterpret(values?.homeInsurance ?? 0);
  const hOAFee = numberInterpret(values?.hOAFee ?? 0);
  let maintenanceCost = numberInterpret(values?.maintenanceCost ?? 0);
  const purchaseClosingCosts =
    numberInterpret(values?.purchaseClosingCosts ?? 0) / 1200;
  const saleClosingCosts =
    numberInterpret(values?.saleClosingCosts ?? 0) / 1200;
  const finalYear = numberInterpret(values?.finalYear ?? 0);
  const averageInvestmentReturn =
    numberInterpret(values?.averageInvestmentReturn ?? 0) / 100;
  const homeValueAppreciation =
    numberInterpret(values?.homeValueAppreciation ?? 0) / 100;
  const expenseGrowth = numberInterpret(values?.expenseGrowth ?? 0) / 100;
  let annualRentIncome = numberInterpret(values?.annualRentIncome ?? 0);
  const rentalIncomeGrowth =
    numberInterpret(values?.rentalIncomeGrowth ?? 0) / 100;

  let totalBalance =
    homePurchasePrice *
    (1 - downPayment + (values?.financed === "Yes" ? purchaseClosingCosts : 0));
  let totalInterest = 0;

  const array = [];

  const monthlyPayment =
    (totalBalance * interestRate) /
    (1 - 1 / Math.pow(1 + interestRate, loanTerm * 12) || 1);

  let investment =
    homePurchasePrice *
    (downPayment + (values?.financed === "Yes" ? purchaseClosingCosts : 0));

  for (
    let index = 0;
    index < (loanTerm > finalYear ? loanTerm : finalYear);
    index++
  ) {
    const yearI = [];
    propertyTax *= 1 + expenseGrowth;
    maintenanceCost *= 1 + expenseGrowth;
    homeInsurance *= 1 + expenseGrowth;
    annualRentIncome = annualRentIncome * (1 + rentalIncomeGrowth);

    for (let index1 = 0; index1 < 12; index1++) {
      const i = interestRate * totalBalance;
      const principalPaid = monthlyPayment - i;
      totalInterest += i;
      totalBalance -= principalPaid;

      yearI.push(
        (i > 0 ? i : 0) +
          homePurchasePrice * (-homeValueAppreciation / 12) +
          homeInsurance / 12 +
          maintenanceCost / 12 +
          propertyTax / 12 +
          hOAFee / 12 +
          (index === 0 && values?.financed === "No"
            ? homePurchasePrice * purchaseClosingCosts
            : 0) +
          (index + 1 === finalYear ? homePurchasePrice * saleClosingCosts : 0) -
          annualRentIncome / 12
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
    homePurchasePrice *= 1 + homeValueAppreciation;
  }

  return {
    monthlyPayment,
    totalInterest,
    deploy: array,
    line: array.slice(0, finalYear),
    finalYear,
  };
}
