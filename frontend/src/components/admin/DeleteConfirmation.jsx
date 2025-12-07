const DeleteConfirmation = ({onClose, selectedItem}) => {
  
  const handleDeleteItemClick = () => {
    console.log('Delete from delete confirmation pressed');
    // TODO: poista / piilota tuote

  }

  return (
    <>
      <div className="m-5 outline-2 outline-gray-400 rounded-md">
        <div className="flex justify-end p-3">
          <span className="cursor-pointer font-bold text-lg hover:opacity-80" onClick={onClose}>
            &times;
          </span>
        </div>
        <p className="p-3 pt-0">Poista {selectedItem.name}?</p>
        <button onClick={handleDeleteItemClick}
        className="bg-[#982A2A]! text-white px-2 py-1 rounded-xl hover:opacity-90"
        >Poista</button>
      </div>
    </>
  );
};

export default DeleteConfirmation;
