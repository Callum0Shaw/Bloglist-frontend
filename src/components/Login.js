import React from "react";
import Input from "./Input";

const Login = (props) => {
  return (
    <div>
      <form onSubmit={props.handleLogin}>
        <Input
          title="Username"
          type="text"
          value={props.username}
          setInput={props.setUsername}
        />
        <Input
          title="Password"
          type="text"
          value={props.password}
          setInput={props.setPassword}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
