import type { Task, TaskContextType } from "../../types/types"
import type { MouseEvent } from "react"
import { useState, useContext } from "react"
import { TaskContext } from "../../context/TaskContext"
import { ThemeContext } from "../../context/ThemeContext"
import { v4 as uuidv4 } from "uuid"

export default function Header() {
  const { addTask, sortOption, setSortOption } = useContext<TaskContextType>(TaskContext)
  const { theme, toggleTheme } = useContext(ThemeContext)

  const [newTaskName, setNewTaskName] = useState("")

  const handleAddTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const newTask: Task = {
      name: newTaskName,
      timestamp: new Date(),
      completed: false,
      id: uuidv4(),
    }
    addTask(newTask)
  }

  return (
    <header>
      <button onClick={() => toggleTheme()}>{theme === "light" ? "Switch to dark theme" : "Switch to light theme"}</button>
      <h1>Not to do</h1>
      <form action="">
        <input type="text" onChange={(e) => setNewTaskName(e.target.value)} />
        <button type="submit" onClick={handleAddTask}>
          Add
        </button>
      </form>
      <select value={sortOption.sortBy} onChange={(e) => setSortOption((prev) => ({ ...prev, sortBy: e.target.value }))}>
        <option value="newest-first">Newest first</option>
        <option value="oldest-first">Oldest first</option>
        <option value="a-to-z">A to Z</option>
        <option value="z-to-a">Z to A</option>
      </select>
      <label htmlFor="hideorshow">
        Hide completed:
        <input
          type="checkbox"
          id="hideorshow"
          checked={sortOption.hideCompleted}
          onChange={(e) =>
            setSortOption((prev) => ({
              ...prev,
              hideCompleted: e.target.checked,
            }))
          }
        />
      </label>
    </header>
  )
}
