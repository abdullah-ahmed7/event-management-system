
function EventCard({
  eventName,
  location,
  date,
  venue,
  category,
  image
}) {
  return (
    <div>
      <img
        src={image}
        alt={eventName}
        width="300"
      />

      <h2>{eventName}</h2>
      <p>Location: {location}</p>
      <p>Date: {date}</p>
      <p>Venue: {venue}</p>
      <p>Category: {category}</p>
    </div>
  );
}

export default EventCard;
