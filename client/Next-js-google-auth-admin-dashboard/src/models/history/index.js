import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    idProduct: Number,
    value: {
      type: [Number],
      default: []
    },
  },
);

const History =
  mongoose.models.his || mongoose.model("his", HistorySchema);

export default History;
