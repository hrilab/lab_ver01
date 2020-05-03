var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended : false});
var mysql = require('mysql');
var url = require('url');

var conn_info = {
  host : 'localhost',
  port : 3306,
  user : 'root',
  password: "sh9309in", ///////////// 설정 password 로 바꾸기
  database : "buddhaDB" //////////// DB 이름 바꾸기
};



module.exports = function(app) {
  app.get("/", function(req,res) {
    res.render("intro.html");
  });

  app.get("/intro", function(req,res) {
    res.render("intro.html");
  });

  app.get("/search_category_theme", function(req,res) {

    res.render("search_category_theme.html");
  });

  app.get("/search_category_era", function(req,res) {
    res.render("search_category_era.html");
  });

  app.get("/search_category_area", function(req,res) {
    res.render("search_category_area.html");
  });

  app.get("/result_list", function(req,res) {
    //var word = req.qeury.search_word;
    //console.log(word);
    console.log(req.query.search_word);
    var word=req.query.search_word;
    console.log(word);

    var conn = mysql.createConnection(conn_info);
	    var sql = "select * from DataTable where keyword like '%"+word+"%';";
      console.log(sql);

	    conn.query(sql, function(err,rows) {
	      var render_data = {
	        "rows" : rows
	      };
        console.log(render_data);

        res.render("result_list.html", render_data);
    });
  });

  app.get("/search", function(req,res) {
    var conn = mysql.createConnection(conn_info);
    var sql = "select * from DataTable";

    conn.query(sql, function(err,rows) {
      var render_data = {
        "rows" : rows
      };
      res.render("search.html", render_data);

    });
  });

  app.get("/search_index", function(req,res) {
    res.render("search_index.html");
  })


  app.get("/detailImage", function(req,res) {
    //var q = url.parse(req.url,true);
    //console.log(req.url);
    //console.log(q);

	  var conn = mysql.createConnection(conn_info);
	    var sql = "select * from DataTable";

	    conn.query(sql, function(err,rows) {
	      var render_data = {
	        "rows" : rows
	      };

    res.render("detailImage.html", render_data);
    });
  });

  app.get("/addImage", function(req,res) {
    res.render("addImage.html");
  });

  app.post("/saveImage", urlencodedParser, function(req,res) {


    var file = req.body.input_file;
    var cID = req.body.input_cid;
    var insititution = req.body.input_institution;
    var title = req.body.input_title;
    var area = req.body.input_time;
    var region = req.body.input_area;
    var keyword = req.body.input_keyword;
    var detail = req.body.input_detail;


    var conn= mysql.createConnection(conn_info);
    /*
    var sql = "insert into DataTable (file,cID,insititution,title,picArea,region,keyword,detail) values (?,?,?,?,?,?,?,?)";
    var input_data = [file,cID,insititution,title,area,region,keyword,detail];
    conn.query(sql, input_data, function(error) {
      console.log(error);
      conn.end();
      res.redirect("/");
    });
    */
    var sql = "update DataTable set file = (?) where cID = (?)";
    var input_data = [file,cID];
    conn.query(sql, input_data, function(error) {
      console.log(error);
      conn.end();
      res.redirect("/");
    });

  });



/*
  app.post("/login", urlencodedParser, function(req,res) {
    var user_name = req.body.user_name;

    //세션에 저장
    req.session.user_name = user_name;
    res.redirect("main"); //해당 페이지 요청
  });
  */

};
