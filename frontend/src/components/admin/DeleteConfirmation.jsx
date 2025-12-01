const DeleteConfirmation = ({onClose}) => {
  return (
    <>
      <div className="m-5 outline-2 outline-gray-400 rounded-md">
        <div>
          <span className="cursor-pointer" onClick={onClose}>
            &times;
          </span>
        </div>
        <p>Poista "Kanatacot x 3"?</p>
        <button>Poista</button>
      </div>
    </>
  );
};

export default DeleteConfirmation;
