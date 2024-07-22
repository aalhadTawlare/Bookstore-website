const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn"); // Ensure your MongoDB connection is established
const user = require("./routes/user");
const book = require("./routes/book");
const fav = require("./routes/favourite");
const cart = require("./routes/cart");
const order = require("./routes/order");

app.use(cors());
 // Middleware to parse JSON bodies
 app.use(express.json());

// Routes
app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1", fav);
app.use("/api/v1", cart);
app.use("/api/v1",order);

app.get("/", (req, res) => {
    res.send("Hello from backend");
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
});
