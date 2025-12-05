import Modal from "../components/Modal";
import { useState } from 'react';
import { useUserContext } from "../hooks/contextHook";


const Profile = () => {
    const [showModal, setShowModal] = useState(null);
    const [showEdit, setShowEdit] = useState(false);

    const { user, handleLogout } = useUserContext();
    
    const closeModal = () => setShowModal(null);



    return (
        <div>
            {user ? (
                <>
                    <h1>Moi {user.username}</h1> 
                    <div className="profile-bar">
                        <button onClick={() => 
                            setShowModal('history')}>Historia
                        </button>
                        <button onClick={() =>
                            setShowModal('payment')}>Maksu
                        </button>
                        <button onClick={() => 
                            handleEdit()}>✎
                        </button>
                    </div>
                    <div className="edit-prof" onClick={() => setShowModal('name')}>
                        <h3>Nimi: {user.username} </h3>
                    </div>
                    <div className="edit-prof">
                        <h3>Sähköposti: {user.email} </h3>
                    </div>  
                    <div className="edit-prof">
                        <h3>Puhelinnumero: {user.phone}</h3>
                    </div>
                    <div className="edit-prof">   
                        <h3>Rooli: {user.role} </h3>
                    </div>     

                    <Modal isOpen={showModal === 'name'} onClose={closeModal}>
                        <label htmlFor="editName"> Nimi: 
                            <input 
                            type="text" 
                            id="editName" 
                            placeholder="  username"/>
                        </label>    
                    </Modal>

                    <Modal isOpen={showModal === 'history' } onClose={closeModal}>
                        <h2>ei vielä historiaa</h2>
                    </Modal>
                    <Modal isOpen={showModal === 'payment' } onClose={closeModal}>
                        <h2>Maksu metodit</h2>
                    </Modal>
                </>    
                ) : (
                  <p>tietoja ladataan</p>
                    )
                }

            <button onClick={handleLogout}>Kirjaudu ulos</button>
                    <br/>
            <button >Poista käyttäjä</button>
            
        </div>
    );
};

export default Profile;