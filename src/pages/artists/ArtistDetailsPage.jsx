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
  const { isLoggedIn } = useContext(AuthContext);
  const nav = useNavigate();

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

  return (
    <div className="page">
      <div className="details-card">
        <div className="details-card-media">
          <img
            src={
              artist.image && artist.image.trim() !== ""
                ? artist.image
                : placeholderImg
            }
            alt={artist.name || "Artist"}
            onError={(e) => {
              e.currentTarget.src = placeholderImg;
            }}
          />
        </div>
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
                <span className="details-card-value">{artist.bookings}</span>
              </div>
            )}
            {artist.socialmedia && (
              <div className="details-card-row">
                <span className="details-card-label">Social Media</span>
                <span className="details-card-value">{artist.socialmedia}</span>
              </div>
            )}
            {artist.promomix && (
              <div className="details-card-row">
                <span className="details-card-label">Promo Mix</span>
                <span className="details-card-value">{artist.promomix}</span>
              </div>
            )}
            {artist.promosong && (
              <div className="details-card-row">
                <span className="details-card-label">Promo Song</span>
                <span className="details-card-value">{artist.promosong}</span>
              </div>
            )}
          </div>
          <div className="details-card-actions">
            <Link to="/artists">
              <button>Back to Artists</button>
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
