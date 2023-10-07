// 1.基本用法
interface NameInfo {
    firstName: string,
    lastName: string
}

const getFullName = ({ firstName, lastName }: NameInfo): string => {
    return `${firstName} ${lastName}`
}

getFullName({
    firstName: 'haha',
    lastName: 'li'
})


// 2.可选属性【？修饰符】
interface Vegetable {
    color?: string,
    readonly type: string
}

const getVegetables = ({ color, type }: Vegetable) => {
    return `A ${color ? (color + '') : ''} ${type}`
}

// tslint:disable-next-line: no-console
console.log(getVegetables({
    type: 'tomato2',
    // color: 'red'
}));

// 3.绕过多余参数校验
/**
 * 三种方式
 * 1. 接口里面最后加上   [prop: string]: any
 * 2. 对象后面添加 as Vegetable
 * 3. 利用类型兼容性（后续细讲）
 */

interface Vegetable2 {
    color?: string,
    type: string
    // [prop: string]: any
}

const getVegetables2 = ({ color, type }: Vegetable2) => {
    return `A ${color ? (color + '') : ''} ${type}`
}

// tslint:disable-next-line: no-console
console.log(getVegetables2({
    type: 'tomato',
    color: 'red',
    size: 2
} as Vegetable));

// 4.只读属性
interface Vegetable3 {
    color?: string,
    readonly type: string
}
// 定义对象属性为只读元素
let vegetableObj: Vegetable3 = {
    type: 'tomato'
}
// vegetableObj.type = 'ccc' // 无法分配到 "type" ，因为它是只读属性。

// 定义数组为元素为只读属性
interface ArrInter {
    0: number,
    readonly 1: string
}

let arr6: ArrInter = [1, 'a']
// arr6[1] = 'b' // 无法分配到 "1" ，因为它是只读属性


// 5.函数类型
// interface AddFunc({
//     (num1: number, num2: number): number
// })
// // 上面定义的方法 会建议利用下面使用类型别名的方式来定义
// type AddFunc = (num1: number, num2: number) => number
// const add: AddFunc = (n1, n2) => n1 + n2
// console.log(add(1, 2)); // 3


// 6.索引类型
interface RoleDic {
    [id: number]: string
}

const role1: RoleDic = {
    1: 'super_admin',
    // 'a': 'super_admin' // 索引值必须是number类型
}

interface RoleDic2 {
    [id: string]: string
}

const role2: RoleDic2 = {
    a: 'super_admin',
    1: 'super_admin' // 不会报错 因为js给一个对象属性值设置为数值的话 会自动转换为字符串
}


// 7.接口继承
interface Vegetables {
    color: string
}

interface Tomato extends Vegetables {
    radius: number
}

interface Carrot {
    length: number
}

const tomato: Tomato = {
    radius: 1,
    color: 'red'
}
// console.log(tomato); // {radius: 1, color: "red"}

const carrot: Carrot = {
    length: 2,
    // color: 'orange' //对象文字可以只指定已知属性，并且“color”不在类型“Carrot”中
}

// 混合类型接口 
// 累加器
interface Counter {
    (): void,
    count: number
}

const getCounter = (): Counter => {
    const c = () => { c.count++ }
    c.count = 0
    return c
}

const counter: Counter = getCounter()
counter()
console.log(counter.count) // 1
counter()
console.log(counter.count) // 2
counter()
console.log(counter.count) // 3
