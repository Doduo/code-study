// 一、this类型
// class Counters {
//     constructor(public count: number = 0) { }
//     public add(value: number) {
//         this.count += value
//         return this
//     }
//     public subtract(value: number) {
//         this.count -= value
//         return this
//     }
// }
// let counter1 = new Counters(10)
// // console.log(counter1) // 10
// // console.log(counter1.add(3).subtract(2)) // 11


// class PowCounter extends Counters {
//     constructor(public count: number = 0) {
//         super(count)
//     }
//     public pow(value: number) {
//         this.count = this.count ** value
//         return this
//     }
// }
// let powCounter = new PowCounter(2)
// console.log(powCounter.pow(3).add(1).subtract(3)); // 6


// 二、索引类型
// 索引类型查询操作符：keyof
// interface InfoInterfaceAdvanced {
//     name: string;
//     age: number;
// }
// let infoProp: keyof InfoInterfaceAdvanced
// infoProp = 'name'
// infoProp = 'age'
// // infoProp = 'sex' // error:不能将类型“"sex"”分配给类型“"name" | "age"”

// // 通过和泛型的结合使用 ts就可以检测使用动态属性名的代码
// function getValue<T, K extends keyof T>(obj: T, names: K[]): Array<T[K]> {
//     return names.map((n) => obj[n])
// }
// const infoObj = {
//     name: 'lison',
//     age: 18
// }

// let infoValues = getValue(infoObj, ['name', 'age'])
// console.log(infoValues); // ["lison", 18]

// // 不能将类型“(string | number)[]”分配给类型“string”
// let infoValuess: string = getValue(infoObj, ['name', 'age'])

// let infoValuesss: Array<string | number> = getValue(infoObj, ['name', 'age'])


// 索引访问操作符
// 索引访问操作符：[]
// interface InfoInterfaceAdvanced {
//     name: string;
//     age: number;
// }
// type NameTypes = InfoInterfaceAdvanced['name'] // NameTypes为string类型
// function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
//     return o[name]
// }

// 三、映射类型
// 基础
interface Info1 {
    age: number;
    name: string;
    sex: string;
}
// 简单的映射类型
type ReadonlyType<T> = {
    // in: for..in 就是遍历T里的属性名
    readonly [P in keyof T]: T[P]
}
type ReadonlyInfo1 = ReadonlyType<Info1>
let info11: ReadonlyInfo1 = {
    age: 18,
    name: 'lison',
    sex: 'man'
}
// info11.age = 20 // error:无法分配到 "age" ，因为它是只读属性

/************************
 * TS中内置两个常用的映射属性
 * 1. Readonly：自动添加只读属性
 * 2. Partial：自动添加可选参数
 ************************/

/**
 * type TestReadonly = {
 *   readonly age: number;
 *   readonly name: string;
 *   readonly sex: string;
 * }
 */
type TestReadonly = Readonly<Info1>

/**
 * type TestPartial = {
 *   age?: number | undefined;
 *  name?: string | undefined;
 *   sex?: string | undefined;
 * }
 */
type TestPartial = Partial<Info1>

/**
 * Pick：传进来一个对象和一个属性列表，返回这个对象里的部分属性值
 * 源码实现：
 * type Pick<T, K extends keyof T> = {
 *      [P in K]: T[P];
 * }
 *
 * Record：构造一组属性为K 类型为T 所组成的类型
 * 源码实现：
 * type Record<K extends keyof any, T> = {
 *      [P in K]: T;
 * }
 */

// 由映射类型进行推断
// type Proxy<T> = {
//     get(): T;
//     set(value: T): void;
// }
// type Proxify<T> = {
//     [P in keyof T]: Proxy<T[P]>
// }

// // 装箱
// function proxify<T>(obj: T): Proxify<T> {
//     const result = {} as Proxify<T>
//     for (const key in obj) {
//         result[key] = {
//             get: () => obj[key],
//             set: (value) => obj[key] = value
//         }
//     }
//     return result
// }
// let props = {
//     name: 'Lison',
//     age: 18,
// }
// let proxyProps = proxify(props)
// proxyProps.name.set('li')
// console.log(proxyProps) // {name:{get:f(),set:f(value)},age:{get:f(),set:f(value)}}
// console.log(proxyProps.name.get()) // li

// // 拆箱 拆包
// function unproxify<T>(t: Proxify<T>): T {
//     const result = {} as T
//     for (const k in t) {
//         result[k] = t[k].get()
//     }
//     return result
// }
// let originalProps = unproxify(proxyProps)
// console.log(originalProps) // {name: "li", age: 18}


// 增加或移除特定修饰符
/**
 * 增加：+
 * 移除：-
 */
