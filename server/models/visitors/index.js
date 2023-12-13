const mongoose = require("mongoose");

const VisitorsSchema = new mongoose.Schema(
  {
    visitors: Number,
    productId: Number,
    title: String,
    message: String,
    time: Date,
  },
  { timestamps: true }
);

const Visitor =
  mongoose.models.Visitors || mongoose.model("Visitors", VisitorsSchema);

module.exports = Visitor;
