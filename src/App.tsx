import Header from "./components/Header/Header"
import TodoList from "./components/TodoList/TodoList"
import { useState } from "react"
import type { Task } from "./types/types"

export default function App() {
  const [todoData, setTodoData] = useState<Task[]>([])
  const addTask = (newTask: Task) => {
    setTodoData((prev) => [...prev, newTask])
    console.log(todoData)
  }

  return (
    <>
      <Header data={{ addTask }} />
      <TodoList data={{ todoData }} />
    </>
  )
}
