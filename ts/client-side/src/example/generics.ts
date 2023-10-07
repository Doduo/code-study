// 以下情况虽然灵活，传什么类型的值都可以 但是丢失了对类型的检测 所以引申出使用泛型
// const getArray = (value: any, times: number = 5): any[] => {
//     return new Array(times).fill(value)
// }

// console.log(getArray(2)) // [2,2,2,2,2] 默认5个2
// console.log(getArray(2, 6)) // [2,2,2,2,2,2]  6个2

// console.log(getArray(2, 3).map((item) => item)); // [2,2,2]
// console.log(getArray(2, 3).map((item) => item + 1)); // [3,3,3]
// console.log(getArray(2, 3).map((item) => item.length)); // [undefined, undefined, undefined]
// console.log(getArray('abc', 5).map((item) => item.length)); // [3, 3, 3, 3, 3]


// 1. 简单实用
// const getArray = <T>(value: T, times: number = 5): T[] => {
//     return new Array(times).fill(value)
// }

// console.log(getArray<number>(123, 5).map((item) => item.toFixed())) //  ["123", "123", "123", "123", "123"]
// // getArray<number>('abc', 5).map((item) => item.length) // 类型“string”的参数不能赋给类型“number”的参数

// 2.泛型变量
// 2个泛型变量
// const getArray = <T, U>(param1: T, param2: U, times: number): Array<[T, U]> => {
//     return new Array(times).fill([param1, param2])
// }
// // getArray(1, 'a', 3) // 返回一个二维数组 [[1,"a"],[1,"a"],[1,"a"]]
// getArray<number, string>(1, 'a', 3).forEach((item) => {
//     console.log(item[0]) // 1   number类型
//     console.log(item[1]) // 'a' string类型
// })

// 3.泛型类型
// 使用函数定义泛型
// let getArray: <T>(arg: T, times: number) => T[]
// getArray = (arg: any, times: number) => {
//     return new Array(times).fill(arg)
// }

// getArray(123, 3).map((item) => item) //[123, 123, 123] number
// getArray(123, 3).map((item) => item.length) // number类型不存在length

// 使用别名定义泛型
// type GetArray = <T>(arg: T, times: number) => T[]
// let getArray: GetArray = (arg: any, times: number) => {
//     return new Array(times).fill(arg)
// }
// getArray(123, 3).map((item) => item) //[123, 123, 123] number

// 使用接口定义泛型
// interface GetArray {
//     <T>(arg: T, times: number): T[]
// }

// // 泛型变量定义在外面 里面所有的地方都能用泛型变量<T>
// interface GetArray<T> {
//     (arg: T, times: number): T[],
//     array: T[]
// }

// 4.泛型约束
/**
 * 1.定义一个有length属性接口数据
 * 2.让泛型<T> 继承与这个接口
 */
// interface ValueWithLength {
//     length: number
// }
// const getArray = <T extends ValueWithLength>(arg: T, times: number): T[] => {
//     return new Array(times).fill(arg)
// }
// getArray([1, 2], 3) // 可以 返回一个二维数组 有length属性
// getArray('123', 3) // 可以 字符串有length属性
// getArray(123, 3) // 类型“number”的参数不能赋给类型“ValueWithLength”的参数
// getArrat({
//    length:2,
// },3) // 可以

// 在泛型约束中使用类型参数
// 使用场景：定义一个对象 想要对只能在对象存在的属性做要求
// keyof:后面高级类型会讲到 可以理解为返回的是一个对象上所有的属性名构成的一个数组
// const getProps = <T, K extends keyof T>(object: T, propName: K) => {
//     return object[propName]
// }

// const objs = {
//     a: 'a',
//     b: 'b',
// }

// getProps(objs,'a') // a
// getProps(objs,'c') // 类型“"c"”的参数不能赋给类型“"a" | "b"”的参数  对象的属性名里面没有c
