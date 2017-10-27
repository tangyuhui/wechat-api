/**
 * Created by tangyuhui on 2017/10/27.
 */

var path=require('path');
var util=require('../libs/util');
var wechat_file=path.join(__dirname,"./config/wechat.txt");
var config={
    wechat:{
        appID:'wx1cfe3ea3f57b7e9e',
        appsecret:'d077d6dc22580a987d4287e11732d68e',
        token:'qURuy1445843718000',
        getAccessToken:function(){
            return  util.readFileAsync(wechat_file);
        },
        saveAccessToken:function(data){
            data = JSON.stringify(data);
            util.writeFileAsync(wechat_file,data);
        }
    }
}
module.exports=config;