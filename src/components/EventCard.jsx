
import { Link } from "react-router-dom";

function EventCard({ event }) {
  const venue = event._embedded?.venues?.[0];
  const date = event.dates?.start?.localDate || "TBA";
  const category =
    event.classifications?.[0]?.segment?.name || "Other";

  const image =
    event.images?.find((img) => img.width >= 600)?.url ||
    event.images?.[0]?.url;

  return (
    <article className="event-card" tabIndex={0}>
      <div className="event-image">
        {image && (
          <img src={image} alt={event.name} loading="lazy" />
        )}

        <div className="event-tooltip" role="tooltip">
          <strong>{event.name}</strong>
          <span>Date: {date}</span>
          <span>Venue: {venue?.name || "TBA"}</span>
          <span>Category: {category}</span>
        </div>
      </div>

      <div className="event-content">
        <span className="event-category">{category}</span>
        <h2>{event.name}</h2>
        <p>Date: {date}</p>
        <p>Venue: {venue?.name || "TBA"}</p>
        <p>Location: {venue?.city?.name || "TBA"}</p>

        <Link to={`/events/${event.id}`} className="details-link">
          View Details →
        </Link>
      </div>
    </article>
  );
}

export default EventCard;
