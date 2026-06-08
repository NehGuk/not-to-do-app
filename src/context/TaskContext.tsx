import type { Task, TaskContextType } from "../types/types"
import { createContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

// later: move Task context to a separate file?
export const TaskContext = createContext<TaskContextType>({
  addTask: () => {},
  deleteTask: () => {},
  editTask: () => {},
  sortedData: [],
  sortOption: { sortBy: "newest-first", hideCompleted: false },
  setSortOption: () => {},
})

export function TaskProvider({ children }: { children: React.ReactNode }) {
  // all task-related functionalities live here

  const sampleDefaultTasks = [
    {
      name: "Don't eat too much chocolate",
      timestamp: new Date(),
      completed: false,
      id: uuidv4(),
    },
    {
      name: "Don't be nasty to people",
      timestamp: new Date(),
      completed: false,
      id: uuidv4(),
    },
    {
      name: "Don't spend too much money on coffee",
      timestamp: new Date(),
      completed: false,
      id: uuidv4(),
    },
    {
      name: "Don't assume you know everything",
      timestamp: new Date(),
      completed: false,
      id: uuidv4(),
    },
    {
      name: "Don't think those lights you saw last night were UFOs",
      timestamp: new Date(),
      completed: false,
      id: uuidv4(),
    },
    {
      name: "Don't ever say that Litago is better than Cocio",
      timestamp: new Date(),
      completed: false,
      id: uuidv4(),
    },
    {
      name: "Don't be too lazy",
      timestamp: new Date(),
      completed: false,
      id: uuidv4(),
    },
    {
      name: "Don't forget you're pretty much insignificant in the grand scheme of things",
      timestamp: new Date(),
      completed: false,
      id: uuidv4(),
    },
    {
      name: "Don't forget you're VERY important to a lot of people, though",
      timestamp: new Date(),
      completed: false,
      id: uuidv4(),
    },
    {
      name: "Don't forget to have a valid ticket when using public transport",
      timestamp: new Date(),
      completed: false,
      id: uuidv4(),
    },
    {
      name: "Don't underestimate human stupidity",
      timestamp: new Date(),
      completed: false,
      id: uuidv4(),
    },
    {
      name: "Don't forget to put the garbage out",
      timestamp: new Date(),
      completed: false,
      id: uuidv4(),
    },
  ]

  const [todoData, setTodoData] = useState<Task[]>(() => {
    const savedData = localStorage.getItem("todoData")
    return savedData ? JSON.parse(savedData).map((task: Task) => ({ ...task, timestamp: new Date(task.timestamp) })) : sampleDefaultTasks
  })

  // task functions
  const addTask = (newTask: Task) => {
    setTodoData((prev) => [newTask, ...prev])
  }

  const deleteTask = (id: string) => {
    setTodoData((prev) => prev.filter((task) => task.id !== id))
  }

  const editTask = (id: string, updatedTask: Task) => {
    setTodoData((prev) => prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)))
  }

  // filtering
  const [sortOption, setSortOption] = useState(() => {
    const savedSort = localStorage.getItem("sortOption")
    return savedSort ? JSON.parse(savedSort) : { sortBy: "newest-first", hideCompleted: false }
  })

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
