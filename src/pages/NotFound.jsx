import { Link, useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found-card">
        <span className="not-found-emoji">🎧</span>
        <h1 className="not-found-title">Lost in the rave?</h1>
        <p className="not-found-code">404 - This drop never happened.</p>
        <p className="not-found-message">
          Looks like you missed the beat. The page you're looking for doesn't exist.
        </p>
        <p className="not-found-path">
          You tried to access: <code>{location.pathname}</code>
        </p>
        <div className="not-found-actions">
          <Link to="/">
            <button className="cta-button">Back to Home</button>
          </Link>
          <Link to="/events">
            <button>Browse Events</button>
          </Link>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
