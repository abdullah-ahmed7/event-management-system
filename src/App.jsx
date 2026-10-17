
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import MyEvents from "./pages/MyEvents.jsx";

import { logout } from "./features/auth/authSlice.js";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className="app">
      <header>
        <nav>
          <Link to="/">
            <strong>EventHub</strong>
          </Link>

          {" | "}

          <Link to="/">Home</Link>

          {" | "}

          <Link to="/my-events">My Events</Link>

          {" | "}

          {user ? (
            <>
              <span>Welcome, {user.name}</span>

              {" | "}

              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>

              {" | "}

              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/events/:id"
            element={<EventDetails />}
          />

          <Route
            path="/my-events"
            element={<MyEvents />}
          />

          <Route
            path="*"
            element={
              <div>
                <h1>404 - Page Not Found</h1>
                <Link to="/">Back to Home</Link>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
