/*
 * @Author: Doduo 
 * @Date: 2017-12-19 21:48:00 
 * @Last Modified by: Doduo
 * @Last Modified time: 2017-12-19 22:10:30
 */
'use strict';
//  CMD的规范定义一个模块
// define(function(require,module,exports){

// 在node中实现的是Commonjs规范
function convert(input) {
    return parseFloat(input);
}

function add(a, b) {
    return convert(a) + convert(b);
}

function subtract(a, b) {
    return convert(a) - convert(b);
}

function multiply(a, b) {
    return convert(a) * convert(b);
}

function divide(a, b) {
    return convert(a) / convert(b);
}

// // 第一种
// exports.add=add;

// // 第二种
// module.exports={
//     add:add,
//     subtract:subtract,
//     multiply:multiply,
//     divide:divide
// };

// 第三种 ES6的语法
module.exports = { add, subtract, multiply, divide };
// })
