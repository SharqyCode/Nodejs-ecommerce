const dotenv = require("dotenv")
const connectDB = require("./config/db.js");
const app = require("./app.js");


dotenv.config();

connectDB();



const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
});
