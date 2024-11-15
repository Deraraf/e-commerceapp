import mongoose from "mongoose";

const connectedDB = async () => {
  const connection = mongoose.connection.readyState;

  // Prevent multiple attempts if already connected or connecting
  if (connection === 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  if (connection === 2) {
    console.log("Connection to MongoDB is already in progress...");
    return;
  }

  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://derarageremu:ITtR4jKOWS0kfe97@cluster0.7bent.mongodb.net/ecomerce?retryWrites=true&w=majority&appName=Cluster0"
    );
    mongoose.connection.once("open", () => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1); // Exit on failure to avoid running without a DB connection
  }
};

export default connectedDB;
