import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const API_URL = "http://localhost:5005";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h1>Events</h1>
      {isLoggedIn && (
        <Link to="/events/new">
          <button>Create Event</button>
        </Link>
      )}
      <div className="card">
        {eventsList.length === 0 ? (
          <p>No events found</p>
        ) : (
          eventsList.map((event) => (
            <div key={event._id} className="list-item">
              <h3>{event.eventname}</h3>
              <p>{event.location}</p>
              <Link to={`/events/${event._id}`}>
                <button>Details</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsListPage;
