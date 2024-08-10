const express = require("express");
const cors = require("cors");
const compression = require("compression");
const videoRoutes = require("./routes/index");


const app = express();
const PORT = process.env.PORT || 5050;

// Enable CORS
app.use(cors());
app.use(compression());

app.use(
	cors({
		origin: ["https://localhost:3000"],
		exposedHeaders: ["Content-Disposition", "Content-Type"],
	})
);
app.use(express.urlencoded({ extended: true }));

// Use the video routes
app.use("/", videoRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
