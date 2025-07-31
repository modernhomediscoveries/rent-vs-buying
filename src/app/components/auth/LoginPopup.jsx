const LoginPopup = ({ onClick }) => {
  return (
    <div className="p-10">
      <p className="text-xl">You must login to save reports.</p>
      <div className="flex items-center justify-between mt-10 text-center flex-wrap gap-5">
        <button
          className="bg-gray-100 hover:bg-gray-200 transition-all px-5 py-2 rounded-full text-black w-28"
          onClick={onClick}
        >
          Later
        </button>
        <a
          href="https://estategather.com/sign-up-log-in"
          target="_parent"
          className="bg-primary_green hover:bg-primary_green/80 transition-all text-white px-5 py-2 cursor-pointer rounded-full w-28"
          onClick="document.getElementById('myIframe').contentWindow.location.reload();"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default LoginPopup;
