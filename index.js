const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./src/route/route");
const app = express();
require('dotenv/config');

app.use(cors({
    origin: "*"
}));
const PORT = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', route);

mongoose.connect(process.env.mongoURI, { useNewUrlParser: true })
    .then(() => console.log("connected to db successfully"));

app.listen(process.env.PORT || PORT, () => console.log("listening on port " + PORT));