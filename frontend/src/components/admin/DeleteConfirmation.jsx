import {useMenu} from '../../hooks/apiHook';

const DeleteConfirmation = ({onClose, selectedItem, deleteSuccess}) => {
  const {deleteMenuItem} = useMenu();

  const handleDeleteItemClick = async () => {
    console.log('Delete from delete confirmation pressed');

    const token = localStorage.getItem('token');

    try {
      const delResponse = await deleteMenuItem(selectedItem, token);
      console.log('delResponse:', delResponse);
      alert(`${selectedItem.name} poistettu`);

      if (deleteSuccess) {
        deleteSuccess(selectedItem.menu_item_id); // Delete item from table
      }

      onClose();
    } catch (e) {
      console.log(e);
      alert(`${selectedItem.name} ei poistettu, jotain meni vikaan`);
    }
  };

  return (
    <>
      <div className="m-5 outline-2 outline-gray-400 rounded-md bg-white min-w-[200px] max-w-[300px]">
        <div className="flex justify-end p-3">
          <span
            className="cursor-pointer font-bold text-lg hover:opacity-80"
            onClick={onClose}
          >
            &times;
          </span>
        </div>
        <p className="p-3 pt-0">Poista {selectedItem.name}?</p>
        <button
          onClick={handleDeleteItemClick}
          className="bg-[#982A2A]! text-white px-2 py-1 rounded-xl hover:opacity-90"
        >
          Poista
        </button>
      </div>
    </>
  );
};

export default DeleteConfirmation;
