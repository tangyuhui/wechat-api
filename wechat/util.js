var Promise=require('bluebird');
var xml2js = require('xml2js');
function parseXMLAsync(xml){
    return new Promise(function (resolve, reject) {
        xml2js.parseString(xml, {trim: true,explicitArray : false}, function (err, content) {
            console.log(content);
            err ? reject(err) : resolve(content);
        })
    });
}
function formatMessage(content){

}
exports.parseXMLAsync = parseXMLAsync;