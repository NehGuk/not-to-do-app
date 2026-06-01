import type { Task } from "../../types/types"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

export default function Header({ data: { addTask } }) {
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
    </header>
  )
}
