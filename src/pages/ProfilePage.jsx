import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import defaultAvatar from "../assets/avatar.png";

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);

  // Fallback to default avatar if no profile pic
  const avatarSrc =
    currentUser?.profilePicture && currentUser.profilePicture.trim() !== ""
      ? currentUser.profilePicture
      : defaultAvatar;

  return (
    <div className="page profile-page">
      <div className="profile-card">
        {!currentUser ? (
          <p className="profile-empty">No user information available.</p>
        ) : (
          <>
            <div className="profile-header">
              <img
                src={avatarSrc}
                alt={`${currentUser.username || "User"}'s avatar`}
                className="profile-avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultAvatar;
                }}
              />
            </div>

            <div className="profile-info">
              {currentUser.username && (
                <div className="profile-row">
                  <span className="profile-label">Username</span>
                  <span className="profile-value">{currentUser.username}</span>
                </div>
              )}
              {currentUser.email && (
                <div className="profile-row">
                  <span className="profile-label">Email</span>
                  <span className="profile-value">{currentUser.email}</span>
                </div>
              )}
            </div>

            <div className="profile-actions">
              <Link to="/profile/edit" className="btn btn-primary">
                Edit Profile
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
