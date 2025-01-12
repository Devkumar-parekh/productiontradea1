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
    console.log(payload?.opt);
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
        res = res.data;
        break;
      case 3: // getOrderBook
        res = await smart_api.getOrderBook();
        console.log(res);
        res = res.data;
        break;
      case 4: // search
        // res = await smart_api.search({ search_text: payload?.search_text });

        const url =
          "https://apiconnect.angelbroking.com/rest/secure/angelbroking/search/v1/";

        const headers = {
          Authorization: `Bearer ${payload.jwt}`,
          "Content-Type": "application/json",
          "X-ClientCode": decodeWithKey(payload.api_key),
        };

        const body = {
          search_text: payload?.search_text,
        };

        try {
          const response = await axios.post(url, body, { headers });
          console.log("Search Result:", response.data);
          return NextResponse.json({
            data: response.data,
          });
        } catch (error) {
          console.error(
            "Error searching for stock:",
            error.response?.data || error.message
          );
        }
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
