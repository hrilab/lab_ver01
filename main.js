var express = require('express');
var app = express();
var ejs = require('ejs');
var session = require('express-session');

app.set("views", __dirname+"/views");
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);
app.use(session({
  secret : "abcde",
  resave : false,
  saveUninitialized : false
}));

var router = require("./router/controller")(app);

var server = app.listen(1234, function() {
  console.log("server ing");
});
