var express = require('express');
var router = express.Router();
var mysql = require('mysql');


router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/citysearch', function(req,res){
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
      dataPacket = result;
      res.render('index.html', { 
        data: dataPacket

      });
    });
});

router.get('/statesearch', function(req,res){
  var dataPacket = [];
  var stateSearch = req.query.state;
  var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: "capstonehmetest2"
  });
    db.query("SELECT DISTINCT _PRVDR_ID_INFO.CITY, _PRVDR_ID_INFO.State, PRVDR_NUM, _PRVDR_ID_INFO.HOSPC14_NAME, _RPT_NMRC.ITM_VAL_NUM FROM _RPT INNER JOIN _PRVDR_ID_INFO ON _RPT.PRVDR_NUM = _PRVDR_ID_INFO.PROVIDER_NUMBER INNER JOIN _RPT_NMRC ON _RPT.RPT_REC_NUM = _RPT_NMRC.RPT_REC_NUM INNER JOIN _RPT_ALPHA ON _RPT.RPT_REC_NUM = _RPT_ALPHA.RPT_REC_NUM WHERE _PRVDR_ID_INFO.State = '"+req.query.state+"' AND _RPT_NMRC.LINE_NUM = 03800 AND _RPT_NMRC.CLMN_NUM = 0070 ORDER BY _PRVDR_ID_INFO.CITY", function (err, result) {
      if (err) throw err;
      dataPacket = result;
      res.render('index.html', { 
        data: dataPacket

      });
    });
});

router.get('/providersearch', function(req,res){
  var dataPacket = [];
  var providerSearch = req.query.provider;
  var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: "capstonehmetest2"
  });
    db.query("SELECT DISTINCT _PRVDR_ID_INFO.CITY, _PRVDR_ID_INFO.State, PRVDR_NUM, _PRVDR_ID_INFO.HOSPC14_NAME, _RPT_NMRC.ITM_VAL_NUM FROM _RPT INNER JOIN _PRVDR_ID_INFO ON _RPT.PRVDR_NUM = _PRVDR_ID_INFO.PROVIDER_NUMBER INNER JOIN _RPT_NMRC ON _RPT.RPT_REC_NUM = _RPT_NMRC.RPT_REC_NUM INNER JOIN _RPT_ALPHA ON _RPT.RPT_REC_NUM = _RPT_ALPHA.RPT_REC_NUM WHERE PRVDR_NUM = '"+req.query.provider+"' AND _RPT_NMRC.LINE_NUM = 03800 AND _RPT_NMRC.CLMN_NUM = 0070 ORDER BY _PRVDR_ID_INFO.CITY", function (err, result) {
      if (err) throw err;
      dataPacket = result;
      res.render('index.html', { 
        data: dataPacket

      });
    });
});

router.get('/namesearch', function(req,res){
  var dataPacket = [];
  var nameSearch = req.query.name;
  var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: "capstonehmetest2"
  });
    db.query("SELECT DISTINCT _PRVDR_ID_INFO.CITY, _PRVDR_ID_INFO.State, PRVDR_NUM, _PRVDR_ID_INFO.HOSPC14_NAME, _RPT_NMRC.ITM_VAL_NUM FROM _RPT INNER JOIN _PRVDR_ID_INFO ON _RPT.PRVDR_NUM = _PRVDR_ID_INFO.PROVIDER_NUMBER INNER JOIN _RPT_NMRC ON _RPT.RPT_REC_NUM = _RPT_NMRC.RPT_REC_NUM INNER JOIN _RPT_ALPHA ON _RPT.RPT_REC_NUM = _RPT_ALPHA.RPT_REC_NUM WHERE _PRVDR_ID_INFO.HOSPC14_NAME = '"+req.query.name+"' AND _RPT_NMRC.LINE_NUM = 03800 AND _RPT_NMRC.CLMN_NUM = 0070 ORDER BY _PRVDR_ID_INFO.CITY", function (err, result) {
      if (err) throw err;
      dataPacket = result;
      res.render('index.html', { 
        data: dataPacket

      });
    });
});

module.exports = router;
