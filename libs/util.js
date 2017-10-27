'use strict'

var fs=require("fs");
var Promise=require("bluebird");

exports.readFileAsync=function(fpath,encoding){
   return new Promise(function(resovle,reject){
		// 异步读取
		fs.readFile(fpath,encoding,function (err, data) {
		   if (err) {
		        console.log(err);
		        reject(err);
		   }else{
		   	 console.log("异步读取: " + data.toString());
		   	 resovle(data.toString());
		   }
		});
   })
}
exports.writeFileAsync=function(fpath,content){
	return new Promise(function(resovle,reject){
		fs.writeFile(fpath,content,function(err) {
		   if (err) {
		       console.log(err);
		       reject(err);
		   }else{
               console.log("数据写入成功！");
               resovle(content);
		   }
		   
		});
	})
}