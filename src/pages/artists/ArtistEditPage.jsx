import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

const ArtistEditPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: "",
    bookings: "",
    socialmedia: "",
    promomix: "",
    promosong: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/artists/${id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          name: data.name || "",
          bio: data.bio || "",
          image: data.image || "",
          bookings: data.bookings || "",
          socialmedia: data.socialmedia || "",
          promomix: data.promomix || "",
          promosong: data.promosong || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load artist");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("authToken");
    axios
      .put(`${API_URL}/artists/${id}`, formData, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        nav(`/artists/${id}`);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to update artist");
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Artist</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Bio:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </label>
        <label>
          Bookings:
          <input
            type="text"
            name="bookings"
            value={formData.bookings}
            onChange={handleChange}
          />
        </label>
        <label>
          Social Media:
          <input
            type="text"
            name="socialmedia"
            value={formData.socialmedia}
            onChange={handleChange}
          />
        </label>
        <label>
          Promo Mix:
          <input
            type="text"
            name="promomix"
            value={formData.promomix}
            onChange={handleChange}
          />
        </label>
        <label>
          Promo Song:
          <input
            type="text"
            name="promosong"
            value={formData.promosong}
            onChange={handleChange}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ArtistEditPage;
