const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");

require("dotenv").config();

const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.get("/", (req, res) => {
    res.send("hey from root");
})


try {
    app.listen(3000, () => {
        console.log("server started")
    });
}
catch (err) {
    console.log(err.message)
}
