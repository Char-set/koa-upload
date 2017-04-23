/*专为其他App提供后端服务，如文件存储服务（qiniu）
 */
var _app = global._app = {};
_app.hostPort = 8000;

//外部库引入
var $http = global.$http = require('http');
var $fs = global.$fs = require('fs');
var $path = global.$path = require('path');
var $co = global.$co = require('co');
var $koa = global.$koa = require('koa');
var $router = global.$router = require('koa-router');
var $bodyParser = global.$bodyParser = require('koa-better-body');


global._cfg = require('./my_modules/cfg.js');
global._fns = require('./my_modules/fns.js');
global._rotr = require('./my_modules/rotr.js');


//服务器对象
var koaSvr = _app.koaSvr = $koa();
var httpSvr = _app.httpSvr = $http.createServer(koaSvr.callback());


(function () {
	_app.httpSvr.listen(_app.hostPort);
	__infohdlr('Server is running on:' + _app.hostPort + '!');
})();

//使用body解析器
koaSvr.use($bodyParser({
	onerror: function (err, ctx) {
		ctx.request.body = undefined;
		__errhdlr(err);
	}
}));

//http请求的路由控制
koaSvr.use(_rotr.routes());
koaSvr.use(require('koa-static')('www'));