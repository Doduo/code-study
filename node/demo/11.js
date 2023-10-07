// 模块加载机制

// 加载顺序

// 此时文件按 JS 文件执行
// require('./module');

// 此时文件按 JS 文件执行
// require('./module.js');

// 此时文件按 JSON 文件解析
// require('./module.json'); 

// 此时文件预编译好的 C++ 模块执行
// require('./module.node');

// 载入目录module目录中的 package.json 中main指向的文件 默认指向index.js
// require('./module/default.js');

// 通过 ./ 或 ../ 开头：则按照相对路径从当前文件所在文件夹开始寻找模块；
// require('../file.js'); => 上级目录下找 file.js 文件

// 通过 / 开头：则以系统根目录开始寻找模块；
// require('C:/Users/iceStone/Documents/file.js'); => 以绝对路径的方式找

// 如果参数字符串不以“./“ 或 ”/“ 开头，则表示加载的是一个默认提供的核心模块（位于 Node 的系统安装目录中）：
// require('fs'); => 加载核心模块中的文件系统模块

// 或者从当前目录向上搜索 node_modules 目录中的文件：
// require('my_module'); => 各级 node_modules 文件夹中搜索 my_module.js 文件；

// 如果 require 传入的是一个目录的路径，会自动查看该目录的 package.json 文件，然后加载 main 字段指定的入口文件
// 如果package.json文件没有main字段，或者根本就没有package.json文件，则默认找目录下的 index.js 文件作为模块：
// require('./calcuator'); => 当前目录下找 calculator 目录中的 index.js 文件
