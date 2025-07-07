import { model, models, Schema } from "mongoose";

const reportSchema = new Schema(
  {
    userEmail: { type: String, trim: true },
    selectedFile: {
      url: { type: String, trim: true },
      publicId: { type: String, trim: true },
    },
    direction: { type: String, trim: true },
    placeName: { type: String, trim: true },
    vicinity: { type: String, trim: true },
    bedrooms: { type: String, trim: true },
    bathrooms: { type: String, trim: true },
    sqFt: { type: String, trim: true },
    yearBuild: { type: String, trim: true },
    description: { type: String, trim: true },
    homePurchasePrice: { type: String, trim: true },
    annualHomeValueAppreciation: { type: String, trim: true },
    purchaseClosingCosts: { type: String, trim: true },
    financed: { type: String },
    downPayment: { type: String, trim: true },
    interestRate: { type: String, trim: true },
    loanTerm: { type: String, trim: true },
    finalYear: { type: String, trim: true },
    propertyTax: { type: String, trim: true },
    homeInsurance: { type: String, trim: true },
    hOAFee: { type: String, trim: true },
    maintenanceCost: { type: String, trim: true },
    expenseGrowth: { type: String, trim: true },
    saleClosingCosts: { type: String, trim: true },
    monthlyRent: { type: String, trim: true },
    annualRentIncrease: { type: String, trim: true },
    monthlyReturnInsurance: { type: String, trim: true },
    upfrontCost: { type: String, trim: true },
    averageInvestmentReturn: { type: String, trim: true },
    annualRentIncome: { type: String, trim: true },
    rentIncomeGrowth: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const ReportModel = models.Report || model("Report", reportSchema);

export default ReportModel;
