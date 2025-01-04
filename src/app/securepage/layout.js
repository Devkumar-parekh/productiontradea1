"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Secure from "../components/Secure";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const pathname = usePathname();
  const [headerName, setHeaderName] = useState("");
  useEffect(() => {
    setHeaderName(atob(localStorage.getItem("name") || ""));
  }, []);

  const authstate = useSelector((state) => state.auth);
  console.log(authstate, "😘😘authstate");
  return (
    <Secure>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <div className="d-flex align-items-center">
                  <Image
                    className=""
                    src={"/logomini.png"}
                    width={25}
                    height={25}
                    alt=""
                  />
                  <span
                    style={{
                      display: "inline",
                      fontSize: "30px",
                      color: "#d08215",
                    }}
                  >
                    A1Trading
                  </span>
                </div>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        pathname === "/securepage/dashboard" ? "active" : ""
                      }`}
                      aria-current="page"
                      href="/securepage/dashboard"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        pathname === "/securepage/clients" ? "active" : ""
                      }`}
                      href="/securepage/clients"
                    >
                      Clients
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        pathname === "/securepage/watchlist" ? "active" : ""
                      }`}
                      href="/securepage/watchlist"
                    >
                      Watchlist
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                      <a className="nav-link" href="#">
                        Link
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Dropdown
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link disabled"
                        href="#"
                        tabIndex="-1"
                        aria-disabled="true"
                      >
                        Disabled
                      </a>
                    </li> */}
                </ul>

                <div
                  className="nav-item ml-auto  text-light d-block"
                  style={{ verticalAlign: "middle" }}
                >
                  <span className="nav-link">{headerName}</span>
                </div>
              </div>
            </div>
          </nav>
          <div style={{ flex: 1, padding: "10px", background: "#f5f5dc" }}>
            {children}
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            background: "#303c3036",
            padding: "5px",
          }}
        >
          Copyrights Devkumar Parekh
        </div>
      </div>
    </Secure>
  );
}

export default Layout;
