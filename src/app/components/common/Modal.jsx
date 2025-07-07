const Modal = ({ children }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-10 z-10 transition-all"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-xl z-20 flex items-center justify-center w-11/12 md:w-auto">
        {children}
      </div>
    </>
  );
};

export default Modal;
