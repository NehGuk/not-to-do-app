import { useState } from "react"
import type { Task } from "../../types/types"

type Props = {
  data: {
    task: Task
    editTask: (id: string, updatedTask: Task) => void
    deleteTask: (id: string) => void
  }
}

export default function TodoItem({ data: { task, editTask, deleteTask } }: Props) {
  const [isReadOnly, setIsReadOnly] = useState(true)
  const [updatedTaskName, setUpdatedTaskName] = useState(task.name)

  const toggleCompleted = () => {
    editTask(task.id, { ...task, completed: !task.completed })
  }

  const handleEdit = (e) => {
    e.preventDefault()
    if (!isReadOnly) {
      editTask(task.id, { ...task, name: updatedTaskName })
    }
    setIsReadOnly((prev) => !prev)
  }

  const handleDelete = (id) => {
    deleteTask(id)
  }

  return (
    <li>
      <form>
        <input type="checkbox" checked={task.completed} onChange={toggleCompleted} />
        <input type="text" defaultValue={updatedTaskName} readOnly={isReadOnly} onChange={(e) => setUpdatedTaskName(e.target.value)} />
        <button onClick={handleEdit}>{isReadOnly ? "Edit" : "Save"}</button>
        <button onClick={() => handleDelete(task.id)}>Delete</button>
      </form>
    </li>
  )
}
