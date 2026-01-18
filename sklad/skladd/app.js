require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const session = require("express-session");

const connectDB = require('../skladd/config/db')
connectDB();

const app = express();


app.use(session({
    secret: "tajny_klic",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 // 1 hodina
    }
}));


app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/dashboard", productRoutes);

const authRoutes = require("./routes/authRoutes");
app.use(authRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use(adminRoutes);


app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

app.use((req, res, next) => {
    console.log(`${req.method} požadavek na: ${req.url}`);
    next();
});

app.listen(3000, () => {
    console.log("Server běží na http://localhost:3000");
});
