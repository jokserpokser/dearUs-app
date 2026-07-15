export const Register = () => {
  return (
    <div className="register-page">
      <h1>Register Page</h1>

      <form>
        <input
          type="text"
          placeholder="First Name"
        />
        <input
          type="text"
          placeholder="Last Name"
        />
        <input
          type="email"
          placeholder="Email"
        />
        <input
          type="password"
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
