const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./src/route/route");
const app = express();
require('dotenv/config');
const path = require("path");

app.use(cors({
    origin: ['https://636a31c8e5e92c300287216c--precious-starburst-839541.netlify.app', 'http://localhost:3000']
}));
const PORT = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', route);

app.use(express.static('client/build'));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'client', 'build', 'index.html'));
})

mongoose.connect(process.env.mongoURI, { useNewUrlParser: true })
    .then(() => console.log("connected to db successfully"));

app.listen(process.env.PORT || PORT, () => console.log("listening on port " + PORT));