import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import placeholderImg from "../../assets/placeholder.png";
import { API_URL } from "../../config/config";

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

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Artists</h1>
        {isLoggedIn && (
          <div className="page-actions">
            <Link to="/artists/new">
              <button className="btn-primary">Create Artist</button>
            </Link>
          </div>
        )}
      </div>
      {artistsList.length === 0 ? (
        <p>No artists found</p>
      ) : (
        <div className="grid">
          {artistsList.map((artist) => (
            <div key={artist._id} className="card">
              <div className="card-media">
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
              <div className="card-body">
                <h3 className="card-title">{artist.name}</h3>
                <div className="card-actions">
                  <Link to={`/artists/${artist._id}`}>
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

export default ArtistsListPage;
