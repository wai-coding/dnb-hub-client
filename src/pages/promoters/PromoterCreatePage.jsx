import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

const PromoterCreatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: "",
    socialmedia: "",
    contacts: "",
    tickets: "",
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
      .post(`${API_URL}/promoters/create`, payload, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        nav("/promoters");
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to create promoter");
      });
  };

  return (
    <div className="form-card">
      <h1>Create Promoter</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Promoter name"
            required
          />
        </div>
        <div className="form-row">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about the promoter"
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
          <label>Contacts</label>
          <input
            type="text"
            name="contacts"
            value={formData.contacts}
            onChange={handleChange}
            placeholder="Contact information"
          />
        </div>
        <div className="form-row">
          <label>Tickets</label>
          <input
            type="text"
            name="tickets"
            value={formData.tickets}
            onChange={handleChange}
            placeholder="Ticket links"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          <button type="submit" className="btn-primary">Create Promoter</button>
        </div>
      </form>
    </div>
  );
};

export default PromoterCreatePage;
