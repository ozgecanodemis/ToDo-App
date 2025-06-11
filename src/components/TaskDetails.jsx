"use client"

import { useState, useEffect } from "react"
import AddTask from "./AddTask"
import Filter from "./Filter"

function TaskDetails({ selectedList }) {
    const [filters, setFilters] = useState({
        status: "",
        name: "",
    })
    const [sortOption, setSortOption] = useState("createdAt")
    const [showModal, setShowModal] = useState(false)
    const [tasks, setTasks] = useState([])
    const [editingTask, setEditingTask] = useState(null)
    const [editForm, setEditForm] = useState({
        name: "",
        description: "",
        deadline: "",
        status: "",
    })

    useEffect(() => {
        if (selectedList) {
            setTasks(selectedList.tasks || [])
        } else {
            setTasks([])
        }
    }, [selectedList])

    const handleAddTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask])
    }

    const handleEditTask = (task) => {
        setEditingTask(task.id)
        setEditForm({
            name: task.name,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
        })
    }

    const handleSaveEdit = (taskId) => {
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, ...editForm } : task)))
        setEditingTask(null)
        setEditForm({ name: "", description: "", deadline: "", status: "" })
    }

    const handleCancelEdit = () => {
        setEditingTask(null)
        setEditForm({ name: "", description: "", deadline: "", status: "" })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Complete":
                return "text-green-600 bg-green-100"
            case "In Progress":
                return "text-blue-600 bg-blue-100"
            case "Not Started":
                return "text-gray-600 bg-gray-100"
            case "Active":
                return "text-purple-600 bg-purple-100"
            case "Pending":
                return "text-yellow-600 bg-yellow-100"
            default:
                return "text-gray-600 bg-gray-100"
        }
    }

    const getFilteredAndSortedTasks = () => {
        if (!tasks) return []

        let filtered = [...tasks]

        if (filters.status) {
            filtered = filtered.filter((task) => task.status === filters.status)
        }
        if (filters.name) {
            const lowerName = filters.name.toLowerCase()
            filtered = filtered.filter((task) => task.name.toLowerCase().includes(lowerName))
        }

        if (sortOption === "createdAt") {
            filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        } else if (sortOption === "deadline") {
            filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        } else if (sortOption === "name") {
            filtered.sort((a, b) => a.name.localeCompare(b.name))
        } else if (sortOption === "status") {
            filtered.sort((a, b) => a.status.localeCompare(b.status))
        }

        return filtered
    }

    const filteredAndSortedTasks = getFilteredAndSortedTasks()

    if (!selectedList) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                    <p>Select a list to view tasks.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col space-y-8">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{selectedList.title}</h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-3 py-1.5 rounded bg-sky-500 text-white hover:bg-sky-600 transition"
                    >
                        Add Task
                    </button>
                </div>

                {/* Scrollable table eklendi */}
                <div className="overflow-x-auto">
                    <div className="min-w-[500px]">

                        <div className="flex border-b">
                            <div className="w-[20%] p-1 text-xs sm:text-sm font-bold">Name</div>
                            <div className="w-[25%] p-1 text-xs sm:text-sm font-bold">Description</div>
                            <div className="w-[20%] p-1 text-xs sm:text-sm font-bold">Deadline</div>
                            <div className="w-[20%] p-1 text-xs sm:text-sm font-bold">Status</div>
                            <div className="w-[15%] p-1 text-xs sm:text-sm font-bold">Action</div>
                        </div>

                        {filteredAndSortedTasks.length > 0 ? (
                            filteredAndSortedTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="flex border-b hover:bg-gray-50"
                                >
                                    {editingTask === task.id ? (
                                        <>
                                            <div className="w-[20%] p-1">
                                                <input
                                                    type="text"
                                                    value={editForm.name}
                                                    onChange={(e) =>
                                                        setEditForm({ ...editForm, name: e.target.value })
                                                    }
                                                    className="w-full p-0.5 border rounded text-xs sm:text-sm"
                                                />
                                            </div>
                                            <div className="w-[25%] p-1">
                                                <input
                                                    type="text"
                                                    value={editForm.description}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            description: e.target.value,
                                                        })
                                                    }
                                                    className="w-full p-0.5 border rounded text-xs sm:text-sm"
                                                />
                                            </div>
                                            <div className="w-[20%] p-1">
                                                <input
                                                    type="date"
                                                    value={editForm.deadline}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            deadline: e.target.value,
                                                        })
                                                    }
                                                    className="w-full p-0.5 border rounded text-xs sm:text-sm"
                                                />
                                            </div>
                                            <div className="w-[20%] p-1">
                                                <select
                                                    value={editForm.status}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            status: e.target.value,
                                                        })
                                                    }
                                                    className="w-full p-0.5 border rounded text-xs sm:text-sm"
                                                >
                                                    <option value="Not Started">Not Started</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Complete">Complete</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Pending">Pending</option>
                                                </select>
                                            </div>
                                            <div className="w-[15%] p-1">
                                                <button
                                                    onClick={() => handleSaveEdit(task.id)}
                                                    className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-[20%] p-1 text-xs sm:text-sm text-gray-700">
                                                {task.name}
                                            </div>
                                            <div className="w-[25%] p-1 text-xs sm:text-sm text-gray-700">
                                                {task.description}
                                            </div>
                                            <div className="w-[20%] p-1 text-xs sm:text-sm text-gray-700">
                                                {new Date(task.deadline).toLocaleDateString(undefined, {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </div>
                                            <div className="w-[20%] p-1 text-xs sm:text-sm text-gray-700">
                                                <span
                                                    className={`px-1 py-0.5 rounded-md text-xs font-medium ${getStatusColor(
                                                        task.status
                                                    )}`}
                                                >
                                                    {task.status}
                                                </span>
                                            </div>
                                            <div className="w-[15%] p-1">
                                                <button
                                                    onClick={() => handleEditTask(task)}
                                                    className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                No tasks in this list.
                            </div>
                        )}
                    </div>
                </div>
            </div>




            <div className="mt-auto">
                <Filter
                    onFilterChange={setFilters}
                    onSortChange={setSortOption}
                    currentFilters={filters}
                    currentSort={sortOption}
                />
            </div>

            <AddTask
                selectedList={selectedList}
                onAddTask={handleAddTask}
                show={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    )
}

export default TaskDetails
