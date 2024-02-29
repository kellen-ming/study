const color = 'blue'

const colorGroup = {
  green: 'green',
  black: 'black',
  yellow: 'yellow'
}

const getColorGroup = () => { }

/**
 * 1、typeof 获取常量、变量和函数的类型
 */
type Color = typeof color
// 获得的类型： 
// type Color = "blue"

type ColorGroup = typeof colorGroup
// 获得的类型：
// type ColorGroup = {
//   green: string;
//   black: string;
//   yellow: string;
// } 

type GetColorGroup = typeof getColorGroup
// 获得的类型：
// type GetColorGroup = () => void


/**
 * 2、keyof 获取类型一个类型的所有属性（key）形成一个联合类型
 */
type Greeting = "Hello"
interface Person {
  name: string
  gender: string
  age: number
}
const kellen = {
  name: 'kellen',
  gender: 'man',
  age: 18
}

type PersonKeyUnion = keyof Person
// 获得的类型：
// "name" | "gender" | "age" 


/**
 * 3、keyof和typeof联合使用
 */
// 上述的例子Person interface，我们已经知道它的类型，所以我们只需要在 Person 上使用 keyof 操作符就可以获取到 Person key 的联合类型。
// 若是我们不知对象的类型，却又想要获得对应的联合类型，keyof和typeof联合使用可以获取到

type KellenKeyUnion = keyof typeof kellen
// 获得的类型：
// "name" | "gender" | "age"

/**
 * 4、在enum上使用 keyof typeof
 */
enum Vegetable {
  potato = 'potato',
  eggplant = 'eggplant'
}
// 已知一个enum，获取一个枚举键值的联合类型

type VegetableType = keyof typeof Vegetable
let vegetable: VegetableType
vegetable = 'potato'  // OK
vegetable = 'eggplant'  // OK
// vegetable = "carrot"  // 不能将类型“"carrot"”分配给类型“"potato" | "eggplant"”
