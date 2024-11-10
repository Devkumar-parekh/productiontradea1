import mongoose, { Schema, model } from "mongoose";

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image_url: { type: String },
});
mongoose.models = {};
const Customer = mongoose.model("Customer", CustomerSchema, "Customers");

export default Customer;
