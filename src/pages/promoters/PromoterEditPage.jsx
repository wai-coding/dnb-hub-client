import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

const PromoterEditPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: "",
    socialmedia: "",
    contacts: "",
    tickets: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/promoters/${id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          name: data.name || "",
          bio: data.bio || "",
          image: data.image || "",
          socialmedia: data.socialmedia || "",
          contacts: data.contacts || "",
          tickets: data.tickets || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load promoter");
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
    const payload = { ...formData };
    if (!payload.image || payload.image.trim() === "") {
      delete payload.image;
    }
    axios
      .put(`${API_URL}/promoters/${id}`, payload, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        nav(`/promoters/${id}`);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to update promoter");
      });
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="form-card">
      <h1>Edit Promoter</h1>
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
          <button type="submit" className="btn-primary">Update Promoter</button>
        </div>
      </form>
    </div>
  );
};

export default PromoterEditPage;
