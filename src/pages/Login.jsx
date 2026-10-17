
function Login() {
  function handleSubmit(event) {
    event.preventDefault();
    alert("Login functionality will be added soon!");
  }

  return (
    <div>
      <h1>Login to EventHub</h1>
      <p>Welcome back! Please enter your details.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginEmail">Email:</label>
          <input
            type="email"
            id="loginEmail"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="loginPassword">Password:</label>
          <input
            type="password"
            id="loginPassword"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
