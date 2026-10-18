
import { Routes, Route, Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import MyEvents from "./pages/MyEvents.jsx";
import BackToTop from "./components/BackToTop.jsx";

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
      <header className="site-header">
        <nav className="navbar" aria-label="Main navigation">
          <Link to="/" className="nav-brand">
            EventHub
          </Link>

          <div className="nav-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/my-events"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              My Events
            </NavLink>

            {user ? (
              <>
                <span className="nav-user">
                  Welcome, {user.name}
                </span>

                <button
                  type="button"
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/my-events" element={<MyEvents />} />

          <Route
            path="*"
            element={
              <div className="not-found">
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <Link to="/">Back to Home</Link>
              </div>
            }
          />
        </Routes>
      </main>

      <BackToTop />
    </div>
  );
}

export default App;
