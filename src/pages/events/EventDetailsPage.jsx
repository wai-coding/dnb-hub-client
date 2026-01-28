import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import placeholderImg from "../../assets/placeholder.png";

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

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!event) return <p>Event not found</p>;

  return (
    <div className="page">
      <div className="details-card">
        <div className="details-card-media">
          <img
            src={event.image && event.image.trim() !== "" ? event.image : placeholderImg}
            alt={event.eventname || "Event"}
            onError={(e) => { e.currentTarget.src = placeholderImg; }}
          />
        </div>
        <div className="details-card-content">
          <h1 className="details-card-title">{event.eventname}</h1>
          <div className="details-card-info">
            <div className="details-card-row">
              <span className="details-card-label">Description</span>
              <span className="details-card-value">{event.description}</span>
            </div>
            <div className="details-card-row">
              <span className="details-card-label">Date</span>
              <span className="details-card-value">{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="details-card-row">
              <span className="details-card-label">Location</span>
              <span className="details-card-value">{event.location}</span>
            </div>
            <div className="details-card-row">
              <span className="details-card-label">Price</span>
              <span className="details-card-value">{event.price}</span>
            </div>
            <div className="details-card-row">
              <span className="details-card-label">Promoter</span>
              <span className="details-card-value">{event.promoter ? event.promoter.name : "No promoter"}</span>
            </div>
            <div className="details-card-row">
              <span className="details-card-label">Artists</span>
              <span className="details-card-value">{event.artists && event.artists.length > 0 ? event.artists.map((a) => a.name).join(", ") : "No artists"}</span>
            </div>
            {event.socialmedia && (
              <div className="details-card-row">
                <span className="details-card-label">Social Media</span>
                <span className="details-card-value">{event.socialmedia}</span>
              </div>
            )}
            {event.contacts && (
              <div className="details-card-row">
                <span className="details-card-label">Contacts</span>
                <span className="details-card-value">{event.contacts}</span>
              </div>
            )}
          </div>
          <div className="details-card-actions">
            <Link to="/events">
              <button>Back to Events</button>
            </Link>
            {isLoggedIn && (
              <>
                <Link to={`/events/${id}/edit`}>
                  <button className="btn-secondary">Edit</button>
                </Link>
                <button className="btn-danger" onClick={handleDelete}>Delete</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
