// 交叉类型 &
// const mergeFunc = <T, U>(arg1: T, arg2: U): T & U => {
//     let res = {} as T & U // 设置交叉类型
//     res = Object.assign(arg1, arg2)
//     return res
// }
// mergeFunc({ a: 'a' }, { b: 'b' }) //{a: "a", b: "b"}

// 联合类型 |
// const getLengthFunc = (content: string | number): number => {
//     if (typeof content === 'string') {
//         return content.length
//     } else {
//         return content.toString().length
//     }
// }
// boolean(getLengthFunc(123)) // 3
// boolean(getLengthFunc('abcde')) // 5
// boolean(getLengthFunc(true)) // error: 没有boolean类型

// 类型保护
const valueList = [123, 'abc']
const getRandomValue = () => {
    const number = Math.random() * 10
    if (number < 5) { return valueList[0] }
    else { return valueList[1] }
}
const item = getRandomValue()
// console.log(item) // 随机输出123 或者 abc

// 因为item无法确定是string类型 还是number类型 所以ts中会报错
// if (item.length) {
//     console.log(item.length);
// } else {
//     console.log(item.toFixed());
// }
// 解决方案有两种
// 1.使用类型断言：(item as string).length
// 缺点：多处使用 比较繁琐 不方便
// if ((item as string).length) {
//     console.log((item as string).length);
// } else {
//     console.log((item as number).toFixed());
// }

// 2.使用类型保护
// a. 简单的可以直接用typeof 来判断
//    使用typeof === 有俩条件：
//      1)、只能使用 等或者不等来判断
//      2)、只能是string/number/boolean/symbol类型中的一种

// if (typeof item === 'string') {
//     console.log(item.length); // string
// } else {
//     console.log(item.toFixed()); // 不是string 自动判断number
// }
// if (typeof item === 'Object') { } // 不是上面四种类型 会报错


// // b. 复杂点的类型可以定义一个方法来判断
// function isString(value: number | string): value is string {
//     return typeof value === 'string'
// }
// if (isString(item)) {
//     console.log(item.length); // string
// } else {
//     console.log(item.toFixed()); // 不是string 自动判断number
// }

// // c. instanceof js原生操作符
// // 用来判断一个实例是不是某个构造函数创建的实例
// // 或者判断是不是用ES6语法中的某个类来创建的
// class CreatedByClass1 {
//     public age = 18
//     constructor() { }
// }
// class CreatedByClass2 {
//     public name = 'lison'
//     constructor() { }
// }

// function getRandomItem() {
//     return Math.random() < 0.5 ? new CreatedByClass1() : new CreatedByClass2()
// }
// const item1 = getRandomItem()
// if (item1 instanceof CreatedByClass1) {
//     console.log(item1.age);
// } else {
//     console.log(item1.name);
// }

// null和undefined
// string | undefined
// string | null
// string | undefined | null
// 以上三条数据不相等

// 类型保护和类型断言
// const getLengthFunction = (value: string | null): number => {
//     // if (value === null) { return 0 }
//     // else { return value.length }
//     return (value || '').length // 上两行的简写形式
// }

// function getSplicedStr(num: number | null): string {
//     function getRes(prefix: string) {
//         return prefix + num!.toFixed().toString() // 添加类型断言“！” 来说明num不会为null
//     }
//     num = num || 0.1
//     return getRes('lison-')
// }
// console.log(getSplicedStr(3.6)); // lison-4
// console.log(getSplicedStr(null)); // lison-0


// 类型别名
// 1. 设置一个别名为TypeString名称的 string类型
type TypeString = string
let str1: TypeString
let str2: string
// str1 和 str2 类型一样 都是string类型

// 2. 为泛型设置一个别名
type PositionType<T> = { x: T, y: T }
const position1: PositionType<number> = {
    x: 1,
    y: -1
}
const position2: PositionType<string> = {
    x: 'a',
    y: 'c'
}

// 3. 类型别名也可以本身引用 可用于树形嵌套
type Childs<T> = {
    current: T,
    child?: Childs<T>
}
let ccc: Childs<string> = {
    current: 'first',
    child: {
        current: 'second',
        child: {
            current: 'third'
        }
    }
}

// 字面量类型
type Name = 'Lison' // 定义一个类型为Lison的别名name
const name3: Name = 'Lison' // ok
// const name4: Name = 'wb' // error 不能将类型“"wb"”分配给类型“"Lison"”

// 1. 字面量类型构成的联合类型
type Direction = 'north' | 'east' | 'south' | 'west'
function getDirectionFirstLetter(direction: Direction) {
    return direction.substr(0, 1)
}
// console.log(getDirectionFirstLetter('north')); // n

// 2. 数字字面量类型
type Age = 18
interface InfoInterface {
    name: string
    age: Age
}
const _info: InfoInterface = {
    name: 'Lison',
    age: 18,
    // ages: 20 //error 不能将类型“20”分配给类型“18”
}


// 枚举成员类型
/**
 * 符合下列3个条件之一，枚举值和他的枚举成员可以作为类型来使用
 * 1. 不带初始值的枚举成员
 * 2. 枚举里面成员值为字符串字面量
 * 3. 枚举值为数值字面量或者带有负号的数值字面量
 */

// 可辨识联合
/**
 * 可辨识联合两个要素
 * 1. 具有普通的单例类型属性
 * 2. 一个类型别名包含了哪些类型的联合
 */
// interface Square {
//     kind: 'square'
//     size: number
// }
// interface Rectangle {
//     kind: 'rectangle'
//     height: number
//     width: number
// }
// interface Circle {
//     kind: 'circle'
//     radius: number
// }

// // 定义一个以上三个类型联合的联合类型
// type Shape = Square | Rectangle | Circle
// function getArea(s: Shape) {
//     switch (s.kind) {
//         /**
//          * 上面三个接口的 kind 就是可辨识特征
//          * 1. s.kind 可辨识特征
//          * 2. Shape 类型联合
//          * 所以 根据square、rectangle、circle就会自动分辨s.XXX
//          * 这就叫做可辨识联合
//          */
//         case 'square': return s.size * s.size; break;
//         case 'rectangle': return s.height * s.width; break;
//         case 'circle': return Math.PI * s.radius ** 2; break; // ** 两个**是ES7的新特性 取平方的意思
//     }
// }

// // 完整性检查
// function getAreas(s: Shape): number {
//     // error：函数缺少结束 return 语句，返回类型不包括 "undefined"
//     // 如果传入circle 因为找不到就会返回undefinde
//     switch (s.kind) {
//         case 'square': return s.size * s.size; break;
//         case 'rectangle': return s.height * s.width; break;
//     }
// }
// /**
//  * 解决完整性检查有两种方式
//  * 1. 打卡tsconfig.json 中的 "strictNullChecks" 属性 （兼容性有问题，以前老的代码没有这个属性）
//  * 2. 使用Never类型
//  */
// function assertNever(value: never): never {
//     throw new Error('Unexpected object:' + value)
// }
// function getAreass(s: Shape): number {
//     // error：函数缺少结束 return 语句，返回类型不包括 "undefined"
//     // 如果传入circle 因为找不到就会返回undefinde
//     switch (s.kind) {
//         case 'square': return s.size * s.size; break;
//         case 'rectangle': return s.height * s.width; break;
//         // 如果没有传Circle 就会报错
//         default: return assertNever(s) // 类型“Circle”的参数不能赋给类型“never”的参数
//     }
// }