import type { Task } from "../../types/types"
import type { ReactEventHandler } from "react"
import type { MouseEvent } from "react"
import { useState, useContext } from "react"
import { TaskContext } from "../../context/TaskContext"

export default function TodoItem({ task }: { task: Task }) {
  const { deleteTask, editTask } = useContext(TaskContext)
  const [isReadOnly, setIsReadOnly] = useState(true)
  const [updatedTaskName, setUpdatedTaskName] = useState(task.name)

  const toggleCompleted = () => {
    editTask(task.id, { ...task, completed: !task.completed })
  }

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!isReadOnly) {
      editTask(task.id, { ...task, name: updatedTaskName })
    }
    setIsReadOnly((prev) => !prev)
  }

  const handleDelete = (id: string) => {
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
