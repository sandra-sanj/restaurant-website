const DeleteItem = ({onClose}) => {
  // TODO: lisää x-nappeihin onClick -> avaa DeleteConfirmation-komponentin
  return (
    <>
      <div className="m-5 outline-2 outline-gray-400 rounded-md w-[400px]">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#982A2A] text-white p-4 rounded-t-md">
          <p className="font-bold">Poista tuote</p>
          <span
            className="cursor-pointer font-bold text-lg hover:opacity-80"
            onClick={onClose}
          >
            &times;
          </span>
        </div>

        {/* Body */}
        <div className="bg-white p-4 rounded-b-md">
          <table className="w-full border-collapse text-left">
            <tbody>
              {/* TODO: Hae tähän menun tuotteet */}
              {["Maissilastut", "Maissilastut", "Maissilastut", "Maissilastut", "Maissilastut", "Maissilastut"].map(
                (item, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="p-2">
                      <button className="bg-[#982A2A]! text-white px-2 py-1 rounded-xl hover:opacity-90">
                        x
                      </button>
                    </td>
                    <td className="p-2">{item}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DeleteItem;
