import { log } from 'util';


// 自己写一个require函数
'use strict';
function $require(id) {
    // 1.先找到文件 如果文件不存在 Cannot find module './module/xxx.js'
    // 2.读取文件内容 内容是JS代码
    const fs = require('fs');
    const path = require('path');

    // 要加载的JS文件路径（完整路径）
    const filename = path.join(__dirname, id);
    const dirname = path.dirname(filename);
    /*
    const dirname=path.dirname('G:\doduo_code\node\nodejsStudy\10.js');//G:\doduo_code\node\nodejsStudy  取文件目录
    const basename=path.basename('G:\doduo_code\node\nodejsStudy\10.js');//10.js  取文件名
    const basename=path.basename('G:\doduo_code\node\nodejsStudy\10.js','.js');//10  取文件名（不含扩展名）
    */
    let code = fs.readFileSync(filename, 'utf8');
    // 3.执行代码，所要执行的代码 需要营造一个私有空间
    let module = { id: filename, exports: {} };
    let exports = module.exports;
    code = `
    (function($require,module,exports,__dirname,__filename){
        ${code}
    })($require,module,exports,dirname,filename);
    `;

    eval(code);
    // 4.返回值
    return module.exports;
}

var m4=$require('./module/module4.js');
m4.say('heee');
