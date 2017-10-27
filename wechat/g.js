'use strict'
 
var sha1 = require('sha1');
var Wechat= require('./wechat');
var getRawBody = require('raw-body');
var util = require('./util');

module.exports=function(opts){
   var wechat = new Wechat(opts);
 return async function(ctx,next){
	var token = opts.token;
	var signature = ctx.query.signature;
	var nonce = ctx.query.nonce;
	var timestamp = ctx.query.timestamp;
	var echostr = ctx.query.echostr;
	var str = [token,timestamp,nonce].sort().join('');
	var sha=sha1(str);
    if(ctx.method=="GET"){
        if(sha===signature){
            ctx.body=echostr+"";
            return true;
        }else{
            ctx.body="wrong";
            return false;
        }
    }else if(ctx.method == "POST"){
        if(sha!==signature){
           return false ;
        }else{
            var data = await getRawBody(ctx.req, {
                length: ctx.request.headers['content-length'],
                limit: '1mb',
                encoding:ctx.request.charset
            })
            try{
                console.log(data.toString());
                var xmlObject = await util.parseXMLAsync(data.toString());
                var content = xmlObject.xml;

                await next();
            }
            catch(e){
                console.log(e);
            }

        }
    }

   }
}
 