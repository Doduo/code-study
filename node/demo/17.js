// 以流的方式读取文件

const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

var filename = path.join(__dirname, './lrc/爱的代价.lrc');

var streamReader = fs.createReadStream(filename).pipe(iconv.decodeStream('gbk'));

var data = '';
streamReader.on('data', (chunk) => {
    // chunk只是文档的一个片段，不完整
    data += chunk.toString();
});

streamReader.on('end', () => {
    // 通知你已经结束了 此时data是完整的
    console.log(data);
})
