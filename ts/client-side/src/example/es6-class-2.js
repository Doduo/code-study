// ES5中的继承
// ES5中实现类的继承是需要修改原型链的
// function Food() {
//     this.type = 'food'
// }
// Food.prototype.getType = function () {
//     return this.type
// }
// function Vegetables(name) {
//     this.name = name
// }
// Vegetables.prototype = new Food()
// const tomato = new Vegetables('tomato')
// console.log(tomato.getType()); //food

// ES6中的继承
// ES6继承是个语法糖 转换成ES5和上方一样
// class Parent {
//     constructor(name) {
//         this.name = name
//     }
//     getName() {
//         return this.name
//     }
// }

// class Child extends Parent {
//     constructor(name, age) {
//         super(name)
//         this.age = age
//     }
// }
// const c = new Child('wb', 18)
// console.log(c); // {name: "wb", age: 18}
// console.log(c.getName()); // wb
// console.log(c instanceof Child); // true
// console.log(c instanceof Parent); // true  继承了父类的子类创建的实例  它既是父类的实例 也是子类的实例

// Object.getPrototypeOf
// 该方法能够获取一个构造方法的原型对象
// class Parent {
//     constructor(name) {
//         this.name = name
//     }
//     getName() {
//         return this.name
//     }
// }

// class Child extends Parent {
//     constructor(name, age) {
//         super(name)
//         this.age = age
//     }
// }
// const c = new Child('wb', 18)
// console.log(Object.getPrototypeOf(Child) === Parent) // true Child的原型就是Parent这个类

// super：既可以作为函数使用，也可以作为对象使用
// 1.作为函数：代表父类的函数constructor
// 2.作为对象：也分两种情况
// a. 在普通方法中：指向父类的原型对象
// class Parent {
//     constructor() {
//         this.type = 'parent'
//     }
//     getName() {
//         return this.type
//     }
// }
// Parent.getType = () => {
//     return 'is Parent'
// }
// class Child extends Parent {
//     constructor() {
//         super()
//         console.log('constructor:' + super.getName())
//     }
//     getParentName() {
//         console.log('getParentName:' + super.getName())
//     }
//     getParentType() {
//         console.log('getParentType:' + super.getType())
//     }
// }
// const c = new Child() // constructor:parent
// c.getParentName() // getParentName:parent
// c.getParentType() // 报错 原因：super指向的是父类的原型对象而不是原型本身,所以super.getType()找不到的

// b. 在静态方法中：指向父类
// class Parent {
//     constructor() {
//         this.type = 'parent'
//     }
//     getName() {
//         return this.type
//     }
// }
// Parent.getType = () => {
//     return 'is Parent'
// }
// class Child extends Parent {
//     constructor() {
//         super()
//         console.log('constructor:' + super.getName())
//     }
//     getParentName() {
//         console.log('getParentName:' + super.getName())
//     }
//     static getParentType() {
//         console.log('getParentType:' + super.getType())
//     }
// }
// const c = new Child() // constructor:parent
// c.getParentName() // getParentName:parent
// Child.getParentType() // getParentType:is Parent  静态方法 指向父类

// 类的prototype属性和__proto__属性
// 每一个对象都有一个__proto__属性，它指向对应的构造函数的prototype属性
// 子类的__proto__指向父类本身
// 子类的prototype属性的__proto__指向父类的prototype属性
// 实例的__proto__属性的__proto__指向父类实例的__proto__

//原生构造函数
// ES5中的原生构造函数：Boolean、Number、String、Array、Date、Function、RegExp、Error、Object
// ES5中原生构造函数是无法被继承的

// ES6中原生构造函数可以被继承
// class CustomArray extends Array {
//     constructor(...args) {
//         super(...args)
//     }
// }
// const arr = new CustomArray(3, 4, 5)
// // 可以使用数组的方法
// console.log(arr) //  [3, 4, 5]
// console.log(arr.join('_')) // 3_4_5

