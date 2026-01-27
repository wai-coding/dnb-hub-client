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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input
            type="text"
            name="eventname"
            value={formData.eventname}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={formData.price}
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
          Promoter:
          <select name="promoter" value={formData.promoter} onChange={handleChange}>
            <option value="">No Promoter</option>
            {promotersList.map((p) => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
        </label>
        <label>
          Artists:
          <div>
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EventEditPage;
