import {useUser} from "../hooks/apiHook";
import Modal from "../components/Modal";
import { useState } from 'react';

//TODO: lisää ikonit maksumetodiin ja historiaan
// tee mahdollisesti omat komponentit modaaleille?
//pitäisikö vaihtaa EDIT napin kohdalle kieli ja tietojen kohdalle nuoli, mistä voi suoraan editoida?

const Profile = () => {
    const [showModal, setShowModal] = useState(null);
    //const {user} = useUser();

    const closeModal = () => setShowModal(null);


    return (
        <div>
                <>
                    <h1>Burrito jäsen</h1> 
                    <div className="edit-prof" onClick={() => setShowModal('name')}>
                        <h3>Nimi: nimi</h3>
                        <p>✎</p>
                    </div>
                    <div className="edit-prof">
                        <h3>Sähköposti: email</h3>
                        <p>✎</p>
                    </div>  
                    <div className="edit-prof">
                        <h3>Puhelinnumero: </h3>
                        <p>✎</p>
                    </div>
                    <div className="edit-prof">   
                        <h3>Osoite: </h3>
                        <p>✎</p>
                    </div>     
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
                    </div>
                    <button>Kirjaudu ulos</button>
                    <br/>
                    <button>Poista käyttäjä</button>
                </>
        </div>
    );
};

export default Profile;