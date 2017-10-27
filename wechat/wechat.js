'use strict'

var prefix="https://api.weixin.qq.com/cgi-bin";
var Promise=require('bluebird');
var request = require('request');
var rp = require('request-promise');

var api={
    accessToken:prefix+"/token?grant_type=client_credential"
}
function Wechat(opts){
    var that=this;
    this.appID=opts.appID;
    this.appSecret=opts.appsecret;
    this.getAccessToken=opts.getAccessToken;
    this.saveAccessToken=opts.saveAccessToken;

    this.getAccessToken().then(function(data)
    {
        try{
            data=JSON.parse(data);
        }catch(e){
            return that.updateAccessToken(data);
        }
        //检测acessToken是否合法
        if(that.isValidAcessToken(data)){
            return data;
        }else{
            return that.updateAccessToken(data);
        }

    }).then(function(data){
        console.log(data);
        that.accessToken = data.access_token;
        that.expiresIn=data.expires_in;
        that.saveAccessToken(data);
    });
    //测试接口
    //this.updateAccessToken();

}

Wechat.prototype.isValidAcessToken=function(data){
    console.log("isValidAcessToken");
    var now = new Date();
    if(!data||!data.access_token||!data.expires_in|| now.getTime()>this.expires_in){
        return false;
    }else{
        return true;
    }
}
/*
 *https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1cfe3ea3f57b7e9e&secret=d077d6dc22580a987d4287e11732d68e
 *请求access_token
 */
Wechat.prototype.updateAccessToken=function(){
    var appid = this.appID;
    var secret=this.appSecret;
    var url=api.accessToken+"&appid="+appid+"&secret="+secret;
    return new Promise(function(resovle,reject){
        console.log("url"+url);
        rp({"url":url,json:true,simple:false}).then(function(response){
            //{"access_token":"ACCESS_TOKEN","expires_in":7200}
            var date= new Date();
            response.expires_in=date.getTime()+((response.expires_in+20)*1000);
            console.log(response);
            resovle(response);
        }).catch( function(err) {
            console.log("err"+err);
            reject(err);
        });
    })
}
module.exports=Wechat