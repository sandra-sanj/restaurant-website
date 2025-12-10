import Modal from '../components/Modal';
import {useState} from 'react';
import {useUserContext} from '../hooks/contextHook';
import {useLanguage} from '../hooks/useLanguage';
import EditForm from '../components/profile/EditForm';

const Profile = () => {
  const [showModal, setShowModal] = useState(null);
  const [showEdit, setShowEdit] = useState(true);

  const {user, handleLogout, handleDelete} = useUserContext();

  const {strings} = useLanguage();

  const closeModal = () => setShowModal(null);

  const handleEdit = () => {
    setShowEdit((current) => !current);
  };

  const deleteBtn = async () => {
    if (confirm('Halutko varmasti poistaa käyttäjän?')) {
      await handleDelete();
      await handleLogout();
    } else return;
  };

  // Helper to translate role
  const getRoleTranslation = (role) => {
    if (role === 'admin') return strings.profile.admin;
    if (role === 'customer') return strings.profile.customer;
    return role;
  };

  return (
    <div className="p-3 mb-5">
      {user && showEdit ? (
        <>
          <h1 className="m-5">
            {strings.profile.welcome}, {user.username}!
          </h1>
          <div className="profile-bar mb-5">
            <button
              onClick={() => setShowModal('history')}
              className="bg-[#982A2A]! text-white"
            >
              {strings.profile.history}
            </button>
            <button
              onClick={() => setShowModal('payment')}
              className="bg-[#982A2A]! text-white"
            >
              {strings.profile.payment}
            </button>
            <button
              onClick={() => handleEdit()}
              className="bg-[#982A2A]! text-white"
            >
              ✎
            </button>
          </div>

          <div className="p-2 flex flex-col items-center">
            <div className="p-2 min-w-[300px] text-left">
              <div className="edit-prof">
                <h3>
                  {strings.profile.name}: {user.username}{' '}
                </h3>
              </div>
              <div className="edit-prof">
                <h3>
                  {strings.profile.email}: {user.email}{' '}
                </h3>
              </div>
              <div className="edit-prof">
                <h3>
                  {strings.profile.phone}: {user.phone}
                </h3>
              </div>
              <div className="edit-prof">
                <h3>
                  {strings.profile.role}: {getRoleTranslation(user.role)}
                </h3>
              </div>

              {/*
                    <div className="edit-prof">   
                        <h3>Since: {user.created_at} </h3>
                    </div> 
                    */}
            </div>
          

          <Modal isOpen={showModal === 'name'} onClose={closeModal}>
            <label htmlFor="editName">
              {' '}
              {strings.profile.name}:
              <input type="text" id="editName" placeholder="  username" />
            </label>
          </Modal>

          <Modal isOpen={showModal === 'history'} onClose={closeModal}>
            <h2 className="p-2">{strings.profile.noHistory}</h2>
          </Modal>
          <Modal isOpen={showModal === 'payment'} onClose={closeModal}>
            <h2 className="p-2">{strings.profile.paymentMethods}</h2>
          </Modal>
          </div>
        </>
      ) : (
        <>
          <EditForm></EditForm>
          <button
            onClick={() => {
              handleEdit();
            }}
            className="bg-[#982A2A]! text-white"
          >
            {strings.profile.back}
          </button>
          <br></br>
          <button
            onClick={() => deleteBtn()}
            className="bg-[#982A2A]! text-white"
          >
            {strings.profile.deleteAccount}
          </button>
        </>
      )}

      <br></br>
      <button
        onClick={() => handleLogout()}
        className="bg-[#982A2A]! text-white"
      >
        {strings.profile.logout}
      </button>
      <br />
    </div>
  );
};

export default Profile;
