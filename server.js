const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const addRouter = require("./routes/add");
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/add", addRouter);
var dbConfig = require(__dirname + "/db.js"); //db연결
var conn = dbConfig.init();
dbConfig.connect(conn);
app.set("ejs", ejs.renderFile);
app.set("view engine", "pug");
app.use(express.static('views'));

app.listen(8080, function () {
  console.log("listening 8080");
});

/*app.get('/matjip',function(요청,응답){
    응답.sendFile(__dirname + '/view/index.html')
});*/
app.get("/matjip", function (req, res) {
  conn.query(
    "select * from matjip order by star desc",
    function (err, results) {
      if (err) {
        throw err;
      } else {
        res.render("index.ejs", { content: results });
      }
    }
  );
});

app.post("/add", function (req, res) {
  var gage = req.body.gage;
  var adress = req.body.adress;
  var star = req.body.star;
  var sql = "INSERT IGNORE INTO matjip (name, adress, star) VALUES (?, ?, ?)";

  conn.query(sql, [gage, adress, star], function (err, result, field) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server  Error");
    } else {
      //res.send(`가게이름: ${gage},adress: ${adress},start: ${star}`);
      res.redirect("/matjip");
    }
  });
});
