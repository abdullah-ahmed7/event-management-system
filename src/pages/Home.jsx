
import { useState, useEffect } from "react";
import EventCard from "../components/EventCard.jsx";
import { getEvents } from "../services/ticketmaster.js";

function Home() {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchEvents() {
      setLoading(true);
      setError("");

      try {
        const data = await getEvents(searchTerm);

        if (!cancelled) {
          setEvents(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setEvents([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, [searchTerm]);

  function handleSearch(e) {
    e.preventDefault();
    setSearchTerm(keyword.trim());
  }

  return (
    <div>
      <h1>Explore Events</h1>
      <p>Discover exciting events happening around you!</p>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search events..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading events...</p>}

      {error && <p role="alert">Error: {error}</p>}

      {!loading && !error && events.length === 0 && (
        <p>No events found.</p>
      )}

      {!loading &&
        !error &&
        events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
    </div>
  );
}

export default Home;
