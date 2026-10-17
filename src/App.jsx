
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyEvents from "./pages/MyEvents.jsx";

function App() {
  return (
    <div>
      <header>
        <h1>EventHub</h1>

        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link> |{" "}
          <Link to="/my-events">My Events</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/events/:id"
            element={<EventDetails />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-events" element={<MyEvents />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
