//모듈로드
var http = require('http');
var querystring = require('querystring');

//data
var movieList = [{title:'해리포터와 비밀의방', director : '크리스 콜럼버스'}];


var server = http.createServer(function (req,res) {
   
   //METHOD 구분 
    var method = req.method.toLowerCase();
    console.log('method? ' , method );

    if(method == 'post'){
        console.log('::::: post 요청일 때 처리 :::::')
        addMovie(req, res);

    } else {
        console.log('----- get 요청일 때 처리 -----')
        showList(req, res);
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
                res.write('<li>' + item.title + ' (' + item.director +') </li>');
            },this);
            res.write('</ul></div>');
        
        
            res.write(
                '<form method="post"><h4>새 영화 입력</h4>' +
                '<div><input type="text" name="title" placeholder="영화제목"></div>' +
                '<div><input type="text" name="director" placeholder="감독"></div>' +
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
    
    var body = '';
    req.on('data', function (chunk) {
        body += chunk;
        console.log('data 입력 중,,', body);
    });

    req.on('end', function () {
        var data = querystring.parse(body);
        console.log('parsed? :: ' , data);
        var title = data.title;
        var director = data.director;

        movieList.push({title:title, director:director});

        res.statusCode = 302;
        res.setHeader('Location', '.');
        res.end('success');
    });
}