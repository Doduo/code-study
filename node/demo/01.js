/*
 * @Author: Doduo 
 * @Date: 2017-12-15 21:31:26 
 * @Last Modified by: Doduo
 * @Last Modified time: 2017-12-19 22:17:01
 */
// 按两下Control+c 结束当前node进程
setInterval(function(){
    console.log(1);
},1000);

// 标识当前是否已经按下Control+c
var exiting=false;

process.on('SIGINT',()=>{
    if(exiting){
        // 终止当前node的进程
        console.log("退出");
        process.exit();
    }else{
        // 第一次按下
        console.log("第一次按下");
        exiting=true;
    }
    // console.log("按下了^c");
});