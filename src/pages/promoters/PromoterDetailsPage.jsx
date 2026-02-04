import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import placeholderImg from "../../assets/placeholder.png";
import { API_URL } from "../../config/config";

const PromoterDetailsPage = () => {
  const { id } = useParams();
  const [promoter, setPromoter] = useState(null);
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
      .get(`${API_URL}/promoters/${id}`)
      .then((res) => {
        setPromoter(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load promoter");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    const token = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/promoters/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        nav("/promoters");
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to delete promoter");
      });
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!promoter) return <p>Promoter not found</p>;

  const imageSrc =
    promoter.image && promoter.image.trim() !== ""
      ? promoter.image
      : placeholderImg;

  return (
    <div className="page">
      <div className="details-card">
        <img
          src={imageSrc}
          alt={promoter.name || "Promoter"}
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
              alt={promoter.name || "Promoter"}
              className="image-modal-content"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
        <div className="details-card-content">
          <h1 className="details-card-title">{promoter.name}</h1>
          <div className="details-card-info">
            <div className="details-card-row">
              <span className="details-card-label">Bio</span>
              <span className="details-card-value">{promoter.bio}</span>
            </div>
            {promoter.socialmedia && (
              <div className="details-card-row">
                <span className="details-card-label">Social Media</span>
                <span className="details-card-value">
                  <a href={promoter.socialmedia} target="_blank" rel="noreferrer">
                    {promoter.socialmedia}
                  </a>
                </span>
              </div>
            )}
            {promoter.contacts && (
              <div className="details-card-row">
                <span className="details-card-label">Contacts</span>
                <span className="details-card-value">
                  <a href={`mailto:${promoter.contacts}`} target="_blank" rel="noreferrer">
                    {promoter.contacts}
                  </a>
                </span>
              </div>
            )}
            {promoter.tickets && (
              <div className="details-card-row">
                <span className="details-card-label">Tickets</span>
                <span className="details-card-value">
                  <a href={promoter.tickets} target="_blank" rel="noreferrer">
                    {promoter.tickets}
                  </a>
                </span>
              </div>
            )}
          </div>
          <div className="details-card-actions">
            <Link to="/promoters">
              <button>Back</button>
            </Link>
            <Link to="/">
              <button>Home</button>
            </Link>
            {isLoggedIn && (
              <>
                <Link to={`/promoters/${id}/edit`}>
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

export default PromoterDetailsPage;
