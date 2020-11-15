import React from "react";

const RadioInput = ({ label, id, ...props }) => {
  return (
    <div className="flex flex-aic">
      <input id={id} type="radio" {...props} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default RadioInput;
