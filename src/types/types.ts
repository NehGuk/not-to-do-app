import type { Dispatch, SetStateAction } from "react"

export type Task = {
  name: string
  timestamp: Date
  completed: boolean
  id: string
}

export type TaskContextType = {
  addTask: (newTask: Task) => void
  deleteTask: (id: string) => void
  editTask: (id: string, updatedTask: Task) => void
  sortedData: Task[]
  sortOption: SortOption
  setSortOption: Dispatch<SetStateAction<SortOption>>
}

export type ThemeContextType = {
  theme: "light" | "dark"
  setTheme: Dispatch<SetStateAction<"light" | "dark" | "capuccino">>
  toggleTheme: () => void
}

export type SortOption = {
  sortBy: string
  hideCompleted: boolean
}
