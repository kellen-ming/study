interface Todo {
  title: string
  description: string
}

/**
 * 标记Todo 的所有属性为只读属性
 */
const todo: Readonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

/**
 * 自己实现一个Readonly<T>
 */
type MyReadonly<T> = {
  readonly [Key in keyof T]: T[Key]
}

const test: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}


// todo.title = "Hello" // Error: cannot reassign a readonly property
// todo.description = "barFoo" // Error: cannot reassign a readonly property