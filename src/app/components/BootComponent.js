"use client";
import React from "react";
import { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";

function BootComponent({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return children;
}

export default BootComponent;
