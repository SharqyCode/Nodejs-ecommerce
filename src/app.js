const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes");  // 👈 imports index.js automatically
const userRouter = require("./routes/userRoutes");
const cors = require("cors")

dotenv.config();
// connectDB();

const app = express();
app.use(cors())
app.use(express.json());

// Base API prefix
app.use("/api", routes);

app.use(`/api/users`, userRouter);

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app
