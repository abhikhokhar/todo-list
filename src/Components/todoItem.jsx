import React, { useState } from 'react'
import { useTodo } from './Contexts';

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)


    const { toggleComplete, deleteTodo, updateTodo } = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg })
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }

    return (
        <div
            className={`flex w-full border border-gray-300/60 rounded-lg px-3 py-1.5 gap-x-3 shadow-md text-black duration-300 ${todo.completed ? "bg-[#e0f7fa]" : "bg-[#cbe4f9]"
                }`}
        >
            {/* Checkbox */}
            <input
                type="checkbox"
                className="cursor-pointer accent-[#93c5fd]"
                checked={todo.completed}
                onChange={toggleCompleted}
            />

            {/* Todo Input */}
            <input
                type="text"
                className={`border-none outline-none w-full bg-transparent rounded-lg placeholder-gray-500 ${isTodoEditable ? "border-gray-400 px-2" : ""
                    } ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            {/* Edit/Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg justify-center items-center text-gray-600 bg-gray-200 hover:bg-gray-300 duration-200 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;
                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "💾" : "✏️"}
            </button>

            {/* Delete Button */}
            <button
                className="inline-flex w-8 h-8 justify-center items-center rounded-lg hover:scale-105 bg-[#fef2f2] duration-200"
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="#ef4444"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 6h18M9 6v12m6-12v12m2 5H7c-1.1 0-2-.9-2-2V6h14v13c0 1.1-.9 2-2 2z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 2h4c1.1 0 2 .9 2 2v1H8V4c0-1.1.9-2 2-2z"
                    />
                </svg>
            </button>
        </div>
    )
}

export default TodoItem