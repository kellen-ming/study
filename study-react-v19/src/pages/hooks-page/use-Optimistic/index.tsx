import { useState, useRef, useOptimistic } from "react";
import { addTodoAction } from "../../../apis";
import { Dividing } from "../../../components/Dividing";

type Todo = {
  text: string;
  adding: boolean;
}

/**
 * @description 不使用乐观更新的例子
 * @returns 
 */
function StateAction() {
  const formRef = useRef<HTMLFormElement>(null);

  const [todos, setTodos] = useState<Todo[]>([{ text: "吃饭", adding: false }]);
 
  const formAction = async (formData: FormData) => {
    const newTodo = formData.get("todo");
    if(!newTodo) return;

    formRef.current?.reset();

    try {
      const response = await addTodoAction(newTodo as string);
      setTodos((prevTodos) => [
        ...prevTodos,
        { text: response, adding: false },
      ]);
    } catch (err) {
      alert(`待办事件添加失败：${err}`);
    }
  };

  return (
    <>
      <h3>TodoList(非乐观更新):</h3>
      <ul>
        {/* 👇 用 map 去渲染所有的 todo */}
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.text}
          </li>
        ))}
      </ul>

      <br />

      <form action={formAction} ref={formRef}>
        <input type="text" name="todo" placeholder="add new todo" />
        <button type="submit">新增</button>
      </form>
    </>
  );
}


/**
 * @description 使用乐观更新的例子
 * @returns 
 */
function OptimisticAction() {
  const formRef = useRef<HTMLFormElement>(null);

  const [todos, setTodos] = useState<Todo[]>([{ text: "吃饭", adding: false }]);
 
  // 使用useOptimistic乐观更新 state 的值
  const [optimisticTodos, setOptimisticTodos] = useOptimistic<Todo[], string>(
    // 初始值（state）
    todos,
    // 会先生成乐观状态，直到新的 todos state 更新后才会取代乐观状态
    (prevTodos, newTodo) => ([
      ...prevTodos,
      {
        text: newTodo,
        adding: true,
      }
    ])
  )

  const formAction = async (formData: FormData) => {
    const newTodo = String(formData.get("todo"));
    if(!newTodo) return;

    // 客观更新👍 UI
    setOptimisticTodos(newTodo)
    formRef.current?.reset();

    try {
      // 请求成功后，用真正的数据替换乐观数据（useOptimistic 监听的是 useState 的值）
      const response = await addTodoAction(newTodo);
      setTodos((prevTodos) => [
        ...prevTodos,
        { text: response, adding: false },
      ]);
    } catch (err) {
      // 如果请求失败，就还原todo state 的值，即还原optimisticTodos
      alert(`待办事件添加失败：${err}`);
      setTodos((prevTodos) => [...prevTodos]);
    }
  };

  return (
    <>
      <h3>TodoList(useOptimistic乐观更新):</h3>
      <ul>
        {/* 👇 用乐观setOptimisticTodos去渲染所有的 todo */}
        {optimisticTodos.map((todo, index) => (
          <li key={index}>
            { todo.text }
            {/* 真正状态前，会显示由 useOptimistic 生成的乐观状态 */}
            {/* 也就是 todo.adding 会是 true 的数据 */}
            { !!todo.adding && <small>adding...</small> }
          </li>
        ))}
      </ul>

      <br />

      <form action={formAction} ref={formRef}>
        <input type="text" name="todo" placeholder="add new todo" />
        <button type="submit">新增</button>
      </form>
    </>
  );
}

export  function UseOptimisticPage() {
  return (
    <>
      <StateAction />
      <Dividing />
      <OptimisticAction />
    </>
  )
}