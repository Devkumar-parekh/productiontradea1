"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { decodeDate } from "../lib/utils";
import axios from "axios";

function Secure({ children }) {
  const [isSecure, setIsScure] = useState(false);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const secure = localStorage.getItem("secure");
      const secured = localStorage.getItem("secured");
      const securei = localStorage.getItem("securei");
      const securep = localStorage.getItem("securep");
      const securedate = decodeDate(secured); //new Date(date);
      const currentdate = new Date();
      if (
        Number(atob(secure)) === currentdate.getDay() &&
        secured &&
        securei &&
        securep
      ) {
        if (currentdate - securedate <= 4 * 60 * 60 * 1000) {
          //14400000 --> 4hrs
          const { data } = await checkLogin({
            email: atob(securei),
            password: atob(securep),
          });
          if (data?.status === 200 && data?.data?.length > 0) {
            setIsScure(true);
          } else {
            setIsScure(false);
            alert("Your session has expired. Please log in again.");
            localStorage.removeItem("secure");
            localStorage.removeItem("secured");
            localStorage.removeItem("securei");
            localStorage.removeItem("securep");
            router.push("/");
          }
          console.log(currentdate - securedate, currentdate, securedate);
        } else {
          setIsScure(false);
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("secure");
          localStorage.removeItem("secured");
          localStorage.removeItem("securei");
          localStorage.removeItem("securep");
          router.push("/");
        }
      } else {
        alert("Please login first");
        router.push("/");
      }
    })();
  }, []);
  const checkLogin = async (payload) => {
    let loginresponse = await axios.post("/api/login", {
      email: payload.email,
      password: payload.password,
    });
    return loginresponse;
  };
  if (isSecure) return children;
  else return <>Loading...</>;
}

export default Secure;
