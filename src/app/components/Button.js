"use client";
import React, { useState } from "react";

function Button(props) {
  const defaultOnClick = () => {
    console.log("Clicked");
  };
  return (
    <>
      <button onClick={props.onClick || defaultOnClick}>
        {props.children}
      </button>
    </>
  );
}

export default Button;
