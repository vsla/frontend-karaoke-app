import React, { useState } from "react";

const UsernameForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      onSubmit(username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Qual seu nome?"
        required
      />
      <button type="submit">Entre na festa</button>
    </form>
  );
};

export default UsernameForm;
