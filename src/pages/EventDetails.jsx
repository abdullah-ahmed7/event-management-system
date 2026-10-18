
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const isRegistered = Boolean(
    user &&
      registrations.some(
        (item) =>
          item.userId === user.id &&
          item.event.id === id
      )
  );

  useEffect(() => {
    let active = true;

    async function loadEvent() {
      setLoading(true);
      setError("");

      try {
        const data = await getEventById(id);

        if (active) {
          setEvent(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load event.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadEvent();

    return () => {
      active = false;
    };
  }, [id]);

  function handleRegister() {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!event || isRegistered) return;

    dispatch(
      registerEvent({
        userId: user.id,
        event,
      })
    );

    setMessage("You have successfully registered for this event.");
  }

  function handleCancel() {
    if (!user || !event) return;

    dispatch(
      cancelRegistration({
        userId: user.id,
        eventId: event.id,
      })
    );

    setShowCancelDialog(false);
    setMessage("Your registration has been cancelled.");
  }

  if (loading) {
    return <p role="status">Loading event details...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!event) {
    return <p>Event not found.</p>;
  }

  const venue = event._embedded?.venues?.[0];
  const image =
    event.images?.find((img) => img.width >= 600)?.url ||
    event.images?.[0]?.url;

  const category =
    event.classifications?.[0]?.segment?.name || "Other";

  const eventDate = event.dates?.start?.localDate || "TBA";
  const eventTime = event.dates?.start?.localTime || "TBA";

  return (
    <div className="event-details">
      <Link to="/">← Back to Events</Link>

      <div className="event-details-heading">
        <h1>{event.name}</h1>

        {isRegistered && (
          <span className="registered-badge">
            ✓ Registered
          </span>
        )}
      </div>

      {image && (
        <img src={image} alt={event.name} />
      )}

      <p><strong>Date:</strong> {eventDate}</p>
      <p><strong>Time:</strong> {eventTime}</p>
      <p><strong>Venue:</strong> {venue?.name || "TBA"}</p>
      <p>
        <strong>Location:</strong>{" "}
        {[venue?.city?.name, venue?.state?.name]
          .filter(Boolean)
          .join(", ") || "TBA"}
      </p>
      <p><strong>Category:</strong> {category}</p>

      {event.info && (
        <div className="event-description">
          <h2>About This Event</h2>
          <p>{event.info}</p>
        </div>
      )}

      <div className="registration-actions">
        {!user ? (
          <button onClick={() => navigate("/login")}>
            Login to Register
          </button>
        ) : isRegistered ? (
          <>
            <button
              type="button"
              className="registered-btn"
              disabled
            >
              ✓ Already Registered
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowCancelDialog(true)}
            >
              Cancel Registration
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleRegister}
          >
            Register for Event
          </button>
        )}
      </div>

      {message && (
        <p className="registration-message" role="status">
          {message}
        </p>
      )}

      {showCancelDialog && (
        <div
          className="dialog-overlay"
          onClick={() => setShowCancelDialog(false)}
        >
          <div
            className="confirmation-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-dialog-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="cancel-dialog-title">
              Cancel Registration?
            </h2>

            <p>
              Are you sure you want to cancel your
              registration for <strong>{event.name}</strong>?
            </p>

            <div className="dialog-actions">
              <button
                type="button"
                className="keep-btn"
                onClick={() => setShowCancelDialog(false)}
              >
                Keep Registration
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetails;
