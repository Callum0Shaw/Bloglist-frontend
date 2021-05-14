import React, { useState } from "react";
import Input from "./Input";

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const user = {
      username,
      password,
    };
    loginUser(user);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <Input
          title="Username"
          type="text"
          value={username}
          setInput={setUsername}
        />
        <Input
          title="Password"
          type="text"
          value={password}
          setInput={setPassword}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
