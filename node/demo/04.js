/*
 * @Author: Doduo 
 * @Date: 2017-12-19 21:18:49 
 * @Last Modified by: Doduo
 * @Last Modified time: 2017-12-19 21:26:30
 */
// Node开发服务器的阻塞情况
// V8对ES6支持情况分为三个级别：根本不支持，直接支持，严格模式支持

'use strict';

const http=require('http');

let count=0;
const server=http.createServer((request,response)=>{
    // 此回调会在有任何用户请求时触发
     response.write(`你是第${count++}个访问用户`);
     response.end();
});

server.listen(2080,(error)=>{
    if(error) throw error;
    console.log('成功启动Web服务,端口:2080');
})