import { NextResponse } from "next/server";
import { SmartAPI } from "smartapi-javascript";
import axios from "axios";
import { TOTP } from "totp-generator";
import { decodeWithKey } from "../../lib/utils";
export const dynamic = "force-dynamic"; // defaults to auto;

export const POST = async (req, res) => {
  try {
    const payload = await req.json();

    let res = [];

    let smart_api = new SmartAPI({
      api_key: decodeWithKey(payload.api_key), // PROVIDE YOUR API KEY HERE
      access_token: payload.jwt,
    });

    switch (payload?.opt) {
      case 1: // placeorder
        let orderres = await smart_api.placeOrder(payload.data);
        let orderbookres = await smart_api.getOrderBook();
        res = orderbookres?.data?.filter((orderbookitem) => {
          if (orderbookitem?.orderid === orderres?.data?.orderid) return true;
        });
        console.log("😁😁😎", orderbookres, res);
        break;
      case 2: // getHolding
        res = await smart_api.getHolding();
        break;
      default: // get profile
        res = await smart_api.getProfile();
        break;
    }

    if (res) {
      console.log("🎊✨✨", payload?.opt, res);
    }
    return NextResponse.json({
      data: res,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
};
