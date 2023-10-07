// 类型推论
// 基础
let name1 = 'wb'
// name1 = 123 // 报错 已默认name1为字符类型

// 多类型联合
let arr5 = [1, 'a']
// arr5 会默认定义为下方类型
let arr55: Array<number | string> = [1, 'a']

// 上下文类型
// 根据左边推出右边的类型
// window.onmousedown = (mouseEvent) => {
//     console.log(mouseEvent);
// }

// 类型兼容性
// 基础
// interface InfoInterface {
//     name: string
// }
// let infos: InfoInterface
// const infos1 = { name: 'lison' }
// const infos2 = { age: 18 }
// const infos3 = { name: 'lison', age: 18 }
// infos = infos1 // 正确
// infos = infos2 // 错误 没有name
// infos = infos3 // 正确 必须要有name 多了无所谓

// 函数兼容性
// 参数个数
// let x = (a: number) => 0
// let y = (b: number, c: string) => 0
// y = x // ok
// x = y // error 后面的参数个数一定要小于等于前面的参数个数

// 参数类型
// let x = (a: number) => 0
// let y = (b: string) => 0
// x = y // error 参数类型不对应

// 返回值类型
// let x = (): string | number => 0
// let y = (): string => 'a'
// let z = (): boolean => false
// x = y // ok
// y = x // error 返回值类型不一致
// y = z // error 返回值类型不一致

// 可选参数和剩余参数
// const getSum = (arr: number[], callback: (...args: number[]) => number): number => {
//     return callback(...arr)
// }
// const res = getSum([1, 2, 3], (...args: number[]): number => args.reduce((a, b) => a + b, 0))
// console.log(res); // 6

// // 结果同上 但是没上面的使用方便 加参数话 还要修改方法体
// const res1 = getSum([1, 2, 3], (arg1: number, arg2: number, arg3: number): number => arg1 + arg2 + arg3)
// console.log(res1);


// 参数双向协变
// 严格配置可以关闭双向协变，就不支持了
// let funcA = (arg: number | string): void => { }
// let funcB = (arg: number): void => { }
// funcA = funcB
// funcB = funcA

// 函数重载
// function merge(arg1: number, arg2: number): number
// function merge(arg1: string, arg2: string): string
// function merge(arg1: any, arg2: any) {
//     return arg1 + arg2
// }
// merge(1, 2) // ok
// merge(1, 2).length // error  number类型没有length属性
// merge('1', '2') // ok

// function merge(arg1: number, arg2: number): number
// function merge(arg1: string, arg2: string): string
// function merge(arg1: any, arg2: any) {
//     return arg1 + arg2
// }

// function sum(arg1: number, arg2: number): number
// function sum(arg1: any, arg2: any): any {
//     return arg1 + arg2
// }
// let func = merge // 此时func 有两种重载 merge number 和 merge string
// func = sum // error sum只有一种重载 sum number  所以类型不兼容

// 枚举
// enum StatusInterface {
//     On,
//     Off,
// }
// let s = StatusInterface.On
// s = 2 // ok
// s = '2' // error 不能将类型“"2"”分配给类型“StatusInterface”

// // 数字枚举只与数字枚举兼容 并且在不同枚举之间是不兼容融
// enum StatusEnum {
//     On,
//     Off,
// }
// enum AnimalEnum {
//     Dog,
//     Cat,
// }
// let s2 = StatusEnum.On
// s2 = StatusEnum.Off // ok
// s2 = AnimalEnum.Dog // error 不能将类型“AnimalEnum.Dog”分配给类型“StatusEnum”。


// 类
// class AnimalClass {
//     public static age: number
//     constructor(public name: string) { }
// }
// class PeopleClass {
//     public static age: string
//     constructor(public name: string) { }
// }
// class FoodIsClass {
//     constructor(public name: number) { }
// }
// let animal: AnimalClass
// let people: PeopleClass
// let food: FoodIsClass

// // 检测是实例
// animal = people // ok
// animal = food // error 属性“name”的类型不兼容

// 泛型
// interface Data<T> {
//     data: T
// }
// let data1: Data<number>
// let data2: Data<string>
// data1 = data2 // 类型不兼容