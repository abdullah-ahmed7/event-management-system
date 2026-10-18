
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
    let active = true;

    async function loadEvents() {
      setLoading(true);
      setError("");

      try {
        const data = await getEvents(
          filters.keyword,
          filters.category,
          filters.city
        );

        if (active) {
          setEvents(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Failed to load events.");
          setEvents([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      active = false;
    };
  }, [filters]);

  function handleSearch(e) {
    e.preventDefault();

    setFilters({
      keyword: keyword.trim(),
      category,
      city: city.trim(),
    });
  }

  function clearFilters() {
    setKeyword("");
    setCategory("");
    setCity("");

    setFilters({
      keyword: "",
      category: "",
      city: "",
    });
  }

  return (
    <div className="home-page">
      <h1>Discover Upcoming Events</h1>
      <p>
        Explore concerts, sports, arts, and entertainment events near you.
      </p>

      <form className="filter-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search events..."
          aria-label="Search events"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <select
          aria-label="Event category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Arts & Theatre">Arts & Theatre</option>
          <option value="Film">Film</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>

        <input
          type="text"
          placeholder="City"
          aria-label="Filter by city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button type="submit">Search Events</button>

        <button
          type="button"
          className="clear-btn"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </form>

      <section>
        <h2>Upcoming Events</h2>

        {loading && <p role="status">Loading events...</p>}

        {error && <p role="alert">{error}</p>}

        {!loading && !error && events.length === 0 && (
          <p>No events found. Try changing your search filters.</p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
