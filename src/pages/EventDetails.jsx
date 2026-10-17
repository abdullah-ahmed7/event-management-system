
import { useParams, Link } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Event Details</h1>

      <p>Event ID: {id}</p>

      <p>
        Full event information will be loaded
        from Ticketmaster.
      </p>

      <button disabled>
        Register for Event
      </button>

      <div>
        <Link to="/">Back to Events</Link>
      </div>
    </div>
  );
}

export default EventDetails;
