import Modal from "../components/Modal";
import { useState } from 'react';
import { useUserContext } from "../hooks/contextHook";


const Profile = () => {
    const [showModal, setShowModal] = useState(null);
    const [loading, setLoading] = useState(true);

    const { user, handleLogout } = useUserContext();
    console.log(user);
    
    const closeModal = () => setShowModal(null);

    function handleLogOutBtn() {
        handleLogout();
    }


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
                            setShowModal('kieli')}>Kieli
                        </button>
                    </div>
                    <div className="edit-prof" onClick={() => setShowModal('name')}>
                        <h3>Nimi: {user.username} </h3>
                        <p>✎</p>
                    </div>
                    <div className="edit-prof">
                        <h3>Sähköposti: {user.email} </h3>
                        <p>✎</p>
                    </div>  
                    <div className="edit-prof">
                        <h3>Puhelinnumero: {user.phone}</h3>
                        <p>✎</p>
                    </div>
                    <div className="edit-prof">   
                        <h3>Rooli: {user.role} </h3>
                        <p>✎</p>
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
                    <Modal isOpen={showModal === 'kieli' } onClose={closeModal}>
                        <h2>kielesi on suomi</h2>
                    </Modal>
                </>    
                ) : (
                  <p>tietoja ladataan</p>
                    )
                }

            <button onClick={handleLogOutBtn}>Kirjaudu ulos</button>
                    <br/>
            <button >Poista käyttäjä</button>
            
        </div>
    );
};

export default Profile;