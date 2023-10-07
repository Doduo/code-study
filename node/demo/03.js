/*
 * @Author: Doduo 
 * @Date: 2017-12-15 22:25:23 
 * @Last Modified by: Doduo
 * @Last Modified time: 2017-12-15 22:42:04
 */

//  node里的约定
/* 1.如果函数需要回调参数，一定实在参数的最后出现
 * 2.错误优先
 */
// function getFileAsync(path,callback){
//     if('错误'){
//         callback(new Error('xxx 错误'));
//     }else{
//         callback(null,data);
//     }
// }

// 例如
function isEvenOrOdd(number,callback){
    if(typeof number==='number'){
        if(number%2){ 
            // 奇数
            callback(null,'当前传入的是奇数');
        }else{
            callback(null,'当前传入的是偶数');
        }
    }else{
        // throw new Error('你传入的不是数字');//传统的写法 异步拿不到
        callback(new Error('你传入的不是数字'));
    }
}

// 约定将错误信息作为回调的第一个参数
isEvenOrOdd(10,(error,data)=>{
    if(error) throw error;// throw完了以后代码不会往下执行了 跟return一样
    console.log(data);

})

isEvenOrOdd(11,(error,data)=>{
    if(error) throw error;// throw完了以后代码不会往下执行了 跟return一样
    console.log(data);

})
isEvenOrOdd('aaasss',(error,data)=>{
    if(error) throw error;// throw完了以后代码不会往下执行了 跟return一样
    console.log(data);

})