// readline 动态显示歌词

const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
const readline = require('readline');

var filename = path.join(__dirname, './lrc/爱的代价.lrc');

var streamReader = fs.createReadStream(filename)
                    .pipe(iconv.decodeStream('gbk'));

// 利用readline读取
var rl = readline.createInterface({ input: streamReader });

var begin = new Date().getTime();
rl.on('line', (line) => {
    task(line, begin);
});

var regex = /\[(\d{2})\:(\d{2})\.(\d{3})\](.+)/;
function task(line, begin) {
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
}