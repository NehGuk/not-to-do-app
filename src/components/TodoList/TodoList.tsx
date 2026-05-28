/* import type { Task } from "../../types/types" */
import TodoItem from "../TodoItem/TodoItem"

export default function TodoList({ data: { todoData } }) {
  if (todoData.length === 0) {
    return <p>No tasks.</p>
  }

  return (
    <ul>
      {todoData.map((task) => {
        return <TodoItem key={task.id} data={{ task }} />
      })}
    </ul>
  )
}
