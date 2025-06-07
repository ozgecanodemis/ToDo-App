import { useState } from "react"
import TaskDetails from "./TaskDetails"

function ToDoLists() {
    const [lists, setLists] = useState([
        {
            id: 1,
            title: "Example List 1",
            tasks: [
                {
                    id: 1,
                    name: "Task A",
                    description: "Description of Task A",
                    deadline: "May 1, 2024",
                    status: "In Progress",
                },
                {
                    id: 2,
                    name: "Task B",
                    description: "Description of Task B",
                    deadline: "Apr 26, 2024",
                    status: "Not Started",
                },
                {
                    id: 3,
                    name: "Task C",
                    description: "Description of Task C",
                    deadline: "Apr 26, 2024",
                    status: "In Progress",
                },
                {
                    id: 4,
                    name: "Task D",
                    description: "Description of Task D",
                    deadline: "Apr 26, 2024",
                    status: "Complete",
                },
            ],
        },
        {
            id: 2,
            title: "Example List 2",
            tasks: [
                {
                    id: 5,
                    name: "Task X",
                    description: "Description of Task X",
                    deadline: "May 15, 2024",
                    status: "Active",
                },
                {
                    id: 6,
                    name: "Task Y",
                    description: "Description of Task Y",
                    deadline: "May 20, 2024",
                    status: "Pending",
                },
            ],
        },
        {
            id: 3,
            title: "Example List 3",
            tasks: [
                {
                    id: 7,
                    name: "Task Alpha",
                    description: "Description of Task Alpha",
                    deadline: "Jun 1, 2024",
                    status: "In Progress",
                },
            ],
        },
    ])

    const [selectedListId, setSelectedListId] = useState(1)
    const [selectedTaskId, setSelectedTaskId] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")

    const selectedList = lists.find((list) => list.id === selectedListId)
    const selectedTask = selectedList?.tasks.find((task) => task.id === selectedTaskId)

    const filteredTasks =
        selectedList?.tasks.filter((task) => task.name.toLowerCase().includes(searchTerm.toLowerCase())) || []

    const handleDelete = () => {
        const updatedLists = lists.filter((list) => list.id !== selectedListId)
        setLists(updatedLists)
        setSelectedTaskId(null)

        if (updatedLists.length > 0) {
            setSelectedListId(updatedLists[0].id)
        } else {
            setSelectedListId(null)
        }
    }

    const handleTaskClick = (taskId) => {
        setSelectedTaskId(taskId)
    }

    return (
        <div className="bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl flex divide-x">
                {/* Sol Panel - To-Do Lists */}
                <div className="w-1/4 p-6">
                    <h2 className="text-xl font-bold mb-4">To-Do Lists</h2>
                    <hr className="mb-4" />
                    <ul className="space-y-2">
                        {lists.map((list) => (
                            <button
                                key={list.id}
                                onClick={() => {
                                    setSelectedListId(list.id)
                                    setSelectedTaskId(null)
                                }}
                                className={`w-full text-left p-3 rounded-lg transition-colors ${selectedListId === list.id ? "bg-sky-200 text-sky-800" : "hover:bg-gray-100"
                                    }`}
                            >
                                {list.title}
                            </button>
                        ))}
                    </ul>
                </div>

                {/* Orta Panel - To-Do List Tasks */}
                <div className="w-1/3 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">To-Do List</h2>
                        <button
                            onClick={handleDelete}
                            className="bg-gray-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                            delete list
                        </button>
                    </div>

                    {selectedList && (
                        <>
                            <div className="mb-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Task search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                    <svg
                                        className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>

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
                                            {selectedTaskId === task.id && (
                                                <svg className="h-4 w-4 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

                {/* Sağ Panel - Task Details */}
                <TaskDetails selectedTask={selectedTask} selectedList={selectedList} selectedTaskId={selectedTaskId} />
            </div>
        </div>
    )
}

export default ToDoLists
