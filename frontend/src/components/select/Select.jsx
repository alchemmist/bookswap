import React from "react";
import "./Select.css";

function Select({ id, onChange, options = [], className = "", ...rest }) {
  return (
    <div className="select-wrapper">
      <select
        id={id}
        onChange={onChange}
        className={`select ${className}`}
        {...rest}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="select-arrow">▼</span>
    </div>
  );
}

export default Select;
