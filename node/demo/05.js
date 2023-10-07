/*
 * @Author: Doduo 
 * @Date: 2017-12-19 21:57:02 
 * @Last Modified by: Doduo
 * @Last Modified time: 2017-12-19 22:11:40
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

// 3.进行运算


let result;
switch (operator) {
    case '+':
        result = parseFloat(parameter1) + parseFloat(parameter2);
        break;
    case '-':
        result = parseFloat(parameter1) - parseFloat(parameter2);
        break;
    case '*':
    case 'x':
        result = parseFloat(parameter1) * parseFloat(parameter2);
        break;
    case '/':
    case '÷':
        result = parseFloat(parameter1) / parseFloat(parameter2);
        break;
    default:
        throw new Error('不被支持的操作符' + operator);
}
console.log(result);