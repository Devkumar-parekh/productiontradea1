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
    const data = await Client.find();
    if (data?.length > 0) {
      return NextResponse.json({
        status: 200,
        message: "OK",
        data: data,
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
