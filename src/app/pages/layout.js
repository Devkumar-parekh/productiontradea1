import Image from "next/image";
import React from "react";

function layout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div
        style={{
          background: "#04243b",
          color: "white",
          display: "flex",
          alignItems: "end",
          justifyContent: "space-between",
          padding: "10px 20px",
          margin: "10px",
          borderRadius: "10px",
          minHeight: "70px",
          height: "min(30vh, 200px)",
        }}
      >
        <div className="d-flex align-items-center cursor-pointer">
          <span>
            <Image src={"/logomini.png"} width={35} height={35} alt="" />
          </span>
          <span
            style={{ display: "inline", fontSize: "35px", color: "#d08215" }}
          >
            A1Trading
          </span>
        </div>
      </div>
      <div style={{ flex: 1 }}>{children}</div>
      <div style={{ textAlign: "center", background: "white" }}>
        Copyrights Devkumar Parekh
      </div>
    </div>
  );
}

export default layout;
