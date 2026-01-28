import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

const EventEditPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    eventname: "",
    description: "",
    date: "",
    location: "",
    price: "",
    image: "",
    promoter: "",
    socialmedia: "",
    contacts: "",
  });
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [promotersList, setPromotersList] = useState([]);
  const [artistsList, setArtistsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/promoters`).then((res) => setPromotersList(res.data)).catch((err) => console.log(err));
    axios.get(`${API_URL}/artists`).then((res) => setArtistsList(res.data)).catch((err) => console.log(err));
    axios
      .get(`${API_URL}/events/${id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          eventname: data.eventname || "",
          description: data.description || "",
          date: data.date ? data.date.split("T")[0] : "",
          location: data.location || "",
          price: data.price || "",
          image: data.image || "",
          promoter: data.promoter ? data.promoter._id : "",
          socialmedia: data.socialmedia || "",
          contacts: data.contacts || "",
        });
        setSelectedArtists(data.artists ? data.artists.map((a) => a._id) : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load event");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArtistCheck = (e) => {
    const artistId = e.target.value;
    if (e.target.checked) {
      setSelectedArtists([...selectedArtists, artistId]);
    } else {
      setSelectedArtists(selectedArtists.filter((aid) => aid !== artistId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("authToken");
    const dataToSend = {
      ...formData,
      promoter: formData.promoter === "" ? null : formData.promoter,
      artists: selectedArtists,
    };
    if (!dataToSend.image || dataToSend.image.trim() === "") {
      delete dataToSend.image;
    }
    axios
      .put(`${API_URL}/events/${id}`, dataToSend, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        nav(`/events/${id}`);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to update event");
      });
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="form-card">
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <label>Event Name</label>
          <input
            type="text"
            name="eventname"
            value={formData.eventname}
            onChange={handleChange}
            placeholder="Enter event name"
            required
          />
        </div>
        <div className="form-row">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the event"
            required
          />
        </div>
        <div className="form-row">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Event location"
            required
          />
        </div>
        <div className="form-row">
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Ticket price"
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
          <label>Promoter</label>
          <select name="promoter" value={formData.promoter} onChange={handleChange}>
            <option value="">No Promoter</option>
            {promotersList.map((p) => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label>Artists</label>
          <div className="form-checkbox-group">
            {artistsList.map((a) => (
              <label key={a._id} className="checkbox-label">
                <input
                  type="checkbox"
                  value={a._id}
                  checked={selectedArtists.includes(a._id)}
                  onChange={handleArtistCheck}
                />
                {a.name}
              </label>
            ))}
          </div>
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
        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          <button type="submit" className="btn-primary">Update Event</button>
        </div>
      </form>
    </div>
  );
};

export default EventEditPage;
