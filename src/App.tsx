import Header from "./components/Header/Header"
import TodoList from "./components/TodoList/TodoList"
import { useState, useEffect } from "react"
import type { Task } from "./types/types"

export default function App() {
  const [todoData, setTodoData] = useState<Task[]>(() => {
    const savedData = localStorage.getItem("todoData")
    return savedData ? JSON.parse(savedData).map((task) => ({ ...task, timestamp: new Date(task.timestamp) })) : []
  })
  const [sortOption, setSortOption] = useState(
    () => {
      const savedSort = localStorage.getItem("sortOption")
      return JSON.parse(savedSort) || { sortBy: "newest-first", hideCompleted: false }
    }

    /*   { sortBy: "Newest first", hideCompleted: false } */
  )
  const addTask = (newTask: Task) => {
    setTodoData((prev) => [...prev, newTask])
    console.log(todoData)
  }
  const deleteTask = (id: string) => {
    setTodoData((prev) => prev.filter((task) => task.id !== id))
  }

  const editTask = (id: string, updatedTask: Task) => {
    setTodoData((prev) => prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)))
  }

  const sortedData = [...todoData]
    .filter((task) => !task.completed || !sortOption.hideCompleted)
    .sort((a, b) => {
      switch (sortOption.sortBy) {
        case "a-to-z":
          return a.name.localeCompare(b.name)
        case "z-to-a":
          return b.name.localeCompare(a.name)
        case "oldest-first":
          return a.timestamp - b.timestamp
        case "newest-first":
          return b.timestamp - a.timestamp
      }
    })

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData))
    localStorage.setItem("sortOption", JSON.stringify(sortOption))
  }, [todoData, sortOption])

  return (
    <>
      <Header data={{ addTask, sortOption, setSortOption }} />
      <TodoList data={{ sortedData, deleteTask, editTask }} />
    </>
  )
}
