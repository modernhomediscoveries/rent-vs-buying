import { useStore } from "../store";

const ProgressBar = () => {
  const { progress } = useStore();

  const progressBarStyle = {
    backgroundColor: "#2ab499",
    width: `${progress * 33.33}%`,
  };

  return (
    <div className="fixed top-0 left-0 h-16 shadow-md w-full z-40 bg-white flex justify-center items-center py-4 px-2">
      <div className="bg-gray-300 w-10/12 sm:w-7/12 lg:w-6/12 max-w-full h-4 rounded-full relative">
        <div
          style={progressBarStyle}
          className="h-full rounded-full absolute left-0 transition-width duration-500"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
