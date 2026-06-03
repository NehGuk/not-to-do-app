import type { Task } from "../../types/types"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

export default function Header({ data: { addTask, setSortOption } }) {
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
      <select name="" id="" onChange={(e) => setSortOption((prev) => ({ ...prev, sortBy: e.target.value }))}>
        <option value="newest-first">Newest first</option>
        <option value="oldest-first">Oldest first</option>
        <option value="a-to-z">A to Z</option>
        <option value="z-to-a">Z to A</option>
      </select>
    </header>
  )
}

// STOPS at 44 minutes: filtering
// https://jobloop.instructure.com/courses/535/pages/react-3-2-todo-liste-med-react-del-2-2?module_item_id=36521
