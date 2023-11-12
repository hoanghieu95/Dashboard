import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    value: Number,
    time: Date,
    type: {
      idType: String,
      name: String,
      value: String,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;
