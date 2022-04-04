require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const hbs = require("hbs");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const { database } = require("./keys");

const app = express();

//settings
app.set("port", process.env.PORT || 4000);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.set("view options", { layout: "./layouts/main.hbs" });
hbs.registerPartials(path.join(__dirname, "/views/partials"), function (err) {
  if (err) {
    console.log(err);
  }
});

//middlewares
app.use(
  session({
    secret: "palabrasecreta",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());

//global variables
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  next();
});

//routes
app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use("/links", require("./routes/links"));

//public routes
app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
  console.log("listening on port", app.get("port"));
});
