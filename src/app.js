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
// app.use((req, res) => {
//     res.status(404).send("404: NOT FOUND. Invalid route or method. try again.")
// })


app.use("/api/orders", orderRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(session({ secret: 'someSecret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



app.use('/api/auth', authRoutes);
/* app.use((req, res) => {
    res.status(404).send("404: NOT FOUND. Invalid route or method. try again.")
}) */

// Homepage
app.get("/", (req, res) => {
    res.send(`
    <html>
      <head>
        <title>Backend Server</title>
        <style>
          body { font-family: Arial; background: #f4f4f4; padding: 40px; }
          .container {
            max-width: 600px; margin: auto; background: white; 
            padding: 30px; border-radius: 10px; 
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          h1 { color: #333; }
          p { color: #555; }
          a { color: #0077cc; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Backend Server is Running 🚀</h1>
          <p>Welcome to the API home page.</p>
          <p>Available routes:</p>
          <ul>
            <li><a href="/api/products">GET /api/products</a></li>
            <li><a href="/api/users">GET /api/users</a></li>
            <li><a href="/api/orders">GET /api/orders</a></li>
          </ul>
        </div>
      </body>
    </html>
  `);
});


const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
