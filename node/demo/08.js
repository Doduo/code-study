/*
 * @Author: Doduo 
 * @Date: 2017-12-19 22:30:00 
 * @Last Modified by: Doduo
 * @Last Modified time: 2017-12-19 22:52:47
 */
// 模块内部的私有空间

// 每个模块的内部都是私有空间

'use strict';

var module2 = require('./module/module2.js');
console.log(module2.a);
// error
console.log(a);