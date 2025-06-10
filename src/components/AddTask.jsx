"use client"

import { useState } from "react"

function AddTask({ selectedList, onAddTask, show, onClose }) {
    const [name, setName] = useState("")
    const [status, setStatus] = useState("Not Started")
    const [deadline, setDeadline] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name.trim() || !deadline.trim()) {
            setError("Please fill in all required fields: Name and Deadline.")
            return
        }

        const newTask = {
            id: Date.now(),
            name,
            status,
            deadline,
            description,
            createdAt: new Date().toISOString(),
        }

        try {
            const updatedTasks = [...selectedList.tasks, newTask]

            const response = await fetch(`http://localhost:3001/lists/${selectedList.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...selectedList,
                    tasks: updatedTasks,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to add task.")
            }

            onAddTask(newTask)


            setName("")
            setStatus("Not Started")
            setDeadline("")
            setDescription("")
            setError(null)

            onClose()
        } catch (error) {
            console.error("Error adding task:", error)
            setError("Failed to add task. Please try again.")
        }
    }

    if (!show) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                    &times;
                </button>
                <form onSubmit={handleSubmit}>
                    <h3 className="text-xl font-semibold mb-4">Add New Task</h3>

                    {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

                    <label className="block mb-2">
                        Name <span className="text-red-500">*</span>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>

                    <label className="block mb-2">
                        Status
                        <select
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option>Not Started</option>
                            <option>In Progress</option>
                            <option>Complete</option>
                            <option>Active</option>
                            <option>Pending</option>
                        </select>
                    </label>

                    <label className="block mb-2">
                        Deadline <span className="text-red-500">*</span>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                        />
                    </label>

                    <label className="block mb-2">
                        Description
                        <textarea
                            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </label>

                    <button type="submit" className="px-4 py-2 rounded bg-sky-500 text-white hover:bg-sky-600 transition">
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddTask
