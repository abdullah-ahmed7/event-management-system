
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../features/auth/authSlice.js";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("eventhub_users") || "[]"
    );

    const alreadyExists = users.some(
      (user) => user.email === cleanEmail
    );

    if (alreadyExists) {
      setError("This email is already registered.");
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: cleanName,
      email: cleanEmail,
      password,
    };

    localStorage.setItem(
      "eventhub_users",
      JSON.stringify([...users, newUser])
    );

    dispatch(
      login({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      })
    );

    navigate("/");
  }

  return (
    <div className="auth-page">
      <h1>Create Account</h1>
      <p>Register to save and manage your events.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
