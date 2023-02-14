

const http = require("http");
const server = http.createServer();
const fs = require("fs");
const { encode } = require("punycode");
var html = require('fs').readFileSync('index.html');
require('date-utils');
const DAYS_MSEC = 86400000;
const HOUR_MSEC = 3600000;
const MINUTE_MSEC = 60000;
const SECOND_MSEC = 1000;

const TXT = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');

server.on("request", function (request, response) {
    fs.readFile("index.html", "utf-8",
        ( error , content ) => {
               response.writeHead(200, { "Content-Type": "text/html" });
               response.write( content );
            response.end();
            if (request.method === 'POST') {
                var data = '';
                request.on('data', function (chunk) {
                    if (chunk != null) {
                        var IDList = new Array();
                        data += chunk
                        var name = data.split('&')[0].split('=')[1];
                        var num = data.split('&')[1].split('=')[1];
                        fs.copyFile("./Query/insert.txt", 'query_insert.txt', (err) => {
                            if (err) {
                                console.log(err.stack);
                            }
                            else {
                                console.log('Done.');
                            }
                        });
                        var text = fs.readFileSync("query_insert.txt", 'utf8' , (err) => {
                            if (err) {
                                console.log(err.stack);
                            }
                            else {
                                console.log('Done.');
                            }
                        })
                        for (let i = 0; i < Number(num); i++){
                            const current_date = new Date();
                            const old_date = new Date(2000, 1, 1, 9, 0, 0);
                            var date = (current_date - old_date).toString(36).padStart(8, '0') + TXT[Math.floor(Math.random() * TXT.length)] + TXT[Math.floor(Math.random() * TXT.length)];
                            while (IDList.includes(date)) {
                                date = (current_date - old_date).toString(36).padStart(8, '0') + TXT[Math.floor(Math.random() * TXT.length)] + TXT[Math.floor(Math.random() * TXT.length)];
                            }
                            text = text.replace("{USERNAME}", name);
                            text = text.replace("{ID}",date);
                            var file_name = "./CreateQuery/" + "query_insert_" + name + ".txt";
                            alert("今から書き込みます");
                            fs.writeFile(file_name, text, (err) => {
                                if (err) throw err;
                                console.log('正常に書き込みが完了しました');
                            });
                        }
                    }
                })
                    .on('end', function () {
                  response.end(html);
                  })
              }
        });        
});
server.listen(3000);