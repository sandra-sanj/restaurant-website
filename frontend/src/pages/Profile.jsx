import Modal from "../components/Modal";
import { useState, useEffect } from 'react';
import { useUserContext } from "../hooks/contextHook";
import EditForm from "../components/profile/EditForm";


const Profile = () => {
    const [showModal, setShowModal] = useState(null);
    const [showEdit, setShowEdit] = useState(true);

    const { user, handleLogout, handleDelete } = useUserContext();
    
    const closeModal = () => setShowModal(null);

    const handleEdit = () => {
        setShowEdit(current => !current);
    }

    const deleteBtn = async () => {
        await handleDelete();
        await handleLogout();
    }


    useEffect(() => {
        console.log('changed?');
    }, [showEdit]);

    return (
        <div>
            {user && showEdit ? (
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
            <>
              <EditForm></EditForm>
              <button onClick={() => {handleEdit()}}>Lopeta</button>
              <br></br>
              <button onClick={deleteBtn}>Poista käyttäjä</button>
            </>)}
            
            <br></br>
            <button onClick={handleLogout}>Kirjaudu ulos</button>
            <br/>

            
        </div>
    );
};

export default Profile;