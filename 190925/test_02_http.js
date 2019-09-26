//파일 읽어서 응답처리 하기
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req,res) {

    var filePath = __dirname + '/bg_6.jpg';

   fs.access(filePath, fs.F_OK,function(err){
       
       //파일 데이터를 로드해서 응답처리..
       if(err){
            res.statusCode = 404;
            res.statusMessage = 'File NOT FOUND,,,';
            res.end();
            return;
       }
        
       fs.readFile(filePath, function (err, data) {
           if(err){
               res.statusMessage = 500;
               res.statusMessage = 'reading error,,,,';
               res.end();
               return;
           }
           res.write(data);
           res.end();
       });

   }) ;
//    fs.end('hi','utf-8');
});

server.listen(3000);