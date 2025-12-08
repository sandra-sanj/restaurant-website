import { useEffect } from 'react';
import {useMenu} from '../../hooks/apiHook';
import DeleteConfirmation from './DeleteConfirmation';
import {useState} from 'react';

const DeleteItem = ({onClose}) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {menuArray, loading, error} = useMenu();

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setMenuItems(menuArray);
  }, [menuArray]);

  const handleItemDeleted = (deletedItemId) => {
    setMenuItems(prev => prev.filter(item => item.menu_item_id !== deletedItemId));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseClick = () => {
    setDeleteConfirmationOpen(false);
    setSelectedItem(null); // Reset selected item
  };

  return (
    <>
      {deleteConfirmationOpen && (
        <DeleteConfirmation
          onClose={handleCloseClick}
          selectedItem={selectedItem}
          deleteSuccess={handleItemDeleted}
        />
      )}

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
        <div className="bg-white p-1 rounded-b-md">
          <table className="w-full border-collapse text-left">
            <tbody>
              {menuItems.map((item) => (
                <tr
                  key={item.menu_item_id}
                  className="hover:bg-gray-100"
                >
                  <td className="p-0">
                    <button
                      className="bg-[#982A2A]! text-white px-1 py-0.5 rounded-xl hover:opacity-90 m-2!"
                      onClick={() => handleDeleteClick(item)}
                    >
                      x
                    </button>
                  </td>
                  <td className="p-0">{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DeleteItem;
