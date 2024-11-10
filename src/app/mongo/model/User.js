import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
mongoose.models = {};
const UserModal = model("User", UserSchema, "Users");

export default UserModal;
