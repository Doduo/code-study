// 读取文件


const fs = require('fs');
const path = require('path');


// fs.readFile(path.join(__dirname, './../lyrics/恋曲1980 Live.lrc'), (error, data) => {
//   console.log(data);
// });

// 读取文件时没有指定编码默认读取的是一个Buffer(缓冲区)


// // readFile的方式确实是使用buffer,但是也是一次性读取
// fs.readFile(path.join(__dirname, './../README.md'), (error, data) => {
//   console.log(data.toString('utf8'));
// });

// -272323123 <= int32 < 27120832109
// -272323123 <= int16 < 27120832109