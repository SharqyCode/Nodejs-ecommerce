const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes");  // 👈 imports index.js automatically
const userRouter = require("./routes/userRoutes");
const cors = require("cors")
const orderRouter = require('./routes/orderRoutes');
dotenv.config();
// connectDB();

const app = express();
app.use(cors())
app.use(express.json());

// Base API prefix
app.use("/api", routes);
// Error handling
app.use((req, res) => {
    res.send("400 Invalid route or method. try again.")
})




const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app
