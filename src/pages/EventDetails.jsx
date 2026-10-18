
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getEventById } from "../services/ticketmaster.js";
import {
  registerEvent,
  cancelRegistration,
} from "../features/registrations/registrationSlice.js";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const registrations = useSelector(
    (state) => state.registrations.items
  );

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadEvent() {
      setLoading(true);
      setError("");
      setMessage("");

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

  const isRegistered = Boolean(
    user &&
      registrations.some(
        (item) =>
          item.userId === user.id &&
          item.event.id === id
      )
  );

  function handleRegister() {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isRegistered || !event) return;

    dispatch(
      registerEvent({
        userId: user.id,
        event,
      })
    );

    setMessage("Successfully registered for this event!");
  }

  function handleCancel() {
    if (!user || !isRegistered) return;

    dispatch(
      cancelRegistration({
        userId: user.id,
        eventId: id,
      })
    );

    setMessage("Your registration has been cancelled.");
  }

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p role="alert">Error: {error}</p>;
  if (!event) return <p>Event not found.</p>;

  const venue = event._embedded?.venues?.[0];
  const image = event.images?.[0]?.url;
  const eventDate = event.dates?.start?.localDate;
  const eventTime = event.dates?.start?.localTime;

  return (
    <div className="event-details">
      <Link to="/">← Back to Events</Link>

      <h1>{event.name}</h1>

      {image && (
        <img
          src={image}
          alt={event.name}
          style={{ maxWidth: "100%", width: "650px" }}
        />
      )}

      <p>
        <strong>Date:</strong> {eventDate || "TBA"}
      </p>

      <p>
        <strong>Time:</strong> {eventTime || "TBA"}
      </p>

      <p>
        <strong>Venue:</strong> {venue?.name || "TBA"}
      </p>

      <p>
        <strong>Location:</strong>{" "}
        {venue?.city?.name || "TBA"}
        {venue?.state?.name ? `, ${venue.state.name}` : ""}
      </p>

      <p>
        <strong>Category:</strong>{" "}
        {event.classifications?.[0]?.segment?.name || "Other"}
      </p>

      {event.info && (
        <p style={{ overflowWrap: "anywhere" }}>
          {event.info}
        </p>
      )}

      {message && <p role="status">{message}</p>}

      {!user ? (
        <div>
          <p>Please log in to register for this event.</p>
          <button onClick={() => navigate("/login")}>
            Login to Register
          </button>
        </div>
      ) : isRegistered ? (
        <div>
          <p>You are registered for this event.</p>

          <button onClick={handleCancel}>
            Cancel Registration
          </button>

          <p>
            <Link to="/my-events">View My Events</Link>
          </p>
        </div>
      ) : (
        <button onClick={handleRegister}>
          Register for Event
        </button>
      )}
    </div>
  );
}

export default EventDetails;
