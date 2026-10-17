
import { Link } from "react-router-dom";

function EventCard({ event }) {
  const venue = event._embedded?.venues?.[0];

  const image =
    event.images?.find((img) => img.width >= 600)?.url ??
    event.images?.[0]?.url;

  return (
    <article>
      {image && (
        <img
          src={image}
          alt={event.name}
          width="300"
        />
      )}

      <h2>{event.name}</h2>

      <p>
        Date: {event.dates?.start?.localDate ?? "TBA"}
      </p>

      <p>
        Venue: {venue?.name ?? "TBA"}
      </p>

      <p>
        Location: {venue?.city?.name ?? "TBA"}
      </p>

      <p>
        Category:{" "}
        {event.classifications?.[0]?.segment?.name ?? "Other"}
      </p>

      <Link to={`/events/${event.id}`}>
        View Details
      </Link>
    </article>
  );
}

export default EventCard;
