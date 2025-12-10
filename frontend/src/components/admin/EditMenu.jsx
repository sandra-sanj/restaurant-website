const EditMenu = ({addItemClick, editItemClick, deleteItemClick}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <button onClick={addItemClick} className="bg-[#982A2A]! text-white">
          Lisää tuote
        </button>
        <button onClick={editItemClick} className="bg-[#982A2A]! text-white">
          Muokkaa tuotetta
        </button>
        <button onClick={deleteItemClick} className="bg-[#982A2A]! text-white">
          Poista tuote
        </button>
      </div>
    </>
  );
};

export default EditMenu;
