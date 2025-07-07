const HelpScreen = ({ message, closeModal }) => {
  const data = [
    {
      id: 0,
      title: "What is this?",
      text: [
        "This is the percentage amount that you anticipate your home's value will appreciate on average each year over the duration of your ownership of the property.",
        "A good conservative benchmark is the average US annual inflation rate, which has been just over 3% annually for the last one hundred years.",
      ],
    },
    {
      id: 1,
      title: "What is Final Year?",
      text: [
        "The Final Year, in this context, refers to the number of years from now when you plan to sell or move out of the property you are renting or purchasing.",
        "For example, if you plan to move out in 5 years, thenthe final year is 5 years from now.",
        "This period is crucial for financial planning, as it influences decisions about renting versus buying, mortgage terms, potential capital gains, and overall housing strategy.",
      ],
    },
    {
      id: 2,
      title: "Rental Fee Increase?",
      text: [
        "The Rental Fee Increase is the average annual percentageyou anticipate rent to increase during the duration of your stay.",
      ],
    },
    {
      id: 3,
      title: "What is included in this?",
      text: [
        "Upfront costs include application fees, broker's fees, expenses related to moving, utility setup fees, and more.",
      ],
    },
    {
      id: 4,
      title: "What is included in this?",
      text: [
        "Upfront costs include application fees, broker's fees, expenses related to moving, utility setup fees, and more.",
      ],
    },
    {
      id: 5,
      title: "What is this?",
      text: [
        "Average Investment Return refers to the typical annual earnings your investments generate over time. Historically, the 30-year return of the S&P 500 has averaged around 10–12%.",
        "When you purchase a home, whether with cash or a down payment, you incur an opportunity cost. This means the money used for the home purchase isn't available for other investments that could potentially yield returns.",
      ],
    },
    {
      id: 6,
      title: "What is this?",
      text: [
        "This refers to the estimated monthly income you expect to receive from roommates, renting out a second unit, or other rental arrangements after purchasing your home. Rent Income is only deducted from the cost of living in a home you purchased. This calculator assumes that if you rent you will live alone.",
      ],
    },
    {
      id: 7,
      title: "What is this?",
      text: [
        "Rent Income Growth is the amount you anticipate your rental income to increase each year. A good benchmark could be the average inflation rate. In some markets, rent prices may rise faster than in others.",
      ],
    },
    {
      id: 8,
      title: "What is Annual Expense Growth?",
      text: [
        "Annual Expense Growth refers to the estimated percentage by which your property-related expenses—such as property taxes, insurance, HOA fees, and maintenance—are expected to increase each year. It is compounded annually, meaning each year’s increase builds on the previous year’s total. For example, if your annual maintenance is $2,000 and your expense growth rate is 3%, the following year’s maintenance cost would be $2,060, then $2,121.80 the year after, and so on.",
        "Annual Expense Growth refers to the estimated percentage by which your property-related expenses—such as property taxes, insurance, HOA fees, and maintenance—are expected to increase each year. It is compounded annually, meaning each year’s increase builds on the previous year’s total. For example, if your annual maintenance is $2,000 and your expense growth rate is 3%, the following year’s maintenance cost would be $2,060, then $2,121.80 the year after, and so on",
      ],
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-black bg-opacity-20 flex justify-center items-center z-30 font-bold px-3">
      <div className="w-[700px] max-w-full bg-white shadow-box rounded-2xl">
        <p className="px-3 text-xl capitalize py-1.5">{data[message].title}</p>
        <div className="border-y font-medium py-3 max-h-96 overflow-y-scroll no-scrollbar">
          {data[message].text.map((item, index) => {
            return (
              <p
                className={`px-3 ${
                  data[message].text.length === index + 1 ? "" : "mb-3"
                }`}
                key={index}
              >
                {item}
              </p>
            );
          })}
        </div>
        <button
          onClick={closeModal}
          className="px-3 py-2 block mx-auto hover:text-primary_green"
        >
          {"<"} CLOSE {">"}
        </button>
      </div>
    </div>
  );
};

export default HelpScreen;
