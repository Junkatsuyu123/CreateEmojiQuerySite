

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

app.use(express.static(__dirname + '/docs'));
//app.use( express.static('https://junkatsuyu123.github.io/CreateEmojiQuerySite' + '/docs' ) );
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
                var text = fs.readFileSync(__dirname+"/docs/Query/insert.txt", 'utf8' , (err) => {
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
                    //file_name = __dirname + "/CreateQuery/" + "query_insert_" + f_name + ".txt";
                    file_name = __dirname + "/docs/CreateQuery/" + "query_insert_" + f_name + ".txt";
                    console.log(text);
                    if (fs.existsSync( file_name )) {
                        fs.appendFile(file_name, text,  'utf-8',(err) => {
                            if (err) throw err;
                            console.log('??????????????????????????????????????????');
                        });
                    }
                    else {
                        fs.writeFile(file_name, text, 'utf-8',(err) => {
                            if (err) throw err;
                            flag = true;
                            console.log('??????????????????????????????????????????');
                        });
                    }
                }
                fs.stat(file_name, (error, stats) => {
                    if (error) {
                      if (error.code === 'ENOENT') {
                        console.log('?????????????????????????????????????????????????????????');
                      } else {
                        console.log(error);
                      }
                    } else {
                        console.log('??????????????????????????????????????????????????????');
                        response.download(file_name);
                    }
                });
                /*fs.stat(file_name, (error, stats) => {
                    if (error) {
                      if (error.code === 'ENOENT') {
                        console.log('?????????????????????????????????????????????????????????');
                      } else {
                        console.log(error);
                      }
                    } else {
                        console.log('??????????????????????????????????????????????????????');
                        response.download(file_name);
                        fs.unlink(file_name, (err) => {
                            if (err) throw err;
                            console.log('?????????????????????');
                        });
                    }
                  });*/
                /*if (fs.existsSync(file_name)) {
                    console.log(file_name);
                    response.download(file_name);
                }*/
            }
        })
        request.on('end', function () {
            //response.sendFile(__dirname + '/docs/index.html');
            response.writeHead(303, { 'Location': '/' }); // index????????????303??????????????????
            if (file_name != '') {
                fs.stat(file_name, (error, stats) => {
                    fs.unlink(file_name, (err) => {
                        if (err) throw err;
                        console.log('?????????????????????');
                    });
                    file_name = "";
                });
            }
        })
      }
});
//server.listen(8080);