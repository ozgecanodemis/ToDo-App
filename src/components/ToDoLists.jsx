"use client"

import { useEffect, useState } from "react"
import TaskDetails from "./TaskDetails"

function ToDoLists() {
    const [lists, setLists] = useState([])
    const [selectedListId, setSelectedListId] = useState(null)
    const [selectedTaskId, setSelectedTaskId] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // Default data for when no local storage or API is available
    const defaultLists = [
        {
            id: "1",
            title: "Example List 1",
            tasks: [
                {
                    id: 1,
                    name: "Task A",
                    description: "Description of Task A",
                    deadline: "2024-05-01",
                    status: "In Progress",
                    createdAt: new Date().toISOString(),
                },
                {
                    id: 2,
                    name: "Task B",
                    description: "Description of Task B",
                    deadline: "2024-04-26",
                    status: "Not Started",
                    createdAt: new Date().toISOString(),
                },
            ],
        },
        {
            id: "2",
            title: "Example List 2",
            tasks: [
                {
                    id: 5,
                    name: "Task X",
                    description: "Description of Task X",
                    deadline: "2024-05-15",
                    status: "Active",
                    createdAt: new Date().toISOString(),
                },
                {
                    id: 6,
                    name: "Task Y",
                    description: "Description of Task Y",
                    deadline: "2024-05-20",
                    status: "Pending",
                    createdAt: new Date().toISOString(),
                },
            ],
        },
    ]

    useEffect(() => {
        try {
            const savedLists = localStorage.getItem("todoLists")

            if (savedLists && savedLists !== "undefined" && savedLists !== "null") {
                const parsedLists = JSON.parse(savedLists)
                setLists(parsedLists)
                if (parsedLists.length > 0) {
                    setSelectedListId(parsedLists[0].id)
                }
                setIsLoading(false)
            } else {
                // Use default data instead of trying to fetch from localhost
                setLists(defaultLists)
                setSelectedListId(defaultLists[0].id)
                localStorage.setItem("todoLists", JSON.stringify(defaultLists))
                setIsLoading(false)
            }
        } catch (error) {
            // If localStorage fails, use default data
            setLists(defaultLists)
            setSelectedListId(defaultLists[0].id)
            setIsLoading(false)
        }
    }, [])

    const selectedList = lists.find((list) => list.id === selectedListId)
    const selectedTask = selectedList?.tasks.find((task) => task.id === selectedTaskId)

    const filteredTasks =
        selectedList?.tasks.filter((task) => task.name.toLowerCase().includes(searchTerm.toLowerCase())) || []

    const handleDelete = () => {
        if (!selectedListId) return

        if (window.confirm("Are you sure you want to delete this list?")) {
            const updatedLists = lists.filter((list) => list.id !== selectedListId)
            setLists(updatedLists)
            setSelectedTaskId(null)

            if (updatedLists.length > 0) {
                setSelectedListId(updatedLists[0].id)
            } else {
                setSelectedListId(null)
            }

            localStorage.setItem("todoLists", JSON.stringify(updatedLists))
        }
    }

    const handleAddTask = (newTask) => {
        const updatedLists = lists.map((list) =>
            list.id === selectedListId ? { ...list, tasks: [...list.tasks, newTask] } : list,
        )

        setLists(updatedLists)
        setSelectedTaskId(newTask.id)

        // Yeni task eklendiğinde local storage'ı güncelle
        localStorage.setItem("todoLists", JSON.stringify(updatedLists))
    }

    const handleTaskClick = (taskId) => {
        setSelectedTaskId(taskId)
    }

    if (isLoading) {
        return (
            <div className="bg-gray-100 p-6">
                <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 text-center">
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl flex flex-col md:flex-row divide-y md:divide-x ">
                <div className="flex flex-row md:flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 p-6">
                        <h2 className="text-xl font-bold mb-4">To-Do Lists</h2>
                        <hr className="mb-4" />
                        {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>}
                        <ul className="space-y-2">
                            {lists.length ? (
                                lists.map((list) => (
                                    <button
                                        key={list.id}
                                        onClick={() => {
                                            setSelectedListId(list.id)
                                            setSelectedTaskId(null)
                                            setSearchTerm("")
                                        }}
                                        className={`w-full text-left p-3 rounded-lg transition-colors ${selectedListId === list.id ? "bg-sky-200 text-sky-800 font-semibold" : "hover:bg-gray-100"
                                            }`}
                                    >
                                        {list.title}
                                    </button>
                                ))
                            ) : (
                                <p className="text-gray-500">No lists available.</p>
                            )}
                        </ul>
                    </div>

                    <div className="w-full lg:w-1/2 p-6">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Tasks</h2>
                            {selectedList && (
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-700 w-full md:w-1/2 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Delete List
                                </button>
                            )}
                        </div>

                        {selectedList ? (
                            <>
                                <div className="mb-4 relative">
                                    <input
                                        type="text"
                                        placeholder="Search tasks..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>

                                {filteredTasks.length ? (
                                    <ul className="space-y-2">
                                        {filteredTasks.map((task) => (
                                            <li
                                                key={task.id}
                                                onClick={() => handleTaskClick(task.id)}
                                                className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedTaskId === task.id
                                                        ? "bg-sky-100 border-l-4 border-sky-500"
                                                        : "bg-gray-50 hover:bg-gray-100"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">{task.name}</span>
                                                    {selectedTaskId === task.id && <span className="h-4 w-4 text-sky-500"></span>}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 italic">No tasks found.</p>
                                )}
                            </>
                        ) : (
                            <p className="text-gray-500 italic">No list selected.</p>
                        )}
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-6">
                    <TaskDetails
                        selectedTask={selectedTask}
                        selectedList={selectedList}
                        selectedTaskId={selectedTaskId}
                        onAddTask={handleAddTask}
                    />
                </div>
            </div>
        </div>
    )
}

export default ToDoLists
