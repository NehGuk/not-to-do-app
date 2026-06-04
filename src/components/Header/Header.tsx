import type { Task } from "../../types/types"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useContext } from "react"
import { TaskContext } from "../../App"

export default function Header() {
  const { addTask, sortOption, setSortOption } = useContext(TaskContext)

  const [newTaskName, setNewTaskName] = useState("")

  const handleAddTask = (e) => {
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
      <h1>Header</h1>
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
        Hide completed tasks:
        <input
          type="checkbox"
          id="hideorshow"
          checked={sortOption.hideCompleted}
          onChange={(e) =>
            setSortOption((prev: Task) => ({
              ...prev,
              hideCompleted: e.target.checked,
            }))
          }
        />
      </label>
    </header>
  )
}
