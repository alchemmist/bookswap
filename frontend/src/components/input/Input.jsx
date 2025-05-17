import React from "react";
import "./Input.css";

function Input({ id, onChange, className = "", ...rest }) {
  return (
    <input
      id={id}
      onChange={onChange}
      className={`input ${className}`}
      {...rest}
    />
  );
}

export default Input;
