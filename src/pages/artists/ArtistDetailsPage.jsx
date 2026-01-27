import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const API_URL = "http://localhost:5005";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!artist) return <p>Artist not found</p>;

  return (
    <div>
      <h1>{artist.name}</h1>
      {artist.image && (
        <img
          src={artist.image}
          alt={artist.name}
          className="detail-image"
        />
      )}
      <div className="card">
        <p><strong>Bio:</strong> {artist.bio}</p>
        {artist.bookings && <p><strong>Bookings:</strong> {artist.bookings}</p>}
        {artist.socialmedia && <p><strong>Social Media:</strong> {artist.socialmedia}</p>}
        {artist.promomix && <p><strong>Promo Mix:</strong> {artist.promomix}</p>}
        {artist.promosong && <p><strong>Promo Song:</strong> {artist.promosong}</p>}
      </div>
      {isLoggedIn && (
        <div>
          <Link to={`/artists/${id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      <Link to="/artists">
        <button>Back to Artists</button>
      </Link>
    </div>
  );
};

export default ArtistDetailsPage;
