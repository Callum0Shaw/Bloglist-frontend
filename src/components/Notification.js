import React from "react";
import "./notification.css";

const Notification = ({ message }) => {
  if (message) {
    return (
      <div className="notification">
        <h4>{message}</h4>
      </div>
    );
  }
  return null;
};

export default Notification;
