"use server";

import connectToDatabase from "../mongo/db";
import Instrument from "../mongo/model/Instrument";
import WatchList from "../mongo/model/WatchList";
import Client from "../mongo/model/Clients";
import { decodeWithKey, encodeWithKey } from "./utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { fetchInstrument } from "./data";

export async function getWatchList(formData) {
  try {
    await connectToDatabase();
    const data = await WatchList.find();
    return JSON.parse(JSON.stringify(data || []));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch  data.", error?.message);
  }
}

export async function addWatchList(formData) {
  try {
    await connectToDatabase();

    const newWatchList = new WatchList(
      // ...formData
      {
        _id: formData?._id,
        token: encodeWithKey(formData?.["token"]),
        symbol: encodeWithKey(formData?.["symbol"]),
        name: encodeWithKey(formData?.["name"]),
        expiry: encodeWithKey(formData?.["expiry"]),
        strike: encodeWithKey(formData?.["strike"]),
        lotsize: encodeWithKey(formData?.["lotsize"]),
        instrumenttype: encodeWithKey(formData?.["instrumenttype"]),
        exch_seg: encodeWithKey(formData?.["exch_seg"]),
        tick_size: encodeWithKey(formData?.["tick_size"]),
      }
    );
    const data = await newWatchList.save();
    const result = {
      status: 200,
      message: "Resource created successfully.",
      data: data,
    };
    console.log(data, "😋👑👑🌈");
    alert("Watchlist added successfully");
    // revalidatePath("/securepage/watchlist");
    // redirect("/securepage/clients");
    return JSON.parse(JSON.stringify(result || {}));
  } catch (error) {
    console.error("Database Error:", error);
    const result = {
      status: 500,
      message: error?.message,
      data: [],
    };
    return JSON.parse(JSON.stringify(result || {}));
  }
}

export async function getClients(formData) {
  try {
    await connectToDatabase();
    const data = await Client.find();
    return JSON.parse(JSON.stringify(data || []));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch  data.", error?.message);
  }
}

export async function addClient(formData) {
  try {
    await connectToDatabase();

    const newClient = new Client({
      fname: encodeWithKey(formData.get("fname")), //payload.fname,
      lname: encodeWithKey(formData.get("lname")), //payload.lname,
      api_key: encodeWithKey(formData.get("api_key")), //payload.api_key,
      client_code: encodeWithKey(formData.get("client_code")), // payload.client_code,
      password: encodeWithKey(formData.get("password")), // payload.password,
      totp: encodeWithKey(formData.get("totp")), // payload.totp,
    });
    const data = await newClient.save();
    const result = {
      status: 200,
      message: "Resource created successfully.",
      data: data,
    };
    console.log(data, "😋👑👑🌈");

    revalidatePath("/securepage/clients");
    // redirect("/securepage/clients");
    return JSON.parse(JSON.stringify(result || {}));
  } catch (error) {
    console.error("Database Error:", error);
    const result = {
      status: 500,
      message: error?.message,
      data: [],
    };
    return JSON.parse(JSON.stringify(result || {}));
  }
}

export async function getInstrument(formData) {
  try {
    await connectToDatabase();
    const tempsearchstring = formData.get("searchstring")?.split(" ");
    const data = await Instrument.find({
      symbol: { $regex: new RegExp(tempsearchstring?.[0] || "", "i") },
      strike: {
        $regex:
          tempsearchstring?.length > 1
            ? new RegExp(`^${tempsearchstring?.[1]}` || "", "i")
            : "",
      },
    });
    return JSON.parse(JSON.stringify(data || []));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch  data.", error?.message);
  }
}
