import Header from "./components/Header/Header"
import TodoList from "./components/TodoList/TodoList"
import { ThemeProvider } from "./context/ThemeContext"
import { TaskProvider } from "./context/TaskContext"

export default function App() {
  return (
    <>
      <ThemeProvider>
        <TaskProvider>
          <Header />
          <TodoList />
        </TaskProvider>
      </ThemeProvider>
    </>
  )
}
