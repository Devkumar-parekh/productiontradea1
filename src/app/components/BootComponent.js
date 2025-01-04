"use client";
import React from "react";
import { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";

function BootComponent({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return <Provider store={store}>{children}</Provider>;
}

export default BootComponent;
