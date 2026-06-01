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
  const deleteTask = (id: string) => {
    setTodoData((prev) => prev.filter((task) => task.id !== id))
  }

  const editTask = (id: string, updatedTask: Task) => {
    setTodoData((prev) => prev.map((task) => (task.id === id ? { ...task, updatedTask } : task)))
  }

  return (
    <>
      <Header data={{ addTask }} />
      <TodoList data={{ todoData, deleteTask, editTask }} />
    </>
  )
}
