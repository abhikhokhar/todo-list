import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Components/Contexts'
import TodoForm from './Components/todoForm'
import TodoItem from './Components/todoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="background">
        <div className="w-full max-w-2xl todo-container shadow-xl rounded-lg p-6 sm:bg-gray-900/80 backdrop-blur-md">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center sm:text-[#eaf6fb] text-[#2c385a] mb-6">
            Manage Your Todos
          </h1>
          {/* Todo Form */}
          <div className="mb-6">
            <TodoForm />
          </div>

          {/* Todo List */}
          <div className="flex flex-col gap-y-4">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="todo-item flex items-center justify-between p-4 rounded-lg bg-gray-800 text-white shadow-md hover:bg-gray-700 transition-all"
              >

                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
