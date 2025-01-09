import React from "react";
import Instruments from "./Instruments";

function Layout({ children }) {
  return (
    <>
      <Instruments />
      {children}
    </>
  );
}

export default Layout;
