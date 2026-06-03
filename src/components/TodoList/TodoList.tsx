/* import type { Task } from "../../types/types" */
import TodoItem from "../TodoItem/TodoItem"

export default function TodoList({ data: { sortedData, deleteTask, editTask } }) {
  if (sortedData.length === 0) {
    return <p>No tasks.</p>
  }

  return (
    <ul>
      {sortedData.map((task) => {
        return <TodoItem key={task.id} data={{ task, deleteTask, editTask }} />
      })}
    </ul>
  )
}
