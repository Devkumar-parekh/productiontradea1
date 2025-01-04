"use client";
import React, { useEffect, useState } from "react";
import InputText from "../../components/InputText";
import Image from "next/image";
import { encodeDate, generateSHA256Hash } from "../../lib/utils";
import { useRouter, redirect } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoginDataAction } from "../../redux/action/authAction";
// import axios from "axios";
function Page() {
  const count = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [tokenlist, setTokenlist] = useState([]);
  const router = useRouter();
  const [formdata, setFormdata] = useState({
    uid: "",
    password: "",
  });
  useEffect(() => {
    dispatch(setLoginDataAction({ test: true }));
  }, []);
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
  const findmyip = async () => {
    const res = await axios.get("https://api.ipify.org?format=json");
    console.log("🌈♦🌈♦🌈♦", res.data?.ip);
    return res.data?.ip;
  };
  const handleLogin = async () => {
    handleLoadings("login", 1);
    if (formdata?.uid && formdata?.password) {
      // === "adminid"
      const myip = await findmyip();
      if (formdata?.password) {
        let hash = await generateSHA256Hash(formdata?.password);
        const loginresponse = await axios.post("/api/login", {
          email: formdata?.uid,
          password: hash, //formdata?.password,
          myip,
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
          localStorage.setItem(
            "name",
            btoa(loginresponse?.data?.data?.[0]?.name)
          );

          const temp = await axios.post("/api/clientlist");
          let clientToken = [];
          temp?.data?.data?.map(async (clientitem, clientindex) => {
            const ctoken = await axios.post("/api/clientlogin", {
              ...clientitem,
              myip,
            });
            // clientToken?.push({ ...ctoken?.data });
            // dispatch(
            //   setDetails({
            //     obj: { ...ctoken?.data },
            //     key: `clientdetails${clientindex}`,
            //   })
            // );
            dispatch(
              setLoginDataAction({
                obj: {
                  ...ctoken?.data,
                  api_key: clientitem.api_key,
                  client_code: clientitem.client_code,
                  fname: clientitem.fname,
                  lname: clientitem.lname,
                },
                key: clientitem?._id,
              })
            );
            // setTokenlist((prev) => [...prev, ctoken?.data?.res?.data]);
          });
          // console.log(clientToken);
          // dispatch(setDetails({ obj: clientToken, key: "clientdetails" }));

          router.push("/securepage/dashboard");
          // redirect("/securepage/dashboard");
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
      {/* <button
        onClick={() => {
          dispatch(
            setDetails({ key: "login", value: { obj: 1, key2: "abcd" } })
          );
          // dispatch(setDetails({ obj: 1, key2: "abcd" }));
        }}
      >
        {" "}
        Test
      </button> */}
      <hr />
      <form
        action={() => {
          // e.preventDefault();
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
