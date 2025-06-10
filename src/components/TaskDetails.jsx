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

    // selectedList değiştiğinde tasks'ı güncelle
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

    // Filtreleme ve sıralama işlemlerini basit fonksiyonlarla yap
    const getFilteredAndSortedTasks = () => {
        if (!tasks) return []

        let filtered = [...tasks]

        // Filtreleme
        if (filters.status) {
            filtered = filtered.filter((task) => task.status === filters.status)
        }
        if (filters.name) {
            const lowerName = filters.name.toLowerCase()
            filtered = filtered.filter((task) => task.name.toLowerCase().includes(lowerName))
        }

        // Sıralama
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
                        className="px-4 py-2 rounded bg-sky-500 text-white hover:bg-sky-600 transition"
                    >
                        Add Task
                    </button>
                </div>

                <div className="flex flex-col">
                    <div className="flex border-b">
                        <div className="w-1/4 p-2 font-bold">Name</div>
                        <div className="w-1/4 p-2 font-bold">Description</div>
                        <div className="w-1/4 p-2 font-bold">Deadline</div>
                        <div className="w-1/4 p-2 font-bold">Status</div>
                    </div>
                    {filteredAndSortedTasks.length > 0 ? (
                        filteredAndSortedTasks.map((task) => (
                            <div key={task.id} className="flex border-b hover:bg-gray-50">
                                <div className="w-1/4 p-2 font-medium">{task.name}</div>
                                <div className="w-1/4 p-2 text-gray-600">{task.description}</div>
                                <div className="w-1/4 p-2 text-gray-600">
                                    {new Date(task.deadline).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </div>
                                <div className="w-1/4 p-2">
                                    <span className={`px-2 py-1 rounded-md text-sm font-medium ${getStatusColor(task.status)}`}>
                                        {task.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">No tasks in this list.</div>
                    )}
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
