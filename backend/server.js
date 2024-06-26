import express from "express";
import cors from "cors";
import router from "./src/routes/routes.js";
import { connectDB } from "./src/database/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT || 8000;

connectDB();

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
