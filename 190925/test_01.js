var url =require('url');

var urlStr = 'http://idols.com/q?group=EXID&name=하니&since=';

var parsed = url.parse(urlStr);


//url 전체 정보 보여줌
console.log(parsed);

//url의 호스트만
console.log(parsed.host);

//url의 패스만
console.log(parsed.path);