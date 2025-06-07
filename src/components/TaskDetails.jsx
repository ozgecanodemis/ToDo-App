function TaskDetails({ selectedTask, selectedList, selectedTaskId }) {
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

    return (
        <div className="w-1/2 p-6">
            {selectedTask ? (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">{selectedList.title}</h2>
                        <button className="bg-gray-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                            + Add Item
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Description</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Deadline</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-sky-50 border-l-4 border-sky-500">
                                    <td className="px-4 py-3 text-sm border-b">{selectedTask.name}</td>
                                    <td className="px-4 py-3 text-sm border-b">{selectedTask.description}</td>
                                    <td className="px-4 py-3 text-sm border-b">{selectedTask.deadline}</td>
                                    <td className="px-4 py-3 text-sm border-b">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTask.status)}`}
                                        >
                                            {selectedTask.status}
                                        </span>
                                    </td>
                                </tr>
                                {/* Diğer task'ları da göster */}
                                {selectedList.tasks
                                    .filter((task) => task.id !== selectedTaskId)
                                    .map((task) => (
                                        <tr key={task.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm border-b">{task.name}</td>
                                            <td className="px-4 py-3 text-sm border-b">{task.description}</td>
                                            <td className="px-4 py-3 text-sm border-b">{task.deadline}</td>
                                            <td className="px-4 py-3 text-sm border-b">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                                    {task.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                    <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                        <p className="text-lg font-medium">Select a task to view details</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TaskDetails
