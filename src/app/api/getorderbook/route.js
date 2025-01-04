import { NextResponse } from "next/server";
import { SmartAPI } from "smartapi-javascript";
import axios from "axios";
import { TOTP } from "totp-generator";
import { decodeWithKey } from "../../lib/utils";
export const dynamic = "force-dynamic"; // defaults to auto;

export const POST = async (req, res) => {
  try {
    const payload = await req.json();
    // const smart_api = new SmartAPI({
    //   api_key: process.env.API_KEY,
    //   client_code: process.env.CLIENT_CODE,
    //   password: process.env.PASSWORD,
    //   totp: process.env.TOTP,
    // });
    let res = "";

    const { otp, expires } = TOTP.generate(decodeWithKey(payload.totp));

    let temppayload = {
      api_key: decodeWithKey(payload.api_key),
      client_code: decodeWithKey(payload.client_code),
      password: decodeWithKey(payload.password),
      totp: otp,
      mypublicip: payload.myip,
    };
    console.log(temppayload, "👑😘🤴");
    // const smart_api = new SmartAPI(temppayload);
    let smart_api = new SmartAPI({
      api_key: payload.api_key, // PROVIDE YOUR API KEY HERE
      access_token: payload.jwt,
    });
    res = await smart_api.getOrderBook();
    if (res) {
      console.log("👨‍🏫", res);

      // User Methods
      // return smart_api.getProfile()

      // return smart_api.logout()

      // return smart_api.getRMS();

      // Order Methods
      // placeOrderStatus = smart_api.placeOrder({
      //   variety: "NORMAL",
      //   tradingsymbol: "SBIN-EQ",
      //   symboltoken: "3045",
      //   transactiontype: "BUY",
      //   exchange: "NSE",
      //   ordertype: "LIMIT",
      //   producttype: "INTRADAY",
      //   duration: "DAY",
      //   price: "1",
      //   squareoff: "0",
      //   stoploss: "0",
      //   quantity: "1",
      // });
      // console.log(placeOrderStatus.data, "placeOrderStatus");

      // return smart_api.modifyOrder({
      //     "orderid": "201130000006424",
      //     "variety": "NORMAL",
      //     "tradingsymbol": "SBIN-EQ",
      //     "symboltoken": "3045",
      //     "transactiontype": "BUY",
      //     "exchange": "NSE",
      //     "ordertype": "LIMIT",
      //     "producttype": "INTRADAY",
      //     "duration": "DAY",
      //     "price": "19500",
      //     "squareoff": "0",
      //     "stoploss": "0",
      //     "quantity": "1"
      // });

      // return smart_api.cancelOrder({
      //     "variety": "NORMAL",
      //     "orderid": "201130000006424"
      // });

      // orderBook = await smart_api.getOrderBook();

      // tradeBook = await smart_api.getTradeBook();

      // Portfolio Methods
      // holding = smart_api.getHolding();

      // return smart_api.getPosition();

      // return smart_api.convertPosition({
      //     "exchange": "NSE",
      //     "oldproducttype": "DELIVERY",
      //     "newproducttype": "MARGIN",
      //     "tradingsymbol": "SBIN-EQ",
      //     "transactiontype": "BUY",
      //     "quantity": 1,
      //     "type": "DAY"
      // });
    }
    return NextResponse.json({
      ...res?.data,
      // profile,
      // orderBook,
      // tradeBook,
      // holding,
      // placeOrderStatus,
      // ltpData,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
};
