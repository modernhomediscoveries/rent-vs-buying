import { ChevronDown } from "lucide-react";

const Header = ({ reportPage }) => {
  return (
    <header className="bg-white p-3 md:p-4 shadow-box">
      <div
        className={`mx-auto ${reportPage ? "max-w-[75rem]" : "max-w-[77rem]"}`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-x-1 cursor-pointer">
            <p className="font-semibold">My Active Reports</p>
            <div>
              <ChevronDown className="text-gray-400 pt-1" />
            </div>
          </div>
          <a
            href="https://estategather.com/rent-vs-buy-calculator"
            target="_parent"
            className="bg-primary_green hover:bg-primary_green/80 transition-all text-white px-4 py-1 cursor-pointer rounded-md"
            onClick="document.getElementById('myIframe').contentWindow.location.reload();"
          >
            Start New Report
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
