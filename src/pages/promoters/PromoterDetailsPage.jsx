import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import placeholderImg from "../../assets/placeholder.png";

const API_URL = "http://localhost:5005";

const PromoterDetailsPage = () => {
  const { id } = useParams();
  const [promoter, setPromoter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const nav = useNavigate();

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

  return (
    <div className="page">
      <div className="details-card">
        <div className="details-card-media">
          <img
            src={promoter.image && promoter.image.trim() !== "" ? promoter.image : placeholderImg}
            alt={promoter.name || "Promoter"}
            onError={(e) => { e.currentTarget.src = placeholderImg; }}
          />
        </div>
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
                <span className="details-card-value">{promoter.socialmedia}</span>
              </div>
            )}
            {promoter.contacts && (
              <div className="details-card-row">
                <span className="details-card-label">Contacts</span>
                <span className="details-card-value">{promoter.contacts}</span>
              </div>
            )}
            {promoter.tickets && (
              <div className="details-card-row">
                <span className="details-card-label">Tickets</span>
                <span className="details-card-value">{promoter.tickets}</span>
              </div>
            )}
          </div>
          <div className="details-card-actions">
            <Link to="/promoters">
              <button>Back to Promoters</button>
            </Link>
            {isLoggedIn && (
              <>
                <Link to={`/promoters/${id}/edit`}>
                  <button className="btn-secondary">Edit</button>
                </Link>
                <button className="btn-danger" onClick={handleDelete}>Delete</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoterDetailsPage;
