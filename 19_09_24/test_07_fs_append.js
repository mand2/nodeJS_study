var fs = require('fs');

var path = 'textData.txt';

fs.appendFile(path, '\n\n\naddtional Data', function (err) {
    if(err){
        console.error('파일내용추가 실~~~~패~~~~ ', err);
    }
    console.log('파일내용 추가 성~~~~~공~~ㅊㅋㅊㅋ여 ');
});