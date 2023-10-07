/*
 * @Author: Doduo 
 * @Date: 2017-12-19 22:18:15 
 * @Last Modified by: Doduo
 * @Last Modified time: 2017-12-19 22:28:23
 */

'use strict';

// 获取当前脚本所在路径
console.log(__dirname);
// 文件路径
console.log(__filename);

const fs = require('fs');


// 不是绝对路径 就有可能找不到该文件
// fs.readFile('../list.md',(error,content)=>{
// 所有的文件操作都必须是绝对路径（物理路径）
fs.readFile(__dirname+'/../list.md','utf8', (error, content) => {
    if (error)
        throw error;
    console.log(content);
})