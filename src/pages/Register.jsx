
function Register() {
  function handleSubmit(event) {
    event.preventDefault();
    alert("Registration functionality will be added soon!");
  }

  return (
    <div>
      <h1>Create an Account</h1>
      <p>Join EventHub and start exploring events!</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registerName">Full Name:</label>
          <input
            type="text"
            id="registerName"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="registerEmail">Email:</label>
          <input
            type="email"
            id="registerEmail"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="registerPassword">Password:</label>
          <input
            type="password"
            id="registerPassword"
            placeholder="Create a password"
            minLength={6}
            required
          />
        </div>

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Register;
