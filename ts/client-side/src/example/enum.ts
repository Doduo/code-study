// 数字枚举
enum Status {
    Uploading,
    Success,
    Failed
}
console.log(Status.Success); // 1

// 反向映射
// 一个枚举 不仅可以通过字段值获取枚举值
// 还可以通过枚举值获得字段名
console.log(Status) // {0: "Uploading", 1: "Success", 2: "Failed", Uploading: 0, Success: 1, Failed: 2}

// 字符串枚举
enum Message {
    Error = 'Sorry,error',
    Success = 'hoho,success',
    Failed = Error
}
console.log(Message.Failed) // Sorry,error

// 异构枚举
// 就是既包含数字又包含字符串的枚举(尽量不用)
enum Result {
    Faild = 0,
    Success = 'success'
}



// 枚举成员类型和联合枚举类型
// 当枚举里所有的值都是下列3中情况之一时 那么这个枚举值或者成员就可以当成类型来使用
// 1.不带初值的枚举值 enum E { A }
// 2.有值，字符串字面量 enum E { A = 'a' }
// 3.有值，数值字面量 可带有负号 enum E { A = -1 }

// 枚举成员类型
enum Animals {
    Dog = 1,
    Cat = 2,
}
interface Dog {
    type: Animals.Dog
}
const dog: Dog = {
    type: Animals.Dog,
}

// 联合枚举类型 string | number
enum Status2 {
    Off,
    On,
}
interface Light {
    status: Status2
}
const light: Light = {
    status: Status2.On,
}

// 运行时枚举

// const enum
const enum Animals1 { }