"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { decodeWithKey } from "../../lib/utils";
import HoldingsList from "./holdingslist";

function Page() {
  const authstate = useSelector((state) => state.auth);
  const [holdingsstate, setHoldingsState] = useState([]);

  useEffect(() => {
    (async () => {
      Object.entries(authstate?.loginData)?.map(
        async ([key, value], itemindex) => {
          if (value?.jwtToken) {
            const { data } = await axios.post("/api/operation", {
              api_key: value?.api_key,
              jwt: value?.jwtToken,
              opt: 2,
            });
            setHoldingsState((prev) => {
              if (data?.data?.length) {
                return [
                  ...prev,
                  ...data?.data.map((hitem) => {
                    return { ...hitem, fname: value.fname, lname: value.lname };
                  }),
                ];
              } else {
                return prev;
              }
            });
          }
        }
      );
    })();
  }, [authstate]);
  return (
    <div style={{ fontFamily: "math" }}>
      <h2>Holdings</h2>
      <HoldingsList data={holdingsstate} />
    </div>
  );
}

export default Page;
