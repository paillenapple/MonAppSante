import React from "react";

const RadioInput = (props) => {
  return (
    <div className="flex flex-aic">
      <input
        checked={props.value === props.field.value}
        id={props.id}
        onBlur={props.field.onBlur}
        onChange={props.field.onChange}
        type="radio"
        value={props.value}
        {...props}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export default RadioInput;
