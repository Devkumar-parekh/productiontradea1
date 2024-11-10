import React, { Fragment } from "react";

function RadioInput(props) {
  return (
    <div className="d-flex">
      {props.radiooption?.map((option, optindex) => {
        return (
          <div key={optindex}>
            <input
              type="radio"
              id={option?.value}
              name={props.name}
              value={option?.value}
              className={`mx-1`}
            />
            <label htmlFor={option?.value}>{option?.label}</label>
          </div>
        );
      })}
      {/* <input type="radio" id="male" name="gender" value="male" />
      <label htmlFor="male">Male</label>
      <input type="radio" id="female" name="gender" value="female" />
      <label htmlFor="female">Female</label>
      <input type="radio" id="other" name="gender" value="other" />
      <label htmlFor="other">Other</label> */}
    </div>
  );
}

export default RadioInput;
