"use client";
import React, { useEffect, useState } from "react";
import Instruments from "./Instruments";

function Layout({ children }) {
  return (
    <>
      {/* <Instruments setRefreshchildren={setRefreshchildren} /> */}
      {children}
    </>
  );
}

export default Layout;
