import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const API_URL = "http://localhost:5005";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h1>Promoters</h1>
      {isLoggedIn && (
        <Link to="/promoters/new">
          <button>Create Promoter</button>
        </Link>
      )}
      <div className="card">
        {promotersList.length === 0 ? (
          <p>No promoters found</p>
        ) : (
          promotersList.map((promoter) => (
            <div key={promoter._id} className="list-item">
              <h3>{promoter.name}</h3>
              <Link to={`/promoters/${promoter._id}`}>
                <button>Details</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PromotersListPage;
