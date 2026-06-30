import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import experiencesRoutes from "./routes/experiences";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/experiences", experiencesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "dearUs API is running 🎉" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
