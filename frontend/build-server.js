/**
 * Created by zhaowei on 16/8/1.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var proxyMiddleWare = require("http-proxy-middleware");

var proxyPath = "http://etl-server-ip:18083";//目标后端服务地址(公司同事电脑地址)
var proxyPath1 = "http://idmanager-server-ip:9000";//老版本地址
var app = express();

var proxyOption ={target:proxyPath,changeOrigoin:true};
var proxyOption1 ={target:proxyPath1,changeOrigoin:true};

app.set('port', (process.env.PORT || 8991));
app.use(express.static(path.join(__dirname, 'dist')));
app.use("/v1", proxyMiddleWare(proxyOption));
app.use("/rest", proxyMiddleWare(proxyOption1));
app.get('*', function (req, res) {
  res.render('index.html', {})
});

app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
