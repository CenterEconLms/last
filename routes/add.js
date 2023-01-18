const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
var dbConfig = require('../db'); //db연결
var conn = dbConfig.init();
dbConfig.connect(conn);

app.set('view engine', 'pug');
app.set('views',__dirname+'/views');
router.post('/add',function(req,res){
  
    var gage = req.body.gage;
    var adress = req.body.adress;
    var star = req.body.star;
    var sql= 'INSERT IGNORE INTO matjip (name, adress, star) VALUES (?, ?, ?)';
  
    conn.query(sql, [gage, adress, star], function(err, result, field){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server  Error');
      }
      else{
        res.send(`가게이름: ${gage},adress: ${adress},start: ${star}`);
        res.redirect('/matjip');
      };
    }
    );
    
  });
  module.exports = router;