import { useEffect, useState } from "react";
import TaskDetails from "./TaskDetails";

function ToDoLists() {
    const [lists, setLists] = useState([]);
    const [selectedListId, setSelectedListId] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/lists")
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to fetch lists: ${res.statusText}`);
                return res.json();
            })
            .then((data) => {
                setLists(data);
                if (data.length > 0) setSelectedListId(data[0].id);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setError("An error occurred while fetching the to-do lists.");
            });
    }, []);

    const selectedList = lists.find((list) => list.id === selectedListId);
    const selectedTask = selectedList?.tasks.find((task) => task.id === selectedTaskId);

    const filteredTasks = selectedList?.tasks.filter((task) =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleDelete = () => {
        if (!selectedListId) return;

        if (window.confirm("Are you sure you want to delete this list?")) {
            const updatedLists = lists.filter((list) => list.id !== selectedListId);
            setLists(updatedLists);
            setSelectedTaskId(null);

            if (updatedLists.length > 0) {
                setSelectedListId(updatedLists[0].id);
            } else {
                setSelectedListId(null);
            }
        }
    };

    const handleAddTask = (newTask) => {
        setLists((prevLists) =>
            prevLists.map((list) =>
                list.id === selectedListId ? { ...list, tasks: [...list.tasks, newTask] } : list
            )
        );
        setSelectedTaskId(newTask.id);
    };

    const handleTaskClick = (taskId) => {
        setSelectedTaskId(taskId);
    };

    return (
        <div className="bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl flex divide-x">
                {/* Left Panel - To-Do Lists */}
                <div className="w-1/4 p-6">
                    <h2 className="text-xl font-bold mb-4">To-Do Lists</h2>
                    <hr className="mb-4" />
                    {error && (
                        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}
                    <ul className="space-y-2">
                        {lists.length ? (
                            lists.map((list) => (
                                <button
                                    key={list.id}
                                    onClick={() => {
                                        setSelectedListId(list.id);
                                        setSelectedTaskId(null);
                                        setSearchTerm("");
                                    }}
                                    className={`w-full text-left p-3 rounded-lg transition-colors ${selectedListId === list.id
                                            ? "bg-sky-200 text-sky-800 font-semibold"
                                            : "hover:bg-gray-100"
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

                {/* Middle Panel - Tasks */}
                <div className="w-1/3 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Tasks</h2>
                        {selectedList && (
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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
                                                {selectedTaskId === task.id && (
                                                    <svg
                                                        className="h-4 w-4 text-sky-500"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
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
                            ) : (
                                <p className="text-gray-500 italic">No tasks found.</p>
                            )}
                        </>
                    ) : (
                        <p className="text-gray-500 italic">No list selected.</p>
                    )}
                </div>

                {/* Right Panel - Task Details */}
                <div className="w-2/5 p-6">
                    <TaskDetails
                        selectedTask={selectedTask}
                        selectedList={selectedList}
                        selectedTaskId={selectedTaskId}
                        onAddTask={handleAddTask}
                    />
                </div>
            </div>
        </div>
    );
}

export default ToDoLists;
