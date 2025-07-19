import React, { useState } from 'react';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password || !confirm) {
      alert('All fields are required');
    } else if (password !== confirm) {
      alert("Passwords don't match");
    } else {
      alert(`Signup successful for: ${email}`);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /><br /><br />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
      /><br /><br />

      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
