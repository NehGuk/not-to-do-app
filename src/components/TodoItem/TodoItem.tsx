export default function TodoItem({ data: { task } }) {
  const toggleCompleted = () => {}
  const handleEditTask = (e) => {
    e.preventDefault()
    task.name = e.target.value
  }

  return (
    <li>
      <form>
        <input type="checkbox" checked={task.completed} onChange={toggleCompleted} />
        <input type="text" defaultValue={task.name} readOnly />
        <button onClick={handleEditTask}>Edit</button>
        <button>Delete</button>
      </form>
    </li>
  )
}
