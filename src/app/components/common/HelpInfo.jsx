const HelpInfo = ({ title, openModal }) => {
  return (
    <div
      className="col-span-1 cursor-pointer font-normal"
      onClick={openModal}
    >
      <div className="flex items-center gap-0.5">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="nz sb axp text-[#2f3748]"
            style={{ width: 20 + "px", height: 20 + "px" }}
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <span className="text-[#2f3748]">HELP</span>
      </div>
      <p className="text-primary_green mt-0.5">{title}</p>
    </div>
  );
};

export default HelpInfo;
