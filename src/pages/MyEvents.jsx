
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  cancelRegistration,
} from "../features/registrations/registrationSlice.js";

function MyEvents() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const registrations = useSelector(
    (state) => state.registrations.items
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const myRegistrations = registrations.filter(
    (item) => item.userId === user.id
  );

  const today = new Date().toLocaleDateString("en-CA");

  const upcomingEvents = myRegistrations.filter(
    (item) =>
      !item.event.dates?.start?.localDate ||
      item.event.dates.start.localDate >= today
  );

  const completedEvents = myRegistrations.filter(
    (item) =>
      item.event.dates?.start?.localDate &&
      item.event.dates.start.localDate < today
  );

  function handleCancel(eventId) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this registration?"
    );

    if (!confirmed) return;

    dispatch(
      cancelRegistration({
        userId: user.id,
        eventId,
      })
    );
  }

  function renderEvent(item, completed = false) {
    const event = item.event;
    const venue = event._embedded?.venues?.[0];
    const image = event.images?.[0]?.url;

    return (
      <article key={event.id} className="event-card">
        {image && (
          <img
            src={image}
            alt={event.name}
            width="300"
            style={{ maxWidth: "100%" }}
          />
        )}

        <h3>{event.name}</h3>

        <p>
          Date: {event.dates?.start?.localDate || "TBA"}
        </p>

        <p>Venue: {venue?.name || "TBA"}</p>

        <p>
          Location: {venue?.city?.name || "TBA"}
        </p>

        <p>
          Status: {completed ? "Completed" : "Upcoming"}
        </p>

        <Link to={`/events/${event.id}`}>
          View Details
        </Link>

        {!completed && (
          <div>
            <button
              onClick={() => handleCancel(event.id)}
            >
              Cancel Registration
            </button>
          </div>
        )}
      </article>
    );
  }

  return (
    <div className="my-events-page">
      <h1>My Events</h1>

      <p>Welcome, {user.name}!</p>

      <p>
        You have registered for {myRegistrations.length} event(s).
      </p>

      <section>
        <h2>Upcoming Events ({upcomingEvents.length})</h2>

        {upcomingEvents.length === 0 ? (
          <p>
            No upcoming registrations.{" "}
            <Link to="/">Explore Events</Link>
          </p>
        ) : (
          <div className="events-grid">
            {upcomingEvents.map((item) =>
              renderEvent(item)
            )}
          </div>
        )}
      </section>

      <section>
        <h2>Completed Events ({completedEvents.length})</h2>

        {completedEvents.length === 0 ? (
          <p>No completed events yet.</p>
        ) : (
          <div className="events-grid">
            {completedEvents.map((item) =>
              renderEvent(item, true)
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default MyEvents;
