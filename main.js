const http = require("http");
const fs = require("fs");
require("date-utils");
const path = require("path");
const DAYS_MSEC = 86400000;
const HOUR_MSEC = 3600000;
const MINUTE_MSEC = 60000;
const SECOND_MSEC = 1000;

const TXT = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');

const URL = __dirname + '/docs/index.html';

var html = fs.readFileSync(URL);
var express = require('express');
var app = express()
app.use(express.static(path.join(__dirname,'/docs')));
var port = process.env.PORT || 8080;
app.listen(port);
const axios = require('axios').default;
var data;
app.get('/create', async (req, res)=>{
  try {
    const response = await axios.post('/');
    var file_name = '';
    var user_id = req.query.UserID;
    var num = req.query.EmojiNum;
    if (user_id == '' || num == '') {
      res.sendFile(URL);
    }
    else {
      var IDList = new Array();
      var text = fs.readFileSync(__dirname+"/docs/Query/insert.txt", 'utf8' , (err) => {
          if (err) {
              console.log(err.stack);
          }
          else {
              console.log('Done.');
          }
      })
      var flag = false;
      for (let i = 0; i < Number(num); i++) {
          var tmp = text;
          const current_date = new Date();
          const old_date = new Date(2000, 1, 1, 9, 0, 0);
          var date = (current_date - old_date).toString(36).padStart(8, '0') + TXT[Math.floor(Math.random() * TXT.length)] + TXT[Math.floor(Math.random() * TXT.length)];
          while (IDList.includes(date)) {
            date = (current_date - old_date).toString(36).padStart(8, '0') + TXT[Math.floor(Math.random() * TXT.length)] + TXT[Math.floor(Math.random() * TXT.length)];
          }
          var f_name;
          if (i == 0) {
            f_name = user_id + '_' + date;
          }
          tmp = tmp.replace("{USERNAME}", user_id);
          tmp = tmp.replace("{ID}", date);
          file_name = __dirname + "/docs/CreateQuery/" + "query_insert_" + f_name + ".txt";

          if (fs.existsSync(file_name) || flag) {
            fs.appendFile(file_name, tmp, 'utf-8', (err) => {
              if (err) throw err;
              console.log('正常に書き込みが完了しました');
            });
          }
          else {
            fs.writeFile(file_name, tmp, 'utf-8', (err) => {
              if (err) throw err;
              console.log('正常に書き込みが完了しました');
            });
            flag = true;
          }
          IDList.push(date);
      } 
      fs.stat(file_name, (error, stats) => {
        if (error) {
          if (error.code === 'ENOENT') {
            console.log('ファイル・ディレクトリは存在しません。');
          } else {
            console.log(error);
          }
        } else {
            console.log('ファイル・ディレクトリは存在します。');
            res.download(file_name);
        }
    });
      }
      
    req.on('end', function () {
      if (file_name != '') {
          fs.stat(file_name, (error, stats) => {
              fs.unlink(file_name, (err) => {
                  if (err) throw err;
                  console.log('削除しました。');
              });
              file_name = "";
          });
      }
    })
  }
  catch (error) {
    console.log(error);
  }
})