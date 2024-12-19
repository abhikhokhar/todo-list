import React, { useState } from 'react'
import { useTodo } from './Contexts'

function TodoForm() {
  const [todo, setTodo] = useState()

  const { addTodo } = useTodo()

  const add = (e) => {
    e.preventDefault()

    if (!todo) return
    addTodo({ todo, Completed: false })
    setTodo("")

  }

  return (
    <form onSubmit={add} className="flex">
      <div className="flex w-full mb-6">
        <input
          type="text"
          placeholder="Write Todo..."
          className="todo-input w-full border-none rounded-l-lg px-4 py-2 bg-gray-700 text-white placeholder-gray-300 focus:ring focus:ring-green-500 outline-none"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          type="submit"
          className="todo-button rounded-r-lg px-5 bg-green-500 hover:bg-green-400 text-white duration-300"
        >
          Add
        </button>
      </div>
    </form>
  )
}

export default TodoForm