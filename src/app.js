const express = require("express");


const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const routes = require("./routes"); // 👈 imports index.js automatically
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
const orderRouter = require("./routes/orderRoutes");
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const path = require("path");

// connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Base API prefix
app.use("/api", routes);
// Error handling



app.use("/api/orders", orderRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(session({ secret: 'someSecret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



app.use('/api/auth', authRoutes);
/* app.use((req, res) => {
    res.status(404).send("404: NOT FOUND. Invalid route or method. try again.")
}) */

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
