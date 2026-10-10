
import EventCard from "./components/EventCard.jsx";

function App() {
  return (
    <div>
      <h1>Welcome to EventHub</h1>
      <p>Explore and discover amazing events!</p>

      <EventCard
        eventName="Technology Conference 2026"
        location="Lahore, Pakistan"
        date="15 November 2026"
        venue="Event Venue"
        category="Technology"
        image="https://placehold.co/600x350"
      />
    </div>
  );
}

export default App;
