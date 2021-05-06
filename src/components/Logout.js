import React from "react";

const Logout = ({ name }) => {

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser")
  }
  return (
    <div>
      <form onSubmit={handleLogout}>
        <p>{name} logged in</p>
        <button type="submit">Logout</button>
      </form>
      <br></br>
    </div>
  );
};

export default Logout;
