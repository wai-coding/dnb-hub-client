import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import placeholderImg from "../../assets/placeholder.png";
import { API_URL } from "../../config/config";

const PromotersListPage = () => {
  const [promotersList, setPromotersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/promoters`)
      .then((res) => {
        setPromotersList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load promoters");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Promoters</h1>
        {isLoggedIn && (
          <div className="page-actions">
            <Link to="/promoters/new">
              <button className="btn-primary">Create Promoter</button>
            </Link>
          </div>
        )}
      </div>
      {promotersList.length === 0 ? (
        <p>No promoters found</p>
      ) : (
        <div className="grid">
          {promotersList.map((promoter) => (
            <div key={promoter._id} className="card">
              <div className="card-media">
                <img
                  src={
                    promoter.image && promoter.image.trim() !== ""
                      ? promoter.image
                      : placeholderImg
                  }
                  alt={promoter.name || "Promoter"}
                  onError={(e) => {
                    e.currentTarget.src = placeholderImg;
                  }}
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">{promoter.name}</h3>
                <div className="card-actions">
                  <Link to={`/promoters/${promoter._id}`}>
                    <button>View Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PromotersListPage;
