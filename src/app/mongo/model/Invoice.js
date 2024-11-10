import mongoose, { Schema, model, Types } from "mongoose";

const InvoiceSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

mongoose.models = {};
const Invoice = model("Invoice", InvoiceSchema, "Invoices");

export default Invoice;
