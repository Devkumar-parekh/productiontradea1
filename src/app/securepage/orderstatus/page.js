"use client";
import React, { useEffect, useState } from "react";
import OrderList from "./orderlist";
import { useSelector } from "react-redux";
import axios from "axios";
import { decodeWithKey } from "../../lib/utils";

function Page() {
  const authstate = useSelector((state) => state.auth);
  const [orderstate, setOrderState] = useState([]);
  const [loader, setLoader] = useState(0);

  useEffect(() => {
    (async () => {
      setLoader(1);
      Object.entries(authstate?.loginData)?.map(
        async ([key, value], itemindex) => {
          if (value?.jwtToken) {
            const { data } = await axios.post("/api/operation", {
              api_key: value?.api_key,
              jwt: value?.jwtToken,
              opt: 3,
            });
            console.log(data, value, "🚄🚄🚄");
            setOrderState((prev) => {
              if (data?.data?.length) {
                return [
                  ...prev,
                  ...data?.data.map((oitem) => {
                    return { ...oitem, fname: value.fname, lname: value.lname };
                  }),
                ];
              } else {
                return prev;
              }
            });
            // if (data.data?.length)

            //   setOrderState((prev) => [...prev, ...data.data]);
          }
        }
      );
      setLoader(0);
    })();
  }, [authstate]);
  console.log(orderstate, "orderstate");
  return (
    <div style={{ fontFamily: "math" }}>
      <h2>Orders</h2>
      {loader ? (
        <>Loading...</>
      ) : orderstate?.length > 0 ? (
        <OrderList data={orderstate} />
      ) : (
        <div
          style={{ display: "grid", placeItems: "center", minHeight: "60vh" }}
        >
          No data found
        </div>
      )}
    </div>
  );
}

export default Page;
