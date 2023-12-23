import mongoose from "mongoose";

 const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vuhoanghieu95:vuhoanghieu95@dashboard.npvosk8.mongodb.net/"
    );
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
