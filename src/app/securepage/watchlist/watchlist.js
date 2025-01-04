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
import CustomModal from "../../components/CustomModal";
import BuySellForm from "../../components/BuySellForm";

function Watchlist(props) {
  const authstate = useSelector((state) => state.auth);
  const [watchlistdata, setWatchlistdata] = useState(props.data);
  const [orderstatus, setOrderstatus] = useState([]);
  const [modal, setmodal] = useState(1);

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
      title: "Market price",
      cell: (row) => {
        return <>{row?.price || 0}</>;
      },
    },
    {
      prop: "customCell",
      title: "Action",
      cell: (row) => {
        const tempd = new Date();
        return (
          <>
            {/* <button
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
            </button> */}
            <span className="mx-2">
              {modal !== false && (
                <CustomModal
                  btnText="Buy"
                  headerTitle={`Buy ${decodeWithKey(row?.symbol)}`}
                  modalBody={
                    <span id={tempd}>
                      <BuySellForm
                        dropdowndata={{
                          clientlist: Object.values(authstate.loginData),
                        }}
                        handleForm={(formdata) => {
                          console.log("handleForm called", formdata);

                          // let ltp = {};
                          if (formdata?.price && formdata?.qty) {
                            if (formdata?.clientlist?.length > 0) {
                              Object.entries(authstate?.loginData)?.map(
                                async ([key, value], itemindex) => {
                                  if (
                                    value?.client_code &&
                                    formdata?.clientlist?.includes(
                                      decodeWithKey(value.client_code)
                                    )
                                  ) {
                                    const data = {
                                      variety: formdata?.variety || "NORMAL", //"NORMAL",
                                      transactiontype:
                                        formdata?.transactiontype || "BUY",
                                      ordertype:
                                        formdata?.ordertype || "MARKET",
                                      producttype:
                                        formdata?.producttype || "DELIVERY", //"INTRADAY",
                                      duration: formdata?.duration || "DAY",
                                      price: formdata?.price || row?.price, //"51",
                                      quantity: formdata?.qty || 0, //"1",
                                      squareoff: "0",
                                      stoploss: "0",
                                      tradingsymbol: decodeWithKey(row?.symbol),
                                      symboltoken: decodeWithKey(row?.token),
                                      exchange: decodeWithKey(row?.exch_seg),
                                    };
                                    console.log(
                                      decodeWithKey(value.client_code),
                                      data
                                    );
                                    if (value?.jwtToken) {
                                      const temp = await axios.post(
                                        "/api/operation",
                                        {
                                          api_key: value?.api_key,
                                          jwt: value?.jwtToken,
                                          data: data,
                                          opt: 1,
                                        }
                                      );
                                      console.log(
                                        data,
                                        itemindex,
                                        "data❤❤💛💙🖤itemindex",
                                        temp,
                                        "buy result"
                                      );
                                      // setOrderstatus((prev) => [
                                      //   ...prev,
                                      //   {
                                      //     client_code: decodeWithKey(
                                      //       value?.client_code
                                      //     ),
                                      //     orderid: temp?.data?.data?.orderid,
                                      //     text: temp?.data?.data?.text,
                                      //   },
                                      // ]);
                                    }
                                  }
                                }
                              );

                              return {
                                status: 200,
                                message: "Order is processed",
                              };
                            } else {
                              return {
                                status: 400,
                                message: "Please select clients",
                              };
                            }
                          } else {
                            return {
                              status: 400,
                              message: "Please fill all the fields",
                            };
                          }
                        }}
                      />
                    </span>
                  }
                />
              )}
            </span>

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
    // {
    //   prop: "customCell",
    //   title: "Order details",
    //   cell: (row) => {
    //     return (
    //       <>
    //         <button
    //           className="btn btn-primary btn-sm me-2 "
    //           onClick={async () => {
    //             console.log("🤵row,", row);
    //             Object.entries(authstate?.loginData)?.map(
    //               async ([key, value], itemindex) => {
    //                 if (value?.jwtToken) {
    //                   const temp = await axios.post("/api/getorderbook", {
    //                     api_key: decodeWithKey(value?.api_key),
    //                     jwt: value?.jwtToken,
    //                   });
    //                   console.log(
    //                     itemindex,
    //                     "order book",
    //                     decodeWithKey(value?.client_code),
    //                     temp?.data?.data?.text,
    //                     temp?.data?.data?.orderid,
    //                     "Test😎💛"
    //                   );
    //                 }
    //               }
    //             );
    //           }}
    //         >
    //           Get order details
    //         </button>
    //       </>
    //     );
    //   },
    //   issortable: false,
    // },
    // {
    //   prop: "customCell",
    //   title: "Action3",
    //   cell: (row) => {
    //     return (
    //       <>
    //         <button
    //           className="btn btn-primary btn-sm me-2 "
    //           onClick={async () => {
    //             console.log("🤵row,", row);
    //             Object.entries(authstate?.loginData)?.map(
    //               async ([key, value], itemindex) => {
    //                 if (value?.jwtToken) {
    //                   const temp = await axios.post("/api/operation", {
    //                     api_key: value?.api_key,
    //                     jwt: value?.jwtToken,
    //                     // opt: 2,
    //                   });
    //                   console.log(itemindex, "order book", temp, "Test😎💛");
    //                 }
    //               }
    //             );
    //           }}
    //         >
    //           Profile
    //         </button>
    //       </>
    //     );
    //   },
    //   issortable: false,
    // },
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
    TableBody: watchlistdata,
    TableHead: TableHead,
    tableClasses: "table-dark table-hover table-striped", //you can do the changes as needed these are bootstrap classes
    theadClasses: "table-primary", //you can do the changes as needed these are bootstrap classes
    tbodyClasses: "table-success", //you can do the changes as needed these are bootstrap classes
  };

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
    console.log(Object.values(authstate?.loginData));
    let authdata = Object.values(authstate?.loginData);
    let socket;
    let exchangewisedata = [];
    let exchobj = {};
    watchlistdata?.map((item) => {
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
      // if (false && authdata?.length) {
      for (let authindex in authdata) {
        let authitem = authdata[authindex];
        if (authitem) {
          const latestData = {};
          // const socket = new WebSocket("ws://localhost:8080");
          const clientCode = decodeWithKey(authitem?.client_code);
          const feedToken = authitem?.feedToken;
          const apiKey = decodeWithKey(authitem?.api_key);
          socket = new WebSocket(
            `wss://smartapisocket.angelone.in/smart-stream?clientCode=${clientCode}&feedToken=${feedToken}&apiKey=${apiKey}`
          );

          // Handle connection open
          socket.onopen = () => {
            console.log("WebSocket connected", watchlistdata);

            const subscriptionMessage = {
              action: 1,
              params: {
                mode: 1,
                tokenList: exchangewisedata,
              },
            };

            socket.send(JSON.stringify(subscriptionMessage));
            console.log("Subscription message sent:", subscriptionMessage);
            setInterval(() => {
              if (socket) socket.send("ping");
            }, 30000);
          };

          // Handle incoming messages
          socket.onmessage = async (event) => {
            // console.log("Message from server:", event.data);

            const reader = new FileReader();
            reader.onload = function (event) {
              const arrayBuffer = event.target.result;
              // console.log("Blob as ArrayBuffer:", new Uint8Array(arrayBuffer)); // Output: Uint8Array(4) [ 65, 66, 67, 68 ]
              const data = new Uint8Array(arrayBuffer);

              // Check if the message is a heartbeat response
              if (
                data.length === 4 &&
                data[0] === 112 &&
                data[1] === 111 &&
                data[2] === 110 &&
                data[3] === 103
              ) {
                // Ignore heartbeat response
                return;
              }

              // Parse the received binary data based on the provided response contract

              // Extract the Last Traded Price (LTP) and Token ID from the received data
              const ltpBytes = data.slice(43, 47);
              const closePriceBytes = data.slice(115, 122);
              const tokenIDBytes = data.slice(2, 27);
              const ltpValue = ltpBytes.reduce(
                (value, byte, index) => value + byte * Math.pow(256, index),
                0
              );
              const closePrice = closePriceBytes.reduce(
                (value, byte, index) => value + byte * Math.pow(256, index),
                0
              );
              const ltp = ltpValue / 100;
              const yesterdayPrice = closePrice / 100;
              const priceChange = parseFloat((ltp - yesterdayPrice).toFixed(2));
              const percentChange = parseFloat(
                ((priceChange / ltp) * 100).toFixed(2)
              );

              //  const decoder = new TextDecoder('utf-8');
              const tokenID = new TextDecoder()
                .decode(tokenIDBytes)
                .replace(/\u0000/g, ""); //To decode from Bytes and remove the null characters at the end of tokenID
              const tokenName = tokenID; //retrieves token name for the corresponding tokenID from the tokenMapping
              // Create a JSON object with tokenID and ltp
              const jsonData = {
                tokenName: tokenName,
                ltp: ltp,
                yesterdayPrice: yesterdayPrice,
                change: priceChange,
                percentChange: percentChange,
              };

              // Store the latest data for the instrument
              latestData[tokenID] = jsonData;
              //console.log(latestData)
              // Display the JSON object
              // console.log(jsonData);
              setWatchlistdata((prev) => {
                return prev?.map((item) => {
                  if (decodeWithKey(item.token) === tokenName) {
                    return { ...item, price: ltp };
                  }
                  return item;
                });
              });
              props.data?.map((item) => {
                if (decodeWithKey(item.token) === tokenName) {
                  return { ...item, price: ltp };
                }
                return item;
              });
            };
            if (event.data instanceof Blob)
              reader?.readAsArrayBuffer(event.data);
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
