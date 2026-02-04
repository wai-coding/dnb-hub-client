import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import placeholderImg from "../assets/placeholder.png";
import logo from "../assets/logo.png";
import { API_URL } from "../config/config";

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
        <img src={logo} alt="DNB Hub" className="hero-logo" />
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
          Fresh events straight from the scene.
        </p>
        {loading ? (
          <p>Loading events...</p>
        ) : latestEvents.length === 0 ? (
          <p>No events yet. Be the first to create one!</p>
        ) : (
          <div className="grid">
            {latestEvents.map((event) => (
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
      </section>

      <section className="explore-section text-center">
        <h2>Explore the Hub</h2>
        <p className="section-description">Connecting the DNB community.</p>
        <div className="explore-grid">
          <Link to="/events" className="explore-card">
            <h3>Events</h3>
            <p>Browse upcoming Drum & Bass events.</p>
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
            <div className="cta-links cta-links-row">
              <Link to="/events/new">
                <button className="cta-button">Add Event</button>
              </Link>
              <Link to="/artists/new">
                <button className="cta-button">Add Artist</button>
              </Link>
              <Link to="/promoters/new">
                <button className="cta-button">Add Promoter</button>
              </Link>
            </div>
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
