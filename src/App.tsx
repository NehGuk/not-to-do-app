import type { Task, TaskContextType, ThemeContextType } from "./types/types"
import { useState, useEffect } from "react"
import { createContext } from "react"
import Header from "./components/Header/Header"
import TodoList from "./components/TodoList/TodoList"
import { ThemeProvider } from "./context/ThemeContext"

export const TaskContext = createContext<TaskContextType | undefined>(undefined)

// Move all Context-related code into a separate file later (under /src/context)

export default function App() {
  const [todoData, setTodoData] = useState<Task[]>(() => {
    const savedData = localStorage.getItem("todoData")
    return savedData ? JSON.parse(savedData).map((task: Task) => ({ ...task, timestamp: new Date(task.timestamp) })) : []
  })

  const [sortOption, setSortOption] = useState(() => {
    const savedSort = localStorage.getItem("sortOption")
    return JSON.parse(savedSort) || { sortBy: "newest-first", hideCompleted: false }
  })

  const addTask = (newTask: Task) => {
    setTodoData((prev) => [...prev, newTask])
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
          return a.timestamp.getDate() - b.timestamp.getDate()
        case "newest-first":
          return b.timestamp.getDate() - a.timestamp.getDate()
      }
    })

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData))
    localStorage.setItem("sortOption", JSON.stringify(sortOption))
  }, [todoData, sortOption])

  return (
    <>
      <ThemeProvider>
        <TaskContext.Provider value={{ addTask, sortOption, setSortOption, sortedData, deleteTask, editTask }}>
          <Header />
          <TodoList />
        </TaskContext.Provider>
      </ThemeProvider>
    </>
  )
}
