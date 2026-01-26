import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div>
      <h1>Welcome {currentUser.username}</h1>
      <img
        src={currentUser.profilePicture}
        alt="profile image"
        className="profile-picture"
      />
    </div>
  );
};
export default ProfilePage;
