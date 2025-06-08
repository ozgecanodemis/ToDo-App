import { useState, useEffect, useRef } from "react";
import axios from "axios";

function AddTask({ selectedList, onAddTask }) {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("Not Started");
    const [deadline, setDeadline] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const nameInputRef = useRef(null);

    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !deadline.trim()) {
            setError("Please fill in all required fields: Name and Deadline.");
            return;
        }

        const newTask = {
            id: Date.now(),
            name,
            status,
            deadline,
            description,
        };

        try {
            await axios.put(`http://localhost:3000/lists/${selectedList.id}`, {
                ...selectedList,
                tasks: [...selectedList.tasks, newTask],
            });

            onAddTask(newTask);

            // Reset form after adding
            setName("");
            setStatus("Not Started");
            setDeadline("");
            setDescription("");
            setError(null);

            if (nameInputRef.current) {
                nameInputRef.current.focus();
            }
        } catch (error) {
            console.error("Error adding task:", error);
            setError("Failed to add task. Please try again.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg mb-6"
        >
            <h3 className="text-xl font-semibold mb-4">Add New Task</h3>

            {error && (
                <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
            )}

            <label className="block mb-2">
                Name <span className="text-red-500">*</span>
                <input
                    ref={nameInputRef}
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

            <button
                type="submit"
                className="px-4 py-2 rounded bg-sky-500 text-white hover:bg-sky-600 transition"
            >
                Add Task
            </button>
        </form>
    );
}

export default AddTask;
