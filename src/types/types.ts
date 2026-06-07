export type Task = {
  name: string
  timestamp: Date
  completed: boolean
  id: string
}

export type ThemeContextType = {
  theme: "light" | "dark"
  toggleTheme: () => void
}

export type TaskContextType = {
  addTask: (newTask: Task) => void
  deleteTask: (id: string) => void
  editTask: (id: string, updatedTask: Task) => void
  sortedData: Task[]
  sortOption: { sortBy: string; hideCompleted: boolean }
  setSortOption: (option: { sortBy: string; hideCompleted: boolean }) => void
}
