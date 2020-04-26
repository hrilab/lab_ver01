var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended : false});
var mysql = require('mysql');

var conn_info = {
  host : 'localhost',
  port : 3306,
  user : 'root',
  password: 'sh9309in',
  database : "VisitorBookDB"
};

module.exports = function(app) {
  app.get("/", function(req,res) {
    res.render("index.ejs");
  });

  app.post("/login", urlencodedParser, function(req,res) {
    var user_name = req.body.user_name;

    //세션에 저장
    req.session.user_name = user_name;
    res.redirect("main"); //해당 페이지 요청
  });

  app.get("/main", function(req,res) {
    var conn = mysql.createConnection(conn_info);
    var sql = "select vBook_name, vBook_content from VisitorBookTable order by vBook_idx desc";

    conn.query(sql, function(error, rows) {
        var render_data = {
          "rows" : rows
        };
        res.render("main.ejs", render_data);
    });

  });

  app.post("/save_visitorbook", urlencodedParser, function(req,res) {
    var user_name = req.session.user_name;
    var content = req.body.content;

    console.log(user_name, content);

    var conn= mysql.createConnection(conn_info);
    var sql = "insert into VisitorBookTable (vBook_name, vBook_content) values (?, ?)";

    var input_data = [user_name, content];
    conn.query(sql, input_data, function(error) {
      console.log(error);
      conn.end();
      res.redirect("main");
    });

  });
};
