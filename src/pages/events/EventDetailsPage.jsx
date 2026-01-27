import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const API_URL = "http://localhost:5005";

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/events/${id}`)
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load event");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    const token = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/events/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        nav("/events");
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to delete event");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!event) return <p>Event not found</p>;

  return (
    <div>
      <h1>{event.eventname}</h1>
      {event.image && (
        <img
          src={event.image}
          alt={event.eventname}
          className="detail-image"
        />
      )}
      <div className="card">
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price:</strong> {event.price}</p>
        <p><strong>Promoter:</strong> {event.promoter ? event.promoter.name : "No promoter"}</p>
        <p><strong>Artists:</strong> {event.artists && event.artists.length > 0 ? event.artists.map((a) => a.name).join(", ") : "No artists"}</p>
        {event.socialmedia && <p><strong>Social Media:</strong> {event.socialmedia}</p>}
        {event.contacts && <p><strong>Contacts:</strong> {event.contacts}</p>}
      </div>
      {isLoggedIn && (
        <div>
          <Link to={`/events/${id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      <Link to="/events">
        <button>Back to Events</button>
      </Link>
    </div>
  );
};

export default EventDetailsPage;
