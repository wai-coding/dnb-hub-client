import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import placeholderImg from "../../assets/placeholder.png";
import { API_URL } from "../../config/config";

const EventsListPage = () => {
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/events`)
      .then((res) => {
        setEventsList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load events");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Events</h1>
        <div className="page-actions">
          {isLoggedIn && (
            <Link to="/events/new">
              <button className="btn-primary">Add Event</button>
            </Link>
          )}
        </div>
      </div>
      {eventsList.length === 0 ? (
        <p>No events found</p>
      ) : (
        <div className="grid">
          {eventsList.map((event) => (
            <div key={event._id} className="card">
              <div className="card-media">
                <img
                  src={
                    event.image && event.image.trim() !== ""
                      ? event.image
                      : placeholderImg
                  }
                  alt={event.eventname || "Event"}
                  onError={(e) => {
                    e.currentTarget.src = placeholderImg;
                  }}
                />
              </div>
              <div className="card-body card-body-left">
                <h3 className="card-title">{event.eventname}</h3>
                <p className="card-meta event-date">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="card-meta">{event.location}</p>
                <p className="card-meta">
                  {event.promoter ? event.promoter.name : "No promoter"}
                </p>
                <p className="card-meta">{event.price}</p>
                <div className="card-actions">
                  <Link to={`/events/${event._id}`}>
                    <button>View Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="page-footer">
        <Link to="/">
          <button className="btn">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default EventsListPage;
