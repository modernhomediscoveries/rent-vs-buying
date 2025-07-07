import Image from "next/image";

const Loading = () => {
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40 transition-all"></div>
      <Image
        src={"/spinner.svg"}
        width={500}
        height={500}
        alt="loading"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      />
    </>
  );
};

export default Loading;
