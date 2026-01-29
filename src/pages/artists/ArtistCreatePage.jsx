import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/config";

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
    const payload = { ...formData };
    if (!payload.image || payload.image.trim() === "") {
      delete payload.image;
    }
    axios
      .post(`${API_URL}/artists/create`, payload, {
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
    <div className="form-card">
      <h1>Create Artist</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Artist name"
            required
          />
        </div>
        <div className="form-row">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about the artist"
            required
          />
        </div>
        <div className="form-row">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="form-row">
          <label>Bookings</label>
          <input
            type="text"
            name="bookings"
            value={formData.bookings}
            onChange={handleChange}
            placeholder="Booking contact"
          />
        </div>
        <div className="form-row">
          <label>Social Media</label>
          <input
            type="text"
            name="socialmedia"
            value={formData.socialmedia}
            onChange={handleChange}
            placeholder="Social media links"
          />
        </div>
        <div className="form-row">
          <label>Promo Mix</label>
          <input
            type="text"
            name="promomix"
            value={formData.promomix}
            onChange={handleChange}
            placeholder="Link to promo mix"
          />
        </div>
        <div className="form-row">
          <label>Promo Song</label>
          <input
            type="text"
            name="promosong"
            value={formData.promosong}
            onChange={handleChange}
            placeholder="Link to promo song"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Create Artist
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtistCreatePage;
