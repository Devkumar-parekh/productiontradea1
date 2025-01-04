import User from "../../mongo/model/User";
import connectToDatabase from "../../mongo/db";
import { NextResponse } from "next/server";
import Client from "../../mongo/model/Clients";
import { SmartAPI } from "smartapi-javascript";
import { decodeWithKey } from "../../lib/utils";
import { TOTP } from "totp-generator";
import axios from "axios";

export const dynamic = "force-dynamic"; // defaults to auto;

export const POST = async (req, content) => {
  await connectToDatabase();
  try {
    const payload = await req.json();

    const data = await User.find({
      email: payload?.email,
      password: payload?.password, // 'i' for case-insensitive
    });
    if (data?.length > 0) {
      // const clientlist = await Client.find();
      // let clientlogindata = [];
      // if (clientlist.length > 0) {
      //   let clsmartapiarr = Array(clientlist.length).fill({});
      //   clientlist.map(async (clientitem, clientindex) => {
      //     if (clientindex === 0) {
      //       let res = {};
      //       try {
      //         console.log("⭕smart_api", decodeWithKey(clientitem?.api_key));
      //         const { otp, expires } = TOTP.generate(
      //           decodeWithKey(clientitem.totp)
      //         );
      //         clsmartapiarr[clientindex] = new SmartAPI({
      //           api_key: decodeWithKey(clientitem?.api_key),
      //           totp: otp,
      //           mypublicip: payload.myip,
      //         });
      //         res = clsmartapiarr[clientindex]
      //           .generateSession(
      //             decodeWithKey(clientitem.client_code),
      //             decodeWithKey(clientitem.password),
      //             otp
      //           )
      //           .then((data) => {
      //             console.log("👑👑❎", data);
      //             clientlogindata.push({
      //               jwtToken: JSON.parse(JSON.stringify(data?.data?.jwtToken)),
      //             });
      //           });
      //       } catch (err) {
      //         //
      //       } finally {
      //         if (clientindex === clientlist?.length - 1) {
      //           console.log("❎❎🤵❎❎", clientlogindata);
      //           return NextResponse.json({
      //             status: 200,
      //             message: "OK",
      //             data: data,
      //             clientlogindata,
      //           });
      //         }
      //       }
      //     }
      //   });
      // }
      return NextResponse.json({
        status: 200,
        message: "OK",
        data: data,
        // clientlogindata,
      });
    } else {
      return NextResponse.json({
        status: 500,
        message: "OK",
        data: data,
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
