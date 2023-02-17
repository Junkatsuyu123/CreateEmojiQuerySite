

const http = require("http");
//const server = http.createServer();
const fs = require("fs");
//var html = fs.readFileSync('./index.html');
require("date-utils");
const DAYS_MSEC = 86400000;
const HOUR_MSEC = 3600000;
const MINUTE_MSEC = 60000;
const SECOND_MSEC = 1000;

const TXT = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');


var express = require("express");
var app = express();

//app.use( express.static(  __dirname + '/docs' ) );

app.use( express.static('https://junkatsuyu123.github.io/CreateEmojiQuerySite' + '/docs' ) );

var port = process.env.PORT || 8080;
app.listen( port );
console.log("server starting on " + port + " ...");

app.post("/", function (request, response) {
    if (request.method === 'POST') {
        var file_name = '';
        var data = '';
        request.on('data', function (chunk) {
            if (chunk != null) {
                var IDList = new Array();
                data += chunk
                var name = data.split('&')[0].split('=')[1];
                var num = data.split('&')[1].split('=')[1];
                //fs.copyFile(__dirname+'/docs'+"/Query/insert.txt", 'query_insert.txt', (err) => {
                /*fs.copyFile('https://junkatsuyu123.github.io/CreateEmojiQuerySite/'+"Query/insert.txt", 'query_insert.txt', (err) => {
                    if (err) {
                        console.log(err.stack);
                    }
                    else {
                        console.log('Done.');
                    }
                });*/
                //var text = fs.readFileSync(__dirname+"\\query_insert.txt", 'utf8' , (err) => {
                //var text = fs.readFileSync('https://junkatsuyu123.github.io/CreateEmojiQuerySite/'+"query_insert.txt", 'utf8' , (err) => {
                
            }
        })
            .on('end', function () {
               /* if (fs.existsSync(file_name)) {
                    response.download(file_name);
                }*/
                //return response.sendFile(__dirname + '/docs' + "/index.html");
                return response.sendFile('https://junkatsuyu123.github.io/CreateEmojiQuerySite/index.html');
          })
      }
});
//server.listen(8080);