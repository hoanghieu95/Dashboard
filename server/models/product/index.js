const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    value: Number,
    time: Date,
    type: {
      idType: String,
      name: String,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

module.exports = Product;
