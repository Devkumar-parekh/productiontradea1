"use client";
import React, { useState } from "react";
import InputText from "../../components/InputText";
import Image from "next/image";
import { encodeDate, generateSHA256Hash } from "../../lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
// import axios from "axios";
function Page() {
  const router = useRouter();
  const [formdata, setFormdata] = useState({
    uid: "",
    password: "",
  });

  const handleFormdata = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setFormdata((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const [loadings, setLoadings] = useState({});

  const handleLoadings = (key, value) => {
    setLoadings((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = async () => {
    handleLoadings("login", 1);
    if (formdata?.uid && formdata?.password) {
      // === "adminid"
      if (formdata?.password) {
        let hash = await generateSHA256Hash(formdata?.password);
        const loginresponse = await axios.post("/api/login", {
          email: formdata?.uid,
          password: hash, //formdata?.password,
        });
        if (
          loginresponse?.data?.data?.length &&
          loginresponse?.data?.status === 200
        ) {
          const d = new Date();
          localStorage.setItem("secure", btoa(d.getDay()));
          localStorage.setItem("secured", encodeDate(d));
          localStorage.setItem(
            "securei",
            btoa(loginresponse?.data?.data?.[0]?.email)
          );
          localStorage.setItem(
            "securep",
            btoa(loginresponse?.data?.data?.[0]?.password)
          );

          router.push("/securepage/dashboard");
        } else {
          alert("Invalid credentials...");
        }
      }
    } else {
      alert("Invalid credentials.");
    }
    handleLoadings("login", 0);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Login</h1>

      <hr />
      <form
        action={() => {
          console.log("test");
          handleLogin();
        }}
      >
        <center>
          <InputText
            placeholder={"User Id"}
            name={"uid"}
            value={formdata?.uid}
            onChange={handleFormdata}
            // type="email"
          />
          <InputText
            placeholder={"Password"}
            name={"password"}
            value={formdata?.password}
            onChange={handleFormdata}
            type={"password"}
          />
        </center>
        <div className={"button"} style={{ justifyContent: "center" }}>
          <button className={"primary me-2"} type="submit">
            <Image
              className={""}
              src="/vercelsvg.svg"
              alt=""
              width={20}
              height={20}
            />
            {loadings?.login ? "Loading..." : "Login"}
          </button>
          <button
            className={"secondary ms-2"}
            type="reset"
            onClick={async () => {
              setFormdata({});
            }}
          >
            Reset
          </button>
        </div>
      </form>
      <hr></hr>
    </div>
  );
}

export default Page;
