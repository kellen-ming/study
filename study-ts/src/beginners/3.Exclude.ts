/**
 * 1、使用 Exclude<T, U> 排除某些属性
 * 假设你有一个类型，你想要创建一个新类型，
 * 该类型包含原类型中除了某个属性之外的所有属性，
 * 并且这个被排除的属性是已知的。你可以使用 Exclude 和 keyof 来实现这一点
 */

export type Person = {
  name: string;
  age: number;
  address: string;
};

type ExcludeAge<T> = {
  [K in Exclude<keyof T, 'age'>]: T[K];
};

const personWithoutAge: ExcludeAge<Person> = {
  name: "Alice",
  address: "123 Main St"
};

// personWithoutAge.age = 30; // 错误，因为 age 属性不存在


const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

type TupleToObject<T> = {
}
