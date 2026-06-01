export default function TodoItem({ data: { task, editTask, deleteTask } }) {
  const toggleCompleted = () => {}

  const handleEdit = () => {}

  const handleDelete = (id) => {
    deleteTask(id)
  }

  return (
    <li>
      <form>
        <input type="checkbox" checked={task.completed} onChange={toggleCompleted} />
        <input type="text" defaultValue={task.name} />
        <button onClick={handleEdit}>Edit</button>
        <button onClick={() => handleDelete(task.id)}>Delete</button>
      </form>
    </li>
  )
}