// type ReadonlyInfo<T> = {
//     -readonly [P in keyof T]: T[P] // 移除只读属性
// }
// type ReadonlyInfo<T> = {
//     [P in keyof T]-?: T[P] // 移除可选参数属性
// }
// keyof和映射类型在2.9的升级
// 元组和数组上的映射类型

// unknown TS3.0新出的顶级类型
// [1] 任何类型都可以赋值给unknown类型
// let value1: unknown
// value1 = 'a'
// value1 = 123

// // [2] 如果没有类型断言或者基于控制流的类型细化时，unkonwn不可以赋值给其他类型，此时他只能赋值个给unknown和any类型
// let value2: unknown
// value1 = value2 // ok 都是unknown类型
// // let value3: string = value2 //error 不能将类型“unknown”分配给类型“string”

// // [3] 如果没有类型断言或者基于控制流的类型细化时，不能在他上面进行任何操作
// let value4: unknown
// // value4 += 1 // error

// // [4] unknown与任何其他类型组成的交叉类型，最后都等于其他类型
// type type1 = string & unknown // string类型
// type type2 = number & unknown // number类型
// type type3 = unknown & unknown // unknown类型
// type type4 = unknown & string[] // string[]类型

// // [5] unknown与任何其他类型(除了any还是any类型)组成的联合类型都等于unkonwn类型
// type type5 = string | unknown // unknown类型
// type type6 = any | unknown // any类型
// type type7 = number[] | unknown // unknown类型

// // [6] never类型是unknown的子类型
// type type8 = never extends unknown ? true : false // true

// // [7] keyof unknown 等于never
// type type9 = keyof unknown // never

// // [8] 只能对unknown进行等或不等操作，不能进行其他操作
// value1 === value2
// value1 !== value2
// // value1 += value2 // error

// // [9] unknown类型的值不能访问他的属性、作为函数调用和作为类创建实例
// let value10: unknown
// value10.age // error
// value10() // error
// new value10() // error 

// // [10] 使用映射类型时如果遍历的是unknown类型，则不会映射任何属性
// type Types1<T> = {
//     [P in keyof T]: number
// }
// type type11 = Types1<any>
// type type12 = Types1<unknown>



// 四、条件类型
// 基础
// 语法：T extends U ? X : Y
type Types2<T> = T extends string ? string : number
let index: Types2<false> // number

// 分布式条件类型
// 简单示例 string和number都是any的子类型 所以返回的还是联合类型
type TypeNames<T> = T extends any ? T : never
type Type3 = TypeNames<string | number> // string | number

// 官方示例
type TypeName<T> =
    T extends string ? string :
    T extends number ? number :
    T extends boolean ? boolean :
    T extends undefined ? undefined :
    T extends () => void ? () => void :
    object
type Type4 = TypeName<() => void> // () => void类型
type type5 = TypeName<string[]> // boject类型
type Type6 = TypeName<(() => void | string[])>

// 应用实例
type Diff<T, U> = T extends U ? never : T
type Test2 = Diff<string | number | boolean, undefined | number> // string | boolean

// 条件和映射类型结合的示例
type Type7<T> = {
    [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]
interface Part {
    id: number;
    name: string;
    subparts: Part[];
    undatePart(newName: string): void
}
type Test1 = Type7<Part> // undatePart类型


// 条件类型的类型推断-infer
// 不使用infer
type Type8<T> = T extends any[] ? T[number] : T
type Test3 = Type8<string[]> // string类型
type Test4 = Type8<string> // string类型

// 使用infer
type Type9<T> = T extends Array<infer U> ? U : T
type Test5 = Type9<string[]> // string类型
type Test6 = Type9<string> // string类型

// TS预定义条件类型
// Exclude<T,U>：从T中选出不在U中的字面量
type Type10 = Exclude<'a' | 'b' | 'c', 'a' | 'b'> // "b" | "c"
type Type11 = Exclude<'a' | 'b' | 'c', 'a'> // "b" | "c"

// Extract<T,U>： 选出T中可以赋值给U的类型
type Type12 = Extract<'a' | 'b' | 'c', 'c' | 'b'> // "b" | "c"

// NonNullable<T>：从T中去除nunll和undefined
type Type13 = NonNullable<string | number | null | undefined> // string | number

// ReturnType<T>：获取函数类型返回值类型
type Type14 = ReturnType<() => string> // string
type Type15 = ReturnType<() => void> // void

// InstanceType<T>：获取构造函数的实例类型
class Aclass {
    constructor() { }
}
type T1 = InstanceType<typeof Aclass> // Aclass类型
type T2 = InstanceType<any> // any
type T3 = InstanceType<never> // never
type T4 = InstanceType<string> // error:类型“string”不满足约束“new (...args: any) => any”
