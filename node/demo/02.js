/*
 * @Author: Doduo 
 * @Date: 2017-12-15 21:44:10 
 * @Last Modified by: Doduo
 * @Last Modified time: 2017-12-19 22:16:52
 */

//  模拟登录
var q='请输入用户名:';

var users={
    'admin':'123',
    'user1':'321',
    'user2':'213'
};

// 输入第一个问题
process.stdout.write(q+'\n');

// var isInputUsername=true;
var username='';
// 接收用户输入
process.stdin.on('data',(input)=>{
    // 小坑1. input实际上是一个流（二进制数组）
    // 小坑2. 输入的字符最后肯定是一个回车符
    input=input.toString().trim();
    // 获取一个键值对集合中所有的键
    if(!username){
        if(Object.keys(users).indexOf(input)===-1){
            // 用户名不存在
            process.stdout.write('用户名不存在'+'\n');
            process.stdout.write(q+'\n');
            // isInputUsername=true;
            username='';
        }else{
            // 存在
            // console.log('存在');
            process.stdout.write('请输入密码:'+'\n');
            // isInputUsername=false;
            username=input;
            
        }
    }else{
        // 传入的是密码，此处拿不到上次的输入，所以拿不到用户名
        // console.log(1111);
        if(input===users[username]){
            console.log('登录成功');
        }else{
            process.stdout.write('请输入密码:'+'\n');
            
        }
    }
    
})