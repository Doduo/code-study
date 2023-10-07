/*
 * @Author: Doduo 
 * @Date: 2017-12-19 22:34:20 
 * @Last Modified by: Doduo
 * @Last Modified time: 2017-12-19 22:39:31
 */
// module对象

'use strict';

console.log(module);

const module3=require('./module/module3');

if(module.parent){
    // 当前这个文件是被别的文件加载
}else{
    // 入口文件
}
