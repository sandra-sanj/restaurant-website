import {useUser} from "../hooks/apiHook";
import Modal from "../components/Modal";

const Profile = () => {
    //const {user} = useUser();

    return (
        <div>
                <>
                    <h1>Burrito member</h1> 
                    <p>Username: nimi</p>
                    <div className="profile-bar">
                        <button></button>
                    </div>
                </>
        </div>
    );
};

export default Profile;