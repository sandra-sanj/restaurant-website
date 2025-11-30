import React from "react";

function Modal({ isOpen, onClose, children}) {
    if (!isOpen) return null; //wont show modal if isOpen is false

    return (
        <div
          className="joku" onClick={onClose}>
            <div
                className="modal-content" onClick={(e) => e.stopPropagation()} // blocks the closing of modal when clicked
            >
                {children}
                <button onClick={onClose}>Sulje</button>
            </div> 
        </div>
    )
}

export default Modal;