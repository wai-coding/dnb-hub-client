import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import placeholderImg from "../assets/placeholder.png";

const API_URL = "http://localhost:5005";

const HomePage = () => {
  const [latestEvents, setLatestEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/events`)
      .then((res) => {
        setLatestEvents(res.data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="homepage">
      <section className="hero">
        <h1>DNB Hub</h1>
        <p className="hero-subtitle">
          Your ultimate destination for Drum & Bass events, artists, and
          promoters. Discover upcoming raves, connect with your favorite DJs,
          and stay in the loop.
        </p>
        <Link to="/events">
          <button className="hero-button">Explore Events</button>
        </Link>
      </section>

      <section className="latest-events">
        <h2>Latest Events</h2>
        <p className="section-description">
          Fresh from the database - real data, real events.
        </p>
        {loading ? (
          <p>Loading events...</p>
        ) : latestEvents.length === 0 ? (
          <p>No events yet. Be the first to create one!</p>
        ) : (
          <div className="events-grid">
            {latestEvents.map((event) => (
              <div key={event._id} className="event-card">
                <img
                  src={event.image && event.image.trim() !== "" ? event.image : placeholderImg}
                  alt={event.eventname || "Event"}
                  className="event-card-image"
                  onError={(e) => { e.currentTarget.src = placeholderImg; }}
                />
                <h3>{event.eventname}</h3>
                <p className="event-date">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="event-location">{event.location}</p>
                <p className="event-promoter">
                  {event.promoter ? event.promoter.name : "No promoter"}
                </p>
                <Link to={`/events/${event._id}`}>
                  <button>View Details</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="explore-section">
        <h2>Explore the Hub</h2>
        <p className="section-description">Connecting the DNB community.</p>
        <div className="explore-grid">
          <Link to="/events" className="explore-card">
            <h3>Events</h3>
            <p>Browse upcoming Drum & Bass events and raves.</p>
          </Link>
          <Link to="/artists" className="explore-card">
            <h3>Artists</h3>
            <p>Discover DJs and producers in the scene.</p>
          </Link>
          <Link to="/promoters" className="explore-card">
            <h3>Promoters</h3>
            <p>Find event organizers and collectives.</p>
          </Link>
        </div>
      </section>

      <section className="cta-section">
        {isLoggedIn ? (
          <div>
            <h2>Ready to contribute?</h2>
            <p>Add new events, artists, or promoters to the database.</p>
            <Link to="/events/new">
              <button className="cta-button">Create Event</button>
            </Link>
          </div>
        ) : (
          <div>
            <h2>Join the community</h2>
            <p>Sign up to add events, artists, and promoters.</p>
            <div className="cta-links">
              <Link to="/signup">
                <button className="cta-button">Sign Up</button>
              </Link>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
