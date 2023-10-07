// ES5
// function Point(x, y) {
//     this.x = x;
//     this.y = y
// }

// Point.prototype.getPostion = function () {
//     return '(' + this.x + ',' + this.y + ')'
// }

// var p1 = new Point(2, 3)
// console.log(p1); // {x:2,y:3}
// console.log(p1.getPostion()); // (2,3)

// var p2 = new Point(4, 5)
// console.log(p2.getPostion()); // (4,5)

// ES6
// class Point {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
//     getPostion() {
//         return `(${this.x},${this.y})`
//     }
// }

// const p1 = new Point(1, 2)
// console.log(p1); //  {x: 1, y: 2}
// console.log(p1.hasOwnProperty('x')); // true 检测自身是否有X属性
// console.log(p1.hasOwnProperty('z')); // false
// console.log(p1.hasOwnProperty('getPostion')); // false
// console.log(p1.__proto__.hasOwnProperty('getPostion')); // true


// 取值函数和存值函数 get set
// ES5 
// var info = {
//     _age: 18,
//     set age(newValue) {
//         if (newValue > 18) {
//             console.log('怎么变老了');
//         } else {
//             console.log('哈哈我还很年轻');
//         }
//     },
//     get age() {
//         console.log('你问我年龄干啥');
//         return this._age
//     }
// }
// console.log(info.age); // 18
// info.age = 17 // 哈哈我还很年轻
// info.age= 19 // 怎么变老了

// ES6
// class Info {
//     constructor(age) {
//         this._age = age
//     }
//     set age(newAge) {
//         console.log('new age is:' + newAge);
//         this._age = newAge
//     }
//     get age() {
//         return this._age
//     }
// }
// const infos = new Info(18)
// infos.age = 17 // new age is:17
// console.log(infos.age); // 17

// class表达式
// 1.定义函数有两种方式:定义一个个方法给一个变量、直接定义一个方法
// const func = function () { }
// function func() { }

// // 2.class也有两种定义方式
// class Infos {
//     constructor() { }
// }

// class Infos = class {
//     constructor() { }
// }
// const testInfo = new Infos()


// 静态方法
// 如果不希望实例继承某个方法 只想要这个方法被本身调用的时候就需要把方法标记为静态方法
// ES5中每一个方法都有一个name属性就是他的方法名
// function testFunc(){}
// console.log(testFunc.name); //testFunc

// class Point {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y
//     }
//     getPosition() {
//         return `(${this.x},${this.y})`
//     }
//     static getClassName() {
//         return Point.name
//     }
// }
// const p = new Point(1, 2)
// console.log(p.getPosition()); // (1,2)
// console.log(Point.getClassName()); // Point   通过类本身可以调用自身的静态方法
// console.log(p.getClassName()); // Uncaught TypeError: p.getClassName is not a function 不能调用静态方法

// 静态属性
// 目前ES6明确规定 类只有静态方法 没有静态属性
// 如果想要添加静态属性 可以按照以下方式写
// class Point {
//     constructor() {
//         this.x = 0
//     }
// }
// Point.y = 2
// const p = new Point()
// console.log(p.x) // 0
// console.log(p.y) // undefined

// 实例属性其他写法
// class Point {
//     z = 0 // 添加z属性
//     constructor(x, y) {
//         this.x = x;
//         this.y = y
//     }
//     getPosition() {
//         return `(${this.x},${this.y})`
//     }
// }

// 实现私有方法
// 一些封装的插件里的方法只希望内部使用 并不希望暴露给使用者
// 目前ES6并提供私有方法和私有属性 只能通过一些技巧来实现(3种方法)
// 1.使用命名来区分（_）,但是意义不大
// class Point {
//     func1() { }
//     _func2() { }
// }

// 2.将私有方法移出模块
// const _func2 = () => { }
// class Point {
//     func1() {
//         _func2.call(this)
//     }
// }
// const p = new Point
//p._func2() // Uncaught TypeError: p._func2 is not a function

// 3.使用Symbol 利用Symbol值的唯一性
// a.js
// const func1 = Symbol('func1')
// export default class Point {
//     static [func1](){

//     }
// }

// // b.js
// import Point from './a.js'
// const p = new Point()
// console.log(p); // 因为 a.js 没有到处func1 所以也实现了私有方法

// 实现私有属性
// 属性前加#  目前只是提案 还没通过
// class Point {
//     #ownProp = 12
// }

// new.target
// 1.方法中使用
// function Point() {
//     console.log(new.target);
// }
// const p = new Point() // 返回构造函数
// const p2 = Point() // undefined

// 2.类中使用
// class Point {
//     constructor() {
//         console.log(new.target);
//     }
// }
// const p3 = new Point()