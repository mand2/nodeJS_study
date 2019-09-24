//file system 연습
var fs = require('fs');
var file = 'helloWorld.txt'; //file 위치는 같은 루트에 있다,

try {
    //파일존재유무 확인
    fs.accessSync(file, fs.F_OK);
    console.log('파일 존재함');
    //file 읽기
    fs.readFile(file, 'utf-8', function (err, data) {
        if(err){
            console.error('File Read ERROR: ', err);
            return;
        }

        console.log('출력하자규~\n', data);

    });

} catch (err) {
    console.log('파일 존재 안함');
    process.exit(1);
}