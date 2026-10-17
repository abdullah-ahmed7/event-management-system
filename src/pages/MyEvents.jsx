
import { Link } from "react-router-dom";

function MyEvents() {
  return (
    <div>
      <h1>My Events</h1>

      <p>
        Your registered events will appear here.
      </p>

      <h2>Upcoming Events</h2>
      <p>No upcoming events yet.</p>

      <h2>Completed Events</h2>
      <p>No completed events yet.</p>

      <Link to="/">Explore Events</Link>
    </div>
  );
}

export default MyEvents;
