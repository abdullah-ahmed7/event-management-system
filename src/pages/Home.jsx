
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard.jsx";
import { getEvents } from "../services/ticketmaster.js";

function Home() {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    city: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadEvents() {
      setLoading(true);
      setError("");

      try {
        const data = await getEvents(
          filters.keyword,
          filters.category,
          filters.city
        );

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

    loadEvents();

    return () => {
      cancelled = true;
    };
  }, [filters]);

  function handleSearch(e) {
    e.preventDefault();
    setFilters({ keyword, category, city });
  }

  return (
    <div className="home-page">
      <h1>Explore Events</h1>
      <p>Discover exciting events happening around you!</p>

      <form onSubmit={handleSearch} className="filter-form">
        <input
          type="text"
          placeholder="Search events..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Arts & Theatre">Arts & Theatre</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>

        <input
          type="text"
          placeholder="City (e.g. New York)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button type="submit">Search Events</button>
      </form>

      {loading && <p>Loading events...</p>}
      {error && <p role="alert">Error: {error}</p>}

      {!loading && !error && events.length === 0 && (
        <p>No events found. Try different filters.</p>
      )}

      <div className="events-grid">
        {!loading && !error && events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Home;
