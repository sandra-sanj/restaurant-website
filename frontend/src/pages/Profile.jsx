import Modal from "../components/Modal";
import { useState } from 'react';
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
        if (confirm('Halutko varmasti poistaa käyttäjän?')) {
            await handleDelete();
            await handleLogout();
        }
        else return;
    }


    return (
        <div>
            {user && showEdit ? (
                <>
                    <h1 className="mb-5">Moi, {user.username}!</h1> 
                    <div className="profile-bar mb-5">
                        <button onClick={() => 
                            setShowModal('history')}
                             className="bg-[#982A2A]! text-white">Historia
                        </button>
                        <button onClick={() =>
                            setShowModal('payment')}
                             className="bg-[#982A2A]! text-white">Maksu
                        </button>
                        <button onClick={() => 
                            handleEdit()}
                             className="bg-[#982A2A]! text-white">✎
                        </button>
                    </div>
                    <div className="edit-prof">
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
                    {/*
                    <div className="edit-prof">   
                        <h3>Since: {user.created_at} </h3>
                    </div> 
                    */}      

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
              
              <button onClick={() => {handleEdit()}}
                className="bg-[#982A2A]! text-white">Takaisin</button>
              <br></br>
              <button onClick={() => deleteBtn()}
                className="bg-[#982A2A]! text-white">Poista käyttäjä</button>
            </>)}
            
            <br></br>
            <button onClick={() => handleLogout()}
                className="bg-[#982A2A]! text-white">Kirjaudu ulos</button>
            <br/>

            
        </div>
    );
};

export default Profile;