import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import placeholderImg from "../../assets/placeholder.png";
import { API_URL } from "../../config/config";

const ArtistDetailsPage = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isImageOpen, setIsImageOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const nav = useNavigate();

  // Close modal on Escape key and prevent background scroll
  useEffect(() => {
    if (!isImageOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsImageOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isImageOpen]);

  useEffect(() => {
    axios
      .get(`${API_URL}/artists/${id}`)
      .then((res) => {
        setArtist(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load artist");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    const token = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/artists/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        nav("/artists");
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to delete artist");
      });
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!artist) return <p>Artist not found</p>;

  const imageSrc =
    artist.image && artist.image.trim() !== "" ? artist.image : placeholderImg;

  return (
    <div className="page">
      <div className="details-card">
        <img
          src={imageSrc}
          alt={artist.name || "Artist"}
          className="details-image details-image-small"
          onClick={() => setIsImageOpen(true)}
          onError={(e) => {
            e.currentTarget.src = placeholderImg;
          }}
        />

        {isImageOpen && (
          <div className="image-modal" onClick={() => setIsImageOpen(false)}>
            <button
              className="image-modal-close"
              onClick={() => setIsImageOpen(false)}
            >
              ×
            </button>
            <img
              src={imageSrc}
              alt={artist.name || "Artist"}
              className="image-modal-content"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
        <div className="details-card-content">
          <h1 className="details-card-title">{artist.name}</h1>
          <div className="details-card-info">
            <div className="details-card-row">
              <span className="details-card-label">Bio</span>
              <span className="details-card-value">{artist.bio}</span>
            </div>
            {artist.bookings && (
              <div className="details-card-row">
                <span className="details-card-label">Bookings</span>
                <span className="details-card-value">
                  <a href={`mailto:${artist.bookings}`} target="_blank" rel="noreferrer">
                    {artist.bookings}
                  </a>
                </span>
              </div>
            )}
            {artist.socialmedia && (
              <div className="details-card-row">
                <span className="details-card-label">Social Media</span>
                <span className="details-card-value">
                  <a href={artist.socialmedia} target="_blank" rel="noreferrer">
                    {artist.socialmedia}
                  </a>
                </span>
              </div>
            )}
            {artist.promomix && (
              <div className="details-card-row">
                <span className="details-card-label">Promo Mix</span>
                <span className="details-card-value">
                  <a href={artist.promomix} target="_blank" rel="noreferrer">
                    {artist.promomix}
                  </a>
                </span>
              </div>
            )}
            {artist.promosong && (
              <div className="details-card-row">
                <span className="details-card-label">Promo Song</span>
                <span className="details-card-value">
                  <a href={artist.promosong} target="_blank" rel="noreferrer">
                    {artist.promosong}
                  </a>
                </span>
              </div>
            )}
          </div>
          <div className="details-card-actions">
            <Link to="/artists">
              <button>Back</button>
            </Link>
            <Link to="/">
              <button>Home</button>
            </Link>
            {isLoggedIn && (
              <>
                <Link to={`/artists/${id}/edit`}>
                  <button className="btn-secondary">Edit</button>
                </Link>
                <button className="btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetailsPage;
