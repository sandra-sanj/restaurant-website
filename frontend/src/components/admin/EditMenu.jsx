const EditMenu = ({addItemClick, editItemClick, deleteItemClick}) => {
  return (
    <>
      <h2>Muokkaa ruokalistaa</h2>
      <button onClick={addItemClick}>Lisää tuote</button>
      <button onClick={editItemClick}>Muokkaa tuotetta</button>
      <button onClick={deleteItemClick}>Poista tuote</button>
    </>
  );
};

export default EditMenu;
