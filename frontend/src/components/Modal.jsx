import React from 'react';

function Modal({isOpen, onClose, children, unstyled=false}) {
  if (!isOpen) return null; //wont show modal if isOpen is false

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 overflow-y-scroll"
      onClick={onClose}
    >

      {/* Unstyled for larger modals in admin page */}
      {unstyled ? (
        <div onClick={(e) => e.stopPropagation()}
        className='mt-10'>
          {children}
        </div>
      ) : (

      <div
        className="m-6 outline-2 outline-gray-400 rounded-md w-[300px] min-w-[350px] xs:w-[350px] sm:w-[500px] bg-[#FFFFFF] pb-3 max-h-[85vh] overflow-y-auto overflow-x-hidden"
        onClick={onClose}
      >
        <span
          className="cursor-pointer font-bold text-lg justify-end flex mr-2"
          onClick={() => onClose}
        >
          &times;
        </span>
        <div
          className="modal-content p-3"
          onClick={(e) => e.stopPropagation()} // blocks the closing of modal when clicked
        >
          {children}
        </div>
      </div>
      )}
    </div>
  );
}

export default Modal;
