
var _rotr = {};

//http请求的路由控制
_rotr = new $router();

_rotr.post('/api/uploading',function (ctx, next) {
	var ctx = this;
	console.log('111')
	var co = $co(function* () {
		
		console.info(">",ctx.query);
		console.info(">>",ctx.request);
		console.info(">>",ctx.request.files);


		var files = ctx.request.files; 
		if(files.length>0){  
				for(var item in files){  
						var tmpath = files[item]['path'];  
						var tmparr = files[item]['name'].split('.');  
						var ext = '.' + tmparr[tmparr.length-1];  
						var newpath = $path.join('www/upload', parseInt(Math.random()*100) + Date.parse(new Date()).toString() + ext);  
						console.log(tmpath);  
						console.log(newpath);  
						var stream = $fs.createWriteStream(newpath);//创建一个可写流  
						$fs.createReadStream(tmpath).pipe(stream);//可读流通过管道写入可写流  
				}  
		}

		ctx.body = __newMsg(1, 'ok');
		return ctx;
	});
	return co;
})





//导出模块
module.exports = _rotr;
