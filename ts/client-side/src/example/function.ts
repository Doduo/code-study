// 一、函数类型
// 1.函数定义类型
// // ES5 定义函数
// function add(arg1: number, arg2: number): number {
//     return arg1 + arg2
// }
// //ES6 箭头函数定义函数
// const add = (arg1: number, arg2: number) => arg1 + arg2

// 2.完整的函数类型
let add2: (x: number, y: number) => number
add2 = (arg1: number, arg2: number): number => arg1 + arg2
add2 = (arg1: number, arg2: number) => arg1 + arg2


// 3.使用接口定义的函数类型
// interface AddFunc({
//     (num1: number, num2: number): number
// })
// 上面定义的方式 tslint 会建议使用下面类型别名的方式来定义
type Add3 = (num1: number, num2: number) => number


// 4.类型别名
// 就是为后面的类型起个别名
// isString 就是一个string的别名
type isString = string
// AddFunc就是后面类型的别名
type AddFunc2 = (num1: number, num2: number) => number

// 二、参数
// 1.可选参数
// ts 可选参数必须放在必选参数后面
type AddFunction = (arg1: number, arg2: number, arg3?: number) => number
let addFunction: AddFunction
addFunction = (x: number, y: number) => x + y
// addFunction = (x: number, y: number, z: number) => x + y + z

// 2.默认参数
// ES5
// var addFunctions = function (x, y) {
//     y = y || 0
//     return x + y
// }
// addFunctions(2) // 2
// addFunctions(2, undefined) // 2
// addFunctions(2, 1) // 3
// addFunctions(2, 0) // 2

// ts
let addFunction2 = (x: number, y: number = 3) => x + y
// console.log(addFunction2(1)) // 4
// console.log(addFunction2(1, 2)) // 3
// console.log(addFunction2(1, 'a')) // 类型“"a"”的参数不能赋给类型“number | undefined”的参数

// 3.剩余参数
// ES5
// function handleData() {
//     if (arguments.length === 1) return arguments[0] * 2
//     else if (arguments.length === 2) return arguments[0] * arguments[1]
//     else return Array.prototype.slice.apply(arguments).join('_')
// }
// handleData(2) // 4
// handleData(2, 3) // 6
// handleData(2, 3, 3, 4) // 2_3_3_4

// ES6
// const handleData = (...args) => {
//     console.log(args);
// }
// handleData(1) // [1]
// handleData(1, 2) // [1,2]
// handleData(1, 2, 3, 4) // [1,2,3,4]

// TS
// const handleData = (arg1: number, ...args: number[]) => {
//     // ...
// }


// 三、重载
// 函数重载只能用function来定义,不能使用接口和别名来定义
// function handleData(x: string): string[] // 函数重载
// function handleData(x: number): number[] // 函数重载
// // 函数实体
// function handleData(x: any): any {
//     if (typeof x === 'string') {
//         return x.split('')
//     } else {
//         return x.toString().split('').map((item) => Number(item))
//     }
// }
// console.log(handleData('abc')); // ["a","b","c"]
// console.log(handleData(123)); // [1,2,3]






