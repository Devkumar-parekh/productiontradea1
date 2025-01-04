import mongoose, { Schema, model } from "mongoose";

const ClientSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  api_key: { type: String, required: true },
  client_code: { type: String, required: true },
  password: { type: String, required: true },
  totp: { type: String, required: true },
});
mongoose.models = {};
const Client = mongoose.model("Client", ClientSchema, "Clients");

export default Client;
