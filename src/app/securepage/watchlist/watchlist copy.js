"use client";
import { CustomDatatable } from "customdatatabledev";
import React, { useEffect, useMemo, useState } from "react";
import { decodeWithKey, encodeWithKey } from "../../lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
// import { SmartAPI } from "smartapi-javascript";
import { getSocket } from "../../hook/getsocket";
import { createWebSocket } from "../../../socket";

function Watchlist(props) {
  const authstate = useSelector((state) => state.auth);

  const router = useRouter();
  const TableHead = [
    {
      prop: "customCell",
      title: "Symbol",
      cell: (row) => {
        return <>{decodeWithKey(row?.symbol)}</>;
      },
    },
    {
      prop: "customCell",
      title: "Name",
      cell: (row) => {
        return <>{decodeWithKey(row?.name)}</>;
      },
    },
    {
      prop: "customCell",
      title: "Lot Size",
      cell: (row) => {
        return <>{decodeWithKey(row?.lotsize)}</>;
      },
    },
    {
      prop: "customCell",
      title: "Strike",
      cell: (row) => {
        return <>{decodeWithKey(row?.strike)}</>;
      },
    },
    {
      prop: "customCell",
      title: "Instrument Type",
      cell: (row) => {
        return <>{decodeWithKey(row?.instrumenttype)}</>;
      },
    },
    {
      prop: "customCell",
      title: "Exch seg",
      cell: (row) => {
        return <>{decodeWithKey(row?.exch_seg)}</>;
      },
    },

    {
      prop: "customCell",
      title: "Action",
      cell: (row) => {
        return (
          <>
            <button
              className="btn btn-primary btn-sm me-2 "
              onClick={async () => {
                console.log("🤵row,", row);

                let formdata = {};
                let ltp = {};
                const data = {
                  variety: formdata?.variety || "NORMAL", //"NORMAL",
                  transactiontype: formdata?.transactiontype || "BUY",
                  ordertype: formdata?.ordertype || "MARKET",
                  producttype: formdata?.producttype || "DELIVERY", //"INTRADAY",
                  duration: formdata?.duration || "DAY",
                  price: formdata?.price || "3", //"51",
                  quantity: formdata?.quantity || "1", //"1",
                  squareoff: "0",
                  stoploss: "0",
                  tradingsymbol:
                    ltp?.tradingsymbol || decodeWithKey(row?.symbol),
                  symboltoken: ltp?.symboltoken || decodeWithKey(row?.token),
                  exchange: ltp?.exchange || decodeWithKey(row?.exch_seg),
                };

                Object.entries(authstate?.loginData)?.map(
                  async ([key, value], itemindex) => {
                    if (value?.jwtToken) {
                      // const temp = await placeorder({
                      //   api_key: decodeWithKey(value?.api_key),
                      //   jwt: value?.jwtToken,
                      //   data: data,
                      // });

                      const temp = await axios.post("/api/operation", {
                        api_key: value?.api_key,
                        jwt: value?.jwtToken,
                        data: data,
                        opt: 1,
                      });

                      console.log(
                        data,
                        itemindex,
                        "data❤❤💛💙🖤itemindex",
                        temp,
                        "buy result"
                      );
                    }
                  }
                );
                //================================================
                //=================DO NOT REMOVE==================
                //================================================
                // handleLoader("order", 1);
                // if (Number(formdata?.price) && Number(formdata?.quantity)) {
                // const temp = await placeorder({
                //   api_key: decodeWithKey(api_key),
                //   jwt: decodeWithKey(jwtToken),
                //   data: data,
                // });
                // console.log(data, "data❤❤💛💙🖤", temp, "buy result");
                // } else {
                //   alert("Please enter valid price and quantity");
                // }
                //================================================
                // handleLoader("order", 0);
                // setFormdata(initForm);
                // router.refresh();
              }}
            >
              Buy/Sell
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={async () => {
                const temp = await axios.post("/api/delete", {
                  _id: row._id,
                  tbl: "watchlist",
                });
                console.log(temp, "😎😍💎");
                router.refresh();
              }}
            >
              Delete
            </button>
          </>
        );
      },
      issortable: false,
    },
    {
      prop: "customCell",
      title: "Action2",
      cell: (row) => {
        return (
          <>
            <button
              className="btn btn-primary btn-sm me-2 "
              onClick={async () => {
                console.log("🤵row,", row);
                Object.entries(authstate?.loginData)?.map(
                  async ([key, value], itemindex) => {
                    if (value?.jwtToken) {
                      const temp = await axios.post("/api/getorderbook", {
                        api_key: decodeWithKey(value?.api_key),
                        jwt: value?.jwtToken,
                      });
                      console.log(itemindex, "order book", temp, "Test😎💛");
                    }
                  }
                );
              }}
            >
              Get order details
            </button>
          </>
        );
      },
      issortable: false,
    },
    {
      prop: "customCell",
      title: "Action3",
      cell: (row) => {
        return (
          <>
            <button
              className="btn btn-primary btn-sm me-2 "
              onClick={async () => {
                console.log("🤵row,", row);
                Object.entries(authstate?.loginData)?.map(
                  async ([key, value], itemindex) => {
                    if (value?.jwtToken) {
                      const temp = await axios.post("/api/operation", {
                        api_key: value?.api_key,
                        jwt: value?.jwtToken,
                        // opt: 2,
                      });
                      console.log(itemindex, "order book", temp, "Test😎💛");
                    }
                  }
                );
              }}
            >
              Profile
            </button>
          </>
        );
      },
      issortable: false,
    },
  ];
  const tableProps = {
    Pagination: "false",
    SearchFilter: "false",
    classes: "",
    recordPerPageProp: 10,
    id: "1",
    useref: null,
    printOption: false,
    pdfOption: true,
    isResponsive: true,
    TableBody: props.data,
    TableHead: TableHead,
    tableClasses: "table-dark table-hover table-striped", //you can do the changes as needed these are bootstrap classes
    theadClasses: "table-primary", //you can do the changes as needed these are bootstrap classes
    tbodyClasses: "table-success", //you can do the changes as needed these are bootstrap classes
  };
  const [ws, setWs] = useState(null); // Store the WebSocket instance
  const [messages, setMessages] = useState([]);

  let exchange_mapping = {
    NSE: "1", // NSE_CM
    NSEFO: "2", // NSE_FO
    BSE: "3", // BSE_CM
    BSEFO: "4", // BSE_FO
    MCX: "5", // MCX_FO
    NCX: "7", // NCX_FO
    CDS: "13", // CDE_FO
  };
  useEffect(() => {
    // Initialize WebSocket connection
    console.log(Object.values(authstate?.loginData)?.[0]);
    let authdata = Object.values(authstate?.loginData);
    let socket;
    let exchangewisedata = [];
    let exchobj = {};
    props.data?.map((item) => {
      if (exchobj[item?.exch_seg]) {
        exchobj[item?.exch_seg] = [
          ...exchobj[item?.exch_seg],
          decodeWithKey(item.token),
        ];
      } else {
        console.log(
          decodeWithKey(item?.exch_seg),
          decodeWithKey(item?.instrumenttype)
        );
        exchobj[item?.exch_seg] = [decodeWithKey(item.token)];
      }
      // exchobj[item?.exch_seg] = exchobj[item?.exch_seg]
      //   ? [...exchobj[item?.exch_seg], decodeWithKey(item.token)]
      //   : [decodeWithKey(item.token)];
    });
    console.log(exchobj);

    exchangewisedata = Object.entries(exchobj).map(([key, value]) => {
      return {
        exchangeType: exchange_mapping[decodeWithKey(key)],
        tokens: value,
      };
    });
    console.log(exchangewisedata);
    if (authdata?.length) {
      for (let authindex in authdata) {
        let authitem = authdata[authindex];
        if (authitem) {
          // const socket = new WebSocket("ws://localhost:8080");
          const clientCode = decodeWithKey(authitem?.client_code);
          const feedToken = authitem?.feedToken;
          const apiKey = decodeWithKey(authitem?.api_key);
          socket = new WebSocket(
            `wss://smartapisocket.angelone.in/smart-stream?clientCode=${clientCode}&feedToken=${feedToken}&apiKey=${apiKey}`
          );
          setWs(socket);

          // Handle connection open
          socket.onopen = () => {
            console.log("WebSocket connected", props.data);

            const subscriptionMessage = {
              action: 1,
              params: {
                mode: 1,
                tokenList: exchangewisedata,
              },
            };

            // {
            //   action: 1,
            //   params: {
            //     mode: 1,
            //     tokenList: [
            //       {
            //         exchangeType: "MCX",
            //         tokens: ["430083"],
            //       },
            //       {
            //         exchangeType: "BSE",
            //         tokens: ["532939", "532667"],
            //       },
            //     ],
            //   },
            // };

            socket.send(JSON.stringify(subscriptionMessage));
            console.log("Subscription message sent:", subscriptionMessage);
            setInterval(() => {
              if (socket) socket.send("ping");
            }, 30000);
          };

          // Handle incoming messages
          socket.onmessage = async (event) => {
            // console.log("Message from server:", event.data);
            let result = event.data;
            // handleBinaryMessage(event.data);
            // const buf = Buffer.from(result);
            // const receivedData = setResponse(buf, result);
            const reader = new FileReader();
            reader.onload = function (event) {
              const arrayBuffer = event.target.result;
              console.log("Blob as ArrayBuffer:", new Uint8Array(arrayBuffer)); // Output: Uint8Array(4) [ 65, 66, 67, 68 ]
              // const text = new TextDecoder().decode(arrayBuffer);
              // const jsonData = JSON.parse(text);
              // console.log("Parsed JSON data:", jsonData);
            };
            if (event.data instanceof Blob)
              reader?.readAsArrayBuffer(event.data);
            setMessages((prev) => [...prev, event.data]);
          };

          // Handle connection close
          socket.onclose = () => {
            console.log("WebSocket disconnected");
          };

          // Handle errors
          socket.onerror = (error) => {
            console.error("WebSocket error:", error);
          };
          break;
        }
      }
    }

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.close();
        socket = null;
      }
    };
  }, [authstate?.loginData]); // Empty dependency array ensures this runs only once

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send("Hello from React!");
    } else {
      console.error("WebSocket is not open.");
    }
  };

  return (
    <div>
      <CustomDatatable {...tableProps} />
    </div>
  );
}

