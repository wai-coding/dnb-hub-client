import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import placeholderImg from "../assets/placeholder.png";

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);

  // Fallback to placeholder if no profile pic
  const avatarSrc =
    currentUser?.profilePicture && currentUser.profilePicture.trim() !== ""
      ? currentUser.profilePicture
      : placeholderImg;

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
                  e.target.src = placeholderImg;
                }}
              />
              <h1 className="profile-name">{currentUser.username || "User"}</h1>
              {currentUser.email && (
                <p className="profile-email">{currentUser.email}</p>
              )}
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
