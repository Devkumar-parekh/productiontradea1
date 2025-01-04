import axios from "axios";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto;

export const POST = async (req, content) => {
  try {
    const payload = await req.json();

    const res = await getOrderBook(payload);

    if (res.data) {
      return NextResponse.json({
        status: 200,
        message: "OK",
        data: res.data,
      });
    } else {
      return NextResponse.json({
        status: 500,
        message: "OK",
        data: res,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Failed",
      data: [],
      error,
    });
  }
};

const getOrderBook = async (payload) => {
  const myip = await findmyip();
  let data = "";
  let config = {
    method: "post",
    url: "https://apiconnect.angelone.in/rest/secure/angelbroking/order/v1/getOrderBook",
    headers: {
      Authorization: `Bearer ${payload?.jwt}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-UserType": "USER",
      "X-SourceID": "WEB",
      "X-ClientLocalIP": myip, //"CLIENT_LOCAL_IP",
      "X-ClientPublicIP": "CLIENT_PUBLIC_IP",
      "X-MACAddress": "MAC_ADDRESS",
      "X-PrivateKey": payload.api_key,
    },
    data: data,
  };

  const result = await axios(config);
  console.log(result?.data);
  // alert("Success!");
  return result;
};

const findmyip = async () => {
  const res = await axios.get("https://api.ipify.org?format=json");
  console.log("🌈♦🌈♦🌈♦", res.data?.ip);
  return res.data?.ip;
};
