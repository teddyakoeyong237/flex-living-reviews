import express from "express";
import cors from "cors";
import reviewsRouter from "./routes/routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

// Routes
app.use("/api", reviewsRouter);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
