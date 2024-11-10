import mongoose, { Schema, model } from "mongoose";

const RevenueSchema = new Schema({
  month: { type: String, required: true },
  revenue: { type: Number, required: true },
});

mongoose.models = {};
const Revenue = model("Revenue", RevenueSchema, "Revenue");

export default Revenue;
