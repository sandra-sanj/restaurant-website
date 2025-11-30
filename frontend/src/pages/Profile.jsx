import {useUser} from "../hooks/apiHook";

const Profile = () => {
    const {user} = useUser;

    return (
        <div>
            {user &&
                <>
                    <h1>Profile</h1>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </>
            }
        </div>
    );
};

export default Profile;