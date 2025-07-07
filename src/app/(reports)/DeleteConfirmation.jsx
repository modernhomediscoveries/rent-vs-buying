const DeleteConfirmation = ({ onClick }) => {
  return (
    <div className="p-10">
      <p className="text-xl">Are you sure you want to delete this report?</p>
      <div className="flex items-center justify-between mt-10 flex-wrap gap-5">
        <button
          className="bg-gray-100 hover:bg-gray-200 rounded px-10 py-2 text-lg transition-all w-28"
          onClick={() => onClick("no")}
        >
          No
        </button>
        <button
          className="bg-primary_green hover:bg-primary_green/80 rounded px-10 py-2 text-white text-lg transition-all w-28"
          onClick={() => onClick("yes")}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
