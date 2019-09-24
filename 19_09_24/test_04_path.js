//path 테스트
var pathUtil = require('path');
var path = 'D:/bootstrap/ecoland-master/ecoland-master/images/bg_6.jpg';


console.log('\n전체 경로::', path, '\n');
console.log('dirname :  ', pathUtil.dirname(path));
console.log('basename:  ', pathUtil.basename(path));
console.log('extname :  ', pathUtil.extname(path));