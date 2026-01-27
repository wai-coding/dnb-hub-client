import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

const ArtistCreatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: "",
    bookings: "",
    socialmedia: "",
    promomix: "",
    promosong: "",
  });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/artists/create`, formData, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        nav("/artists");
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to create artist");
      });
  };

  return (
    <div>
      <h1>Create Artist</h1>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ArtistCreatePage;
