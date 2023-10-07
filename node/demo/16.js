// 动态显示歌词

// nrm -- NPM registry管理工具
// iconv-lite -- 各系统间不同编码的转换  node 默认不支持gbk格式

// 该方法比较麻烦 可以参考18.js文件的方法（readline模块）

const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

fs.readFile(path.join(__dirname, './lrc/爱的代价.lrc'), (error, data) => {
    var lines = iconv.decode(data, 'gbk').split('\n');

    // var regex='[00:54.777]人总要学着自己长大'
    var regex = /\[(\d{2})\:(\d{2})\.(\d{3})\](.+)/;

    var begin = new Date().getTime();

    // 遍历
    lines.forEach((line => {
        var matches = regex.exec(line);
        if (matches) {
            var m = parseFloat(matches[1]);
            var s = parseFloat(matches[2]);
            var f = parseFloat(matches[3]);
            var lyric = matches[4];

            // 由于下达输出任务的时刻不同
            var offset = new Date().getTime() - begin;

            // 当前歌词不是立即执行
            setTimeout(() => {
                console.log(lyric);
            }, m * 60 * 1000 + s * 1000 + f - offset);
        } else {
            // 不是一行歌词
            console.log(line);
        }
    }))
});