// 1.布尔类型
let bool: boolean
bool = true
// bool = 123 // 不能将类型“number”分配给类型“boolean”

// 2.数值类型
let num: number = 123
// num = 'abc' // 不能将类型“string”分配给类型“number”

num = 0b1111011 // 2进制123
num = 0o173 // 8进制123 
num = 0x7b // 16 进制123

// 3.字符串类型
let str: string
str = 'abc'
str = `数值是${num}`


// 4.数组类型
// [1,2,3]
// 写法1
let arr: number[]
arr = [5]
// 写法2
let arr2: Array<number>
let arr3: (string | number)[]
arr3 = [1, 'a']

// 5.元组类型
// （数组的扩展）：固定长度、固定类型
let tuple: [string, number, boolean]
tuple = ['a', 1, false]
//tuple = ['a', 1, false, 12] // 源具有 4 个元素，但目标仅允许 3 个

// 6.枚举类型
enum Roles {
    SUPER_ADMIN,
    ADMIN,
    USER
}
// if(roles = Roles.SUPER_ADMIN){...}
// console.log(Roles.ADMIN); // 1
// console.log(Roles[2]); //USER

// 7.any类型
let value: any
value = 'abc'
value = 123
value = false
const arr4: any[] = [1, 'a']

// 8.void类型
const consoleText = (text: string): void => {
    console.log(text);
}

consoleText('123333')
//consoleText(132) //类型“number”的参数不能赋给类型“string”的参数

// 9.undefined
let u: undefined
// u =123 //不能将类型“123”分配给类型“undefined”

// 10.null
let n: null
n = null
// n = 'abc' //不能将类型“"abc"”分配给类型“null”

// 11.never类型
/**
 * never类型是任意类型的子类型 never类型的值可以赋值给其他任何类型
 * 没有任何类型是never的子类型 其他任何类型的值都不能赋值给never
 */
const errorFunc = (message: string): never => {
    // Error 的返回类型就是never
    throw new Error(message)
}
// errorFunc('1211') //Uncaught Error: 1211

const infiniteFunc = (): never => {
    // 死循环 不可能有返回值 也是never类型
    while (true) { }
}

// let neverVariable = (() => {
//     while (true) { }
// })()
// neverVariable = 123 //不能将类型“number”分配给类型“never”
//num = neverVariable // 没问题

// 12.object
let obj = {
    name: 'lison'
}
let obj2 = obj
obj.name = 'wb'
console.log(obj); // wb   object类型存的是引用

function getObject(obj: object): void {
    console.log(obj);
}
getObject(obj2)

// 类型断言
/**
 * 两种写法
 * 1. <string> xxx;
 * 2. xxx as string
 */
/*
const getLength = target => {
    if (target.length || target.length === 0) {
        return target.length
    } else {
        return target.toString().length
    }
}*/
const getLength = (target: string | number): number => {
    if ((<string>target).length || (target as string).length === 0) {
        return (<string>target).length
    } else {
        return target.toString().length
    }
}
