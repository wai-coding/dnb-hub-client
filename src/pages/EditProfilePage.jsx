import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import placeholderImg from "../assets/placeholder.png";
import { API_URL } from "../config/config";

const EditProfilePage = () => {
  const { currentUser, updateCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill form on mount
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username || "");
      setEmail(currentUser.email || "");
      setProfilePicture(currentUser.profilePicture || "");
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");
      const { data } = await axios.put(
        `${API_URL}/auth/profile`,
        { username, profilePicture },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      updateCurrentUser(data.user);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.errorMessage || "Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview falls back to placeholder
  const previewSrc =
    profilePicture && profilePicture.trim() !== ""
      ? profilePicture
      : placeholderImg;

  if (!currentUser) {
    return (
      <div className="page edit-profile-page">
        <div className="edit-profile-card">
          <p className="edit-profile-empty">
            No user information available.{" "}
            <Link to="/profile">Go back to profile</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page edit-profile-page">
      <div className="edit-profile-card">
        <h1 className="edit-profile-title">Edit Profile</h1>

        <div className="edit-profile-avatar-wrapper">
          <img
            src={previewSrc}
            alt="Profile preview"
            className="edit-profile-avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholderImg;
            }}
          />
        </div>

        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="input-disabled"
            />
            <span className="form-hint">Email cannot be changed</span>
          </div>

          <div className="form-row">
            <label htmlFor="profilePicture">Profile Picture URL</label>
            <input
              type="url"
              id="profilePicture"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              placeholder="https://example.com/your-image.jpg"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <div className="edit-profile-actions">
            <Link to="/profile" className="btn btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
