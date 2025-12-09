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
    <div>
      {user && showEdit ? (
        <>
          <h1>
            {strings.profile.welcome} {user.username}
          </h1>
          <div className="profile-bar">
            <button onClick={() => setShowModal('history')}>
              {strings.profile.history}
            </button>
            <button onClick={() => setShowModal('payment')}>
              {strings.profile.payment}
            </button>
            <button onClick={() => handleEdit()}>✎</button>
          </div>
          <div className="edit-prof" onClick={() => setShowModal('name')}>
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
              {strings.profile.role}: {getRoleTranslation(user.role)}{' '}
            </h3>
          </div>

          <Modal isOpen={showModal === 'name'} onClose={closeModal}>
            <label htmlFor="editName">
              {' '}
              {strings.profile.name}:
              <input type="text" id="editName" placeholder="  username" />
            </label>
          </Modal>

          <Modal isOpen={showModal === 'history'} onClose={closeModal}>
            <h2>{strings.profile.noHistory}</h2>
          </Modal>
          <Modal isOpen={showModal === 'payment'} onClose={closeModal}>
            <h2>{strings.profile.paymentMethods}</h2>
          </Modal>
        </>
      ) : (
        <>
          <EditForm></EditForm>
          <button
            onClick={() => {
              handleEdit();
            }}
          >
            {strings.profile.back}
          </button>
          <br></br>
          <button onClick={() => deleteBtn()}>
            {strings.profile.deleteAccount}
          </button>
        </>
      )}

      <br></br>
      <button onClick={() => handleLogout()}>{strings.profile.logout}</button>
      <br />
    </div>
  );
};

export default Profile;
