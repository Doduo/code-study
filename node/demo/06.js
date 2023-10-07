/*
 * @Author: Doduo 
 * @Date: 2017-12-19 21:57:02 
 * @Last Modified by: Doduo
 * @Last Modified time: 2017-12-19 22:16:20
 */
'use strict';
// 实现命令行计算器
// 1.接收参数
const args = process.argv.slice(2);
// ['node 执行程序所在的路径','当前脚本所在的路径','参数1','参数2',...]

// 2.分析参数
// P1 OP P2
if (args.length !== 3) {
    console.log('参数不合法');
    throw new Error('参数不合法');
}
let parameter1 = args[0];
let operator = args[1];
let parameter2 = args[2];

// 3.进行运算（引用模块方式）
const calc = require('./module/calculator.js');

/*
    引用模块主要有三种方式
    1.自己定义的
    const calc = require('./module/calculator.js');
    2.node自带的
    const fs=require('fs');
    3.npm安装的
    const mysql=require('mysql');
 */
let result;
switch (operator) {
    case '+':
        result = calc.add(parameter1, parameter2);
        break;
    case '-':
        result = calc.subtract(parameter1, parameter2);
        break;
    case '*':
    case 'x':
        result = calc.multiply(parameter1, parameter2);
        break;
    case '/':
    case '÷':
        result = calc.divide(parameter1, parameter2);
        break;
    default:
        throw new Error('不被支持的操作符' + operator);
}
console.log(result);