export default Watchlist;
function handleBinaryMessage(binaryData) {
  // Convert binary (ArrayBuffer) to string
  const text = new TextDecoder().decode(binaryData);

  // Parse the string as JSON
  const jsonData = JSON.parse(text);

  // Handle the JSON data
  console.log("Decoded JSON data:", jsonData);
}

// function setResponse(buf, result) {
//   const subscription_mode = new Parser().uint8("subscription_mode");

//   switch (subscription_mode.parse(buf)?.subscription_mode) {
//     case MODE.LTP:
//       return LTP(buf);
//     // case MODE.Quote:
//     //   return QUOTE(buf);
//     // case MODE.SnapQuote:
//     //   return SNAP_QUOTE(buf);
//     // case MODE.Depth:
//     //   return DEPTH(buf);
//     default:
//       return result;
//   }
// }

// function LTP(buf) {
//   const ltp = new Parser()
//     .endianness("little")
//     .int8("subscription_mode", { formatter: toNumber })
//     .int8("exchange_type", { formatter: toNumber })
//     .array("token", {
//       type: "uint8",
//       length: 25,
//       formatter: _atos,
//     })
//     .int64("sequence_number", { formatter: toNumber })
//     .int64("exchange_timestamp", { formatter: toNumber })
//     .int32("last_traded_price", { formatter: toNumber });

//   return ltp.parse(buf);
// }
