"use server";

import connectToDatabase from "../mongo/db";
import Instrument from "../mongo/model/Instrument";
import Client from "../mongo/model/Clients";
import { decodeWithKey, encodeWithKey } from "./utils";
// import { fetchInstrument } from "./data";

export async function addClient(formData) {
  try {
    await connectToDatabase();

    const newClient = new Client({
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
