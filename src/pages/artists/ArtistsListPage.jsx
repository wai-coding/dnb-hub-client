import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const API_URL = "http://localhost:5005";

const ArtistsListPage = () => {
  const [artistsList, setArtistsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/artists`)
      .then((res) => {
        setArtistsList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load artists");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h1>Artists</h1>
      {isLoggedIn && (
        <Link to="/artists/new">
          <button>Create Artist</button>
        </Link>
      )}
      <div className="card">
        {artistsList.length === 0 ? (
          <p>No artists found</p>
        ) : (
          artistsList.map((artist) => (
            <div key={artist._id} className="list-item">
              <h3>{artist.name}</h3>
              <Link to={`/artists/${artist._id}`}>
                <button>Details</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArtistsListPage;
