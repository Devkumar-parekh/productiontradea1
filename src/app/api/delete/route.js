import Client from "../../mongo/model/Clients";
import Watchlist from "../../mongo/model/Watchlist";
import connectToDatabase from "../../mongo/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
export const dynamic = "force-dynamic"; // defaults to auto;

export const POST = async (req, content) => {
  await connectToDatabase();
  try {
    const payload = await req.json();
    let data = [];
    if (payload?.tbl === "client") {
      data = await Client.deleteOne({
        _id: new ObjectId(payload?._id),
      });
    } else if (payload?.tbl === "watchlist") {
      data = await Watchlist.deleteOne({
        _id: new ObjectId(payload?._id),
      });
    }
    console.log("❎🏠🏠", data);
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
