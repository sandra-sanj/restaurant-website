import {useLanguage} from '../../hooks/useLanguage';

const EditMenu = ({addItemClick, editItemClick, deleteItemClick}) => {
  const {strings} = useLanguage();

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <button onClick={addItemClick} className="bg-[#982A2A]! text-white">
          {strings.adminForms.addProduct}
        </button>
        <button onClick={editItemClick} className="bg-[#982A2A]! text-white">
          {strings.adminForms.editProduct}
        </button>
        <button onClick={deleteItemClick} className="bg-[#982A2A]! text-white">
          {strings.adminForms.deleteProduct}
        </button>
      </div>
    </>
  );
};

export default EditMenu;
