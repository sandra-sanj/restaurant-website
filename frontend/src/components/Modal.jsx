import React from "react";

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null; //wont show modal if isOpen is false

    return (
        <div
          className="m-5 outline-2 outline-gray-400 rounded-md w-[500px]" onClick={onClose}>
            <span className="cursor-pointer" onClick={() => onClose}>
            &times;
          </span>
            <div
                className="modal-content" onClick={(e) => e.stopPropagation()} // blocks the closing of modal when clicked
            >
                {children}
            </div> 
        </div>
    )
}

export default Modal;