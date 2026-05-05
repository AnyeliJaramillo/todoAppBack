import mongoose from "mongoose";
import * as dotenv from "dotenv";
import dns from "dns";

dotenv.config();

// Forzar DNS públicos
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI no está definida");
    }

    await mongoose.connect(uri);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error conexión MongoDB:", error);
    process.exit(1);
  }
};