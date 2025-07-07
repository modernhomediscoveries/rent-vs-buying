const BoxButton = ({ buttonLevel, filled, scrollTo, onClick }) => {
  return (
    <>
      <hr className="h-0.5 w-[calc(100%+32px)] -ml-4" />
      <div className="flex justify-center">
        <button
          className={`transition-all py-2 ${
            filled
              ? "hover:text-primary_green font-bold"
              : "text-[#a3aab4] cursor-auto"
          }`}
          onClick={() => {
            setTimeout(() => {
              document
                .querySelector("main")
                ?.scrollTo(
                  0,
                  document.getElementById(scrollTo)?.offsetTop ?? 0
                );
            });
            onClick && onClick();
          }}
        >
          {"<"} NEXT: {buttonLevel} {">"}
        </button>
      </div>
    </>
  );
};

export default BoxButton;
