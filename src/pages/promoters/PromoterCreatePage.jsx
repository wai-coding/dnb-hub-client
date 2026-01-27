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
    axios
      .post(`${API_URL}/promoters/create`, formData, {
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
    <div>
      <h1>Create Promoter</h1>
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
          Social Media:
          <input
            type="text"
            name="socialmedia"
            value={formData.socialmedia}
            onChange={handleChange}
          />
        </label>
        <label>
          Contacts:
          <input
            type="text"
            name="contacts"
            value={formData.contacts}
            onChange={handleChange}
          />
        </label>
        <label>
          Tickets:
          <input
            type="text"
            name="tickets"
            value={formData.tickets}
            onChange={handleChange}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default PromoterCreatePage;
