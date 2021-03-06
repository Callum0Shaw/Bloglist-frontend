import React from "react";

const Input = ({ title, type, value, setInput }) => {
  return (
    <div>
      <label>{title}</label>
      <input
        id={title}
        type={type}
        value={value}
        onChange={({ target }) => setInput(target.value)}
        name={title}
      />
    </div>
  );
};

export default Input;
