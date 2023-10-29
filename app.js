require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const connectDB = require("./server/db/database");

const app = express();
const port = process.env.PORT;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "myblog",
    resave: true,
    saveUninitialized: false
}));
app.set("view engine", "ejs");

app.use("/", require("./server/routes/index"));
app.use("/update", require("./server/routes/update"));
app.use("/delete", require("./server/routes/delete"));
app.use("/dashboard", require("./server/routes/dashboard"));

app.listen(port, function () {
    console.log(`App is running on port ${port}`);
});
