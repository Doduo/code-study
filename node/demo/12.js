// 模块的缓存

// 1.有缓存 
// setInterval(()=>{
//     var date=require('./module/date.js');
//     // 每次输出都一样
//     console.log(date.getTime());
// },1000);


// 2.删除缓存
// 一般不会用，大部分都是暴露行为
setInterval(()=>{

    // 遍历一个对象中所有的键
    Object.keys(require.cache).forEach((key)=>{
        delete require.cache[key]
    });

    var date=require('./module/date.js');
    // 每次输出都一样
    console.log(date.getTime());
},1000);
