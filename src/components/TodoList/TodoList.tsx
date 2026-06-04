import type { Task } from "../../types/types"
import TodoItem from "../TodoItem/TodoItem"
import { useContext } from "react"
import { TaskContext } from "../../App"

export default function TodoList() {
  const { sortedData, deleteTask, editTask } = useContext(TaskContext)
  if (sortedData.length === 0) {
    return <p>No tasks.</p>
  }

  return (
    <ul>
      {sortedData.map((task: Task) => {
        return <TodoItem key={task.id} data={{ task, deleteTask, editTask }} />
      })}
    </ul>
  )
}
