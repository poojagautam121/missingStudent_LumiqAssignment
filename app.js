var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//dot engine
var engine = require("express-dot-engine");

var indexRouter = require("./routes/index");

// db
var config = require("./config/config");
var dbConnection = require("./db/connection");

var app = express();

// view engine setup
app.engine("dot", engine.__express);
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "dot");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// doT settings
engine.settings.dot = {
  evaluate: /\[\[([\s\S]+?)\]\]/g,
  interpolate: /\[\[=([\s\S]+?)\]\]/g,
  encode: /\[\[!([\s\S]+?)\]\]/g,
  use: /\[\[#([\s\S]+?)\]\]/g,
  define: /\[\[##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\]\]/g,
  conditional: /\[\[\?(\?)?\s*([\s\S]*?)\s*\]\]/g,
  iterate: /\[\[~\s*(?:\]\]|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\]\])/g,
  varname: "layout, partial, locals, model",
  strip: false,
  append: true,
  selfcontained: false,
};

//db connection
// set our application port
app.listen(config.port);
dbConnection.manageDatabase();

module.exports = app;
