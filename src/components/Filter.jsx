"use client"
import { useState } from "react"

function Filter({ onFilterChange, onSortChange }) {
    const [statusFilter, setStatusFilter] = useState("")
    const [nameFilter, setNameFilter] = useState("")
    const [sortOption, setSortOption] = useState("createdAt")

    const handleStatusChange = (e) => {
        const newStatus = e.target.value
        setStatusFilter(newStatus)
        onFilterChange({
            status: newStatus,
            name: nameFilter,
        })
    }

    const handleNameChange = (e) => {
        const newName = e.target.value
        setNameFilter(newName)
        onFilterChange({
            status: statusFilter,
            name: newName,
        })
    }

    const handleSortChange = (e) => {
        const newSort = e.target.value
        setSortOption(newSort)
        onSortChange(newSort)
    }

    return (
        <div className="p-4 bg-gray-100 rounded-lg space-y-4">
            <div className="space-y-2">
                <h3 className="font-semibold">Filter Tasks</h3>

                <div>
                    <label className="block mb-1 text-sm font-medium">Status:</label>
                    <select className="w-full border-gray-300 rounded p-2" value={statusFilter} onChange={handleStatusChange}>
                        <option value="">All</option>
                        <option value="Complete">Complete</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Not Started">Not Started</option>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium">Search by Name:</label>
                    <input
                        type="text"
                        className="w-full border-gray-300 rounded p-2"
                        placeholder="Type a task name..."
                        value={nameFilter}
                        onChange={handleNameChange}
                    />
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-1">Sort By</h3>
                <select className="w-full border-gray-300 rounded p-2" value={sortOption} onChange={handleSortChange}>
                    <option value="createdAt">Created At</option>
                    <option value="deadline">Deadline</option>
                    <option value="name">Name</option>
                    <option value="status">Status</option>
                </select>
            </div>
        </div>
    )
}

export default Filter
