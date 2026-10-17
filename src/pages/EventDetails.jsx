
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../services/ticketmaster.js";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadEvent() {
      setLoading(true);
      setError("");

      try {
        const data = await getEventById(id);
        if (!cancelled) setEvent(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadEvent();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p role="alert">Error: {error}</p>;
  if (!event) return <p>Event not found.</p>;

  const venue = event._embedded?.venues?.[0];
  const image = event.images?.[0]?.url;

  return (
    <div className="event-details">
      <Link to="/">← Back to Events</Link>

      <h1>{event.name}</h1>

      {image && (
        <img src={image} alt={event.name} />
      )}

      <p>
        <strong>Date:</strong>{" "}
        {event.dates?.start?.localDate ?? "TBA"}
      </p>

      <p>
        <strong>Time:</strong>{" "}
        {event.dates?.start?.localTime ?? "TBA"}
      </p>

      <p>
        <strong>Venue:</strong> {venue?.name ?? "TBA"}
      </p>

      <p>
        <strong>Location:</strong>{" "}
        {venue?.city?.name ?? "TBA"}
        {venue?.state?.name
          ? `, ${venue.state.name}`
          : ""}
      </p>

      <p>
        <strong>Category:</strong>{" "}
        {event.classifications?.[0]?.segment?.name ?? "Other"}
      </p>

      {event.info && <p>{event.info}</p>}

      <button disabled>
        Register for Event — Coming Next
      </button>
    </div>
  );
}

export default EventDetails;
