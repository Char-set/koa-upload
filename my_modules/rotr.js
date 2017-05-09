
var _rotr = {};

//http请求的路由控制
_rotr = new $router();

_rotr.post('/api/uploading',function (ctx, next) {
	var ctx = this;
	var co = $co(function* () {
		console.info(">",ctx.query);
		console.info(">>",ctx.request);
		console.info(">>",ctx.request.files);
		var files = ctx.request.files; //获取上传的文件，数组
		if(files.length>0){  
			for(var item in files){  
				var tmpath = files[item]['path'];  //获取文件暂存的路径
				var tmparr = files[item]['name'].split('.');  //获取文件的名称
				var ext = '.' + tmparr[tmparr.length-1];  //获取文件的类型
				//用随机数加上当前时间戳，生成新的文件名称，存放在www/upload目录下
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
