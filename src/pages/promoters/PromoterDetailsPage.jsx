import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!promoter) return <p>Promoter not found</p>;

  return (
    <div>
      <h1>{promoter.name}</h1>
      {promoter.image && (
        <img
          src={promoter.image}
          alt={promoter.name}
          className="detail-image"
        />
      )}
      <div className="card">
        <p><strong>Bio:</strong> {promoter.bio}</p>
        {promoter.socialmedia && <p><strong>Social Media:</strong> {promoter.socialmedia}</p>}
        {promoter.contacts && <p><strong>Contacts:</strong> {promoter.contacts}</p>}
        {promoter.tickets && <p><strong>Tickets:</strong> {promoter.tickets}</p>}
      </div>
      {isLoggedIn && (
        <div>
          <Link to={`/promoters/${id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      <Link to="/promoters">
        <button>Back to Promoters</button>
      </Link>
    </div>
  );
};

export default PromoterDetailsPage;
