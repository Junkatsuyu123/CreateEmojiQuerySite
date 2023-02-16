

const http = require("http");
//const server = http.createServer();
const fs = require("fs");
const { encode } = require("punycode");
var html = require('fs').readFileSync('./doc/index.html');
require('date-utils');
const DAYS_MSEC = 86400000;
const HOUR_MSEC = 3600000;
const MINUTE_MSEC = 60000;
const SECOND_MSEC = 1000;

const TXT = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');


var express = require('express');
var app = express();

app.use( express.static( __dirname) );

var port = process.env.PORT || 8080;
app.listen( port );
console.log("server starting on " + port + " ...");

app.post("/", function (request, response, next) {
    if (request.method === 'POST') {
        var file_name = '';
        var data = '';
        request.on('data', function (chunk) {
            if (chunk != null) {
                var IDList = new Array();
                data += chunk
                var name = data.split('&')[0].split('=')[1];
                var num = data.split('&')[1].split('=')[1];
                fs.copyFile(__dirname+"./doc/Query/insert.txt", 'query_insert.txt', (err) => {
                    if (err) {
                        console.log(err.stack);
                    }
                    else {
                        console.log('Done.');
                    }
                });
                var text = fs.readFileSync(__dirname+"/query_insert.txt", 'utf8' , (err) => {
                    if (err) {
                        console.log(err.stack);
                    }
                    else {
                        console.log('Done.');
                    }
                })
                var flag = false;
                for (let i = 0; i < Number(num); i++){
                    const current_date = new Date();
                    const old_date = new Date(2000, 1, 1, 9, 0, 0);
                    var date = (current_date - old_date).toString(36).padStart(8, '0') + TXT[Math.floor(Math.random() * TXT.length)] + TXT[Math.floor(Math.random() * TXT.length)];
                    while (IDList.includes(date)) {
                        date = (current_date - old_date).toString(36).padStart(8, '0') + TXT[Math.floor(Math.random() * TXT.length)] + TXT[Math.floor(Math.random() * TXT.length)];
                    }
                    var f_name;
                    if (i == 0) {
                        f_name = name + '_'+ date;
                    }
                    text = text.replace("{USERNAME}", name);
                    text = text.replace("{ID}",date);
                    file_name =__dirname+"/CreateQuery/" + "query_insert_" + f_name + ".txt";
                   // alert("今から書き込みます");
                    if (fs.existsSync( file_name )) {
                        fs.appendFile(file_name, text,  'utf-8',(err) => {
                            if (err) throw err;
                            console.log('正常に書き込みが完了しました');
                        });
                    }
                    else {
                        fs.writeFile(file_name, text, 'utf-8',(err) => {
                            if (err) throw err;
                            flag = true;
                            console.log('正常に書き込みが完了しました');
                        });
                    }
                    
                }
            }
        })
            .on('end', function () {
                if (fs.existsSync(file_name)) {
                    response.download(file_name);
                }
          //return response.sendFile(__dirname+"/index.html");
          })
      }
});
//server.listen(8080);