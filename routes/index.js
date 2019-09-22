var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get('/citysearch', function(req,res){
  // console.log(req.query.city);
  var returnedNames = [];
  var returnedAmts = [];
  var dataPacket = [];
  var citySearch = req.query.city;
  var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: "capstonehmetest2"
  });
    db.query("SELECT DISTINCT _PRVDR_ID_INFO.CITY, _PRVDR_ID_INFO.State, PRVDR_NUM, _PRVDR_ID_INFO.HOSPC14_NAME, _RPT_NMRC.ITM_VAL_NUM FROM _RPT INNER JOIN _PRVDR_ID_INFO ON _RPT.PRVDR_NUM = _PRVDR_ID_INFO.PROVIDER_NUMBER INNER JOIN _RPT_NMRC ON _RPT.RPT_REC_NUM = _RPT_NMRC.RPT_REC_NUM INNER JOIN _RPT_ALPHA ON _RPT.RPT_REC_NUM = _RPT_ALPHA.RPT_REC_NUM WHERE _PRVDR_ID_INFO.City = '"+req.query.city+"' AND _RPT_NMRC.LINE_NUM = 03800 AND _RPT_NMRC.CLMN_NUM = 0070", function (err, result) {
      if (err) throw err;
      // console.log(result[0].CITY);
      dataPacket = result;
        for(i=0; i < result.length; i++){
          returnedNames.push(result[i].HOSPC14_NAME)
          returnedAmts.push(result[i].ITM_VAL_NUM)
        }
      // console.log(returnedNames)
      res.render('index.html', { 
        greet: "ghello", 
        names: returnedNames,
        amts: returnedAmts,
        data: dataPacket

      });
    });

  
});

module.exports = router;
