import type { Task } from "../../types/types"
import TodoItem from "../TodoItem/TodoItem"
import { useContext } from "react"
import { TaskContext } from "../../context/TaskContext"

export default function TodoList() {
  const { sortedData } = useContext(TaskContext)
  if (sortedData.length === 0) {
    return <p>No tasks.</p>
  }

  return (
    <ul>
      {sortedData.map((task: Task) => {
        return <TodoItem key={task.id} task={task} />
      })}
    </ul>
  )
}
