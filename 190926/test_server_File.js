//파일업로드 관련

//모듈로드
var http = require('http');
var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');
var pathUtil = require('path');


//data
var movieList = [{
    title:'해리포터와 비밀의방'
    , director : '크리스 콜럼버스'
    , poster: 'images/hp2.jpg'
}];


//images 경로
var imgPath = __dirname +'/images';


var server = http.createServer(function (req,res) {


   
   //METHOD 구분 
    var method = req.method.toLowerCase();
    console.log('method? ' , method );

    var url = req.url;
    if(url == '/' && method == 'get'){
        showList(req,res);


    } else if (url.indexOf('/images/') == 0 && method == 'get'){
        var urlPath = __dirname + url;

        res.writeHeader(200, {'Content-Type':'image/jpg'});
        fs.createReadStream(urlPath).pipe(res);


    } else if(url == '/' && method == 'post'){
        addMovie(req,res);
    }


});


//port setting
server.listen(3000);

//fn_ 리스트출력
function showList (req, res) {
    //header
    res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'});
    
    //body
    res.write('<html>');
        res.write('<meta charset="UTF-8">');
        
        res.write('<body>');
            res.write('<h3>Favorite Movie</h3>');
            
            //list출력
            res.write('<div><ul>');
            movieList.forEach(function(item){
                res.write('<li><img src="'+item.poster+'" height="100px;">' + item.title + ' (' + item.director +') </li>');
            },this);
            res.write('</ul></div>');
        
        
            res.write(
                '<form method="post" enctype="multipart/form-data"><h4>새 영화 입력</h4>' +
                '<div><input type="text" name="title" placeholder="영화제목"></div>' +
                '<div><input type="text" name="director" placeholder="감독"></div>' +
                '<div><input type="file" name="poster"></div>' +
                '<input type="submit" value="upload">' +
                '</form>'
            );
        res.write('</body>');
    res.write('</html>');

    //end
    res.end();
}

//fn_리스트추가
function addMovie(req, res) {
    
    var form = formidable.IncomingForm();
    form.uploadDir = imgPath;

    form.parse(req, function (err, fields, files) {
        
        var title = fields.title;
        var image = files.poster;
        var director = fields.director;
        var date = new Date();


        //이름설정
        var newImgName = 'image_' + date.getHours() + date.getMinutes() + date.getSeconds();

        //확장자설정
        var ext = pathUtil.parse(image.name).ext;

        //이미지 전체 경로 설정
        var newPath = __dirname + pathUtil.sep +'images'+ pathUtil.sep + newImgName + ext;

        //원본이미지의 경로를 새로운 경로로 설정
        fs.renameSync(image.path, newPath);

        //url  설정 (외부에서 보여져야할 경로임)
        var newPosterImgUrl = 'images/' + newImgName + ext;

        //post로 보낼 것
        var movieInfo = {
            title: title
            ,poster: newPosterImgUrl
            ,director: director
        };

        movieList.push(movieInfo);

        res.statusCode = 302;
        res.setHeader('Location', '.');
        res.end('success');

        
    });


}