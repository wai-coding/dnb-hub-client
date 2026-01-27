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
    axios
      .put(`${API_URL}/promoters/${id}`, formData, {
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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Promoter</h1>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default PromoterEditPage;
