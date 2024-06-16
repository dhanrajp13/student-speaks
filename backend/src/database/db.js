import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Perform database connection
export const connectDB = async () => {
    const uri =
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sde8rff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(uri);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

