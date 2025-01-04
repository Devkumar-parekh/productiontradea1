import mongoose, { Schema, model } from "mongoose";

const WatchListSchema = new Schema({
  token: { type: String, required: false },
  symbol: { type: String, required: false },
  name: { type: String, required: false },
  expiry: { type: String, required: false },
  strike: { type: String, required: false },
  lotsize: { type: String, required: false },
  instrumenttype: { type: String, required: false },
  exch_seg: { type: String, required: false },
  tick_size: { type: String, required: false },
});
mongoose.models = {};
const WatchList = mongoose.model("WatchList", WatchListSchema, "WatchLists");

export default WatchList;
