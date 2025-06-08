"use client"
import { useState, useMemo } from "react"
import AddTask from "./AddTask"

function TaskDetails({ selectedList, onAddTask, filters, sortOption }) {
    const [showAddTask, setShowAddTask] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case "Complete":
                return "text-green-600 bg-green-100";
            case "In Progress":
                return "text-blue-600 bg-blue-100";
            case "Not Started":
                return "text-gray-600 bg-gray-100";
            case "Active":
                return "text-purple-600 bg-purple-100";
            case "Pending":
                return "text-yellow-600 bg-yellow-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
    };

    const filteredAndSortedTasks = useMemo(() => {
        if (!selectedList?.tasks) return [];

        // Null veya undefined task'ları filtrele
        let tasks = Array.isArray(selectedList.tasks)
            ? selectedList.tasks.filter(Boolean)
            : [];

        // Filtreleme
        if (filters?.status) {
            tasks = tasks.filter((task) => task.status === filters.status);
        }

        if (filters?.expired) {
            const now = new Date();
            tasks = tasks.filter((task) => new Date(task.deadline) < now);
        }

        if (filters?.name) {
            tasks = tasks.filter((task) =>
                task.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }

        // Sıralama
        tasks.sort((a, b) => {
            if (sortOption === "createdAt") {
                return new Date(a.createdAt) - new Date(b.createdAt);
            } else if (sortOption === "deadline") {
                return new Date(a.deadline) - new Date(b.deadline);
            } else if (sortOption === "name") {
                return a.name.localeCompare(b.name);
            } else if (sortOption === "status") {
                return a.status.localeCompare(b.status);
            }
            return 0;
        });

        return tasks;
    }, [selectedList, filters, sortOption]);

    if (!selectedList) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5v2m6 6H9"
                        />
                    </svg>
                    <p>Select a list to view tasks.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">{selectedList.title}</h2>
                <button
                    onClick={() => setShowAddTask(true)}
                    className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition flex items-center gap-2"
                >
                    <span>+</span>
                    Add Item
                </button>
            </div>

            {/* Tasks Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                                Name
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                                Description
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                                Deadline
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedTasks.length > 0 ? (
                            filteredAndSortedTasks.map((task) => (
                                <tr
                                    key={task.id}
                                    className="border-b border-gray-100 hover:bg-gray-50"
                                >
                                    <td className="py-3 px-4 font-medium">
                                        {task.name}
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">
                                        {task.description}
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">
                                        {new Date(task.deadline).toLocaleDateString(
                                            undefined,
                                            {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            }
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-1 rounded-md text-sm font-medium ${getStatusColor(
                                                task.status
                                            )}`}
                                        >
                                            {task.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="py-8 px-4 text-center text-gray-500"
                                >
                                    No tasks in this list.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showAddTask && (
                <AddTask
                    selectedList={selectedList}
                    onClose={() => setShowAddTask(false)}
                    onAddTask={onAddTask}
                />
            )}
        </div>
    );
}

export default TaskDetails;
