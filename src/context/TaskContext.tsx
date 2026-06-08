// Move all the TaskContext-related code into this file later, from App.tsx, for better organisation and separation of concerns
import type { Task, TaskContextType } from "../types/types"
import { createContext, useState, useEffect } from "react"

export const TaskContext = createContext<TaskContextType>({
  addTask: () => {},
  deleteTask: () => {},
  editTask: () => {},
  sortedData: [],
  sortOption: { sortBy: "newest-first", hideCompleted: false },
  setSortOption: () => {},
})

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [todoData, setTodoData] = useState<Task[]>(() => {
    const savedData = localStorage.getItem("todoData")
    return savedData ? JSON.parse(savedData).map((task: Task) => ({ ...task, timestamp: new Date(task.timestamp) })) : []
  })

  const [sortOption, setSortOption] = useState(() => {
    const savedSort = localStorage.getItem("sortOption")
    return savedSort ? JSON.parse(savedSort) : { sortBy: "newest-first", hideCompleted: false }
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
        default:
          return 0
      }
    })

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData))
    localStorage.setItem("sortOption", JSON.stringify(sortOption))
  }, [todoData, sortOption])

  return (
    <TaskContext.Provider value={{ addTask, deleteTask, editTask, sortOption, setSortOption, sortedData }}>{children}</TaskContext.Provider>
  )
}
