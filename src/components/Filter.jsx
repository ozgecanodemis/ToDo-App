"use client"
import { useState, useEffect } from "react"

function Filter({ onFilterChange, onSortChange }) {
    const [statusFilter, setStatusFilter] = useState("")
    const [expiredFilter, setExpiredFilter] = useState(false)
    const [nameFilter, setNameFilter] = useState("")
    const [sortOption, setSortOption] = useState("createdAt")

    // useEffect ile filtre değişikliklerini yakala ve bildir
    useEffect(() => {
        onFilterChange({
            status: statusFilter,
            expired: expiredFilter,
            name: nameFilter,
        })
    }, [statusFilter, expiredFilter, nameFilter, onFilterChange])

    const handleSortChange = (e) => {
        setSortOption(e.target.value)
        onSortChange(e.target.value)
    }

    return (
        <div className="p-4 bg-gray-100 rounded-lg space-y-4">
            {/* Filtreleme */}
            <div className="space-y-2">
                <h3 className="font-semibold">Filter Tasks</h3>
                {/* Durum Filter */}
                <div>
                    <label className="block mb-1 text-sm font-medium">Status:</label>
                    <select
                        className="w-full border-gray-300 rounded p-2"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Complete">Complete</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Not Started">Not Started</option>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                {/* Süresi Dolmuş Filter */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="expired"
                        checked={expiredFilter}
                        onChange={(e) => setExpiredFilter(e.target.checked)}
                    />
                    <label htmlFor="expired" className="text-sm">Show Expired Tasks</label>
                </div>

                {/* Ada Göre Filter */}
                <div>
                    <label className="block mb-1 text-sm font-medium">Search by Name:</label>
                    <input
                        type="text"
                        className="w-full border-gray-300 rounded p-2"
                        placeholder="Type a task name..."
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                    />
                </div>
            </div>

            {/* Sıralama */}
            <div>
                <h3 className="font-semibold mb-1">Sort By</h3>
                <select
                    className="w-full border-gray-300 rounded p-2"
                    value={sortOption}
                    onChange={handleSortChange}
                >
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
