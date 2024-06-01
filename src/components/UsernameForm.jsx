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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <div className="card">
        <div className="card-body">
          <h1 className="card-header justify-center">Qual seu nome?</h1>
          <form onSubmit={handleSubmit}>
            <div className=" w-full flex items-center flex-col pt-4">
              <input
                className="py-2 px-3 block w-full border border-gray-500 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Qual seu nome?"
                required
              />

              <button type="submit" className="btn btn-primary mt-4">
                Entre na festa
              </button>
            </div>
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default UsernameForm;
