import { useState } from 'react'

function ToDoLists() {

    const [lists, setLists] = useState([
        { id: 1, title: "Title1", task: ["Task 1", "Task 2", "Task 3"] },
        { id: 2, title: "Title2", task: ["Task A", "Task B", "Task C"] },
    ])

    const [selectedListId, setSelectedListId] = useState(1); // seçilen listeyi saklaması için state

    const selectedList = lists.find(list => list.id === selectedListId); // seçili liste için bir değişken tanımladım ve bunu lists arrayinden bulup id sini, seçilen id ye eşitledim.


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl flex divide-x">
                {/* Sol Panel */}
                <div className="w-1/3 p-4">
                    <h2 className="text-xl font-bold mb-4">To-Do Lists</h2>
                    <hr />
                    <ul>
                        {lists.map((list) => (
                            <button key={list.id} onClick={() => setSelectedListId(list.id)} //seçili liste setter ile güncellenir.Hangi liste seçilirse onun id'sini seçili listeye attım 
                                className='flex flex-colums m-4'>
                                {list.title} </button>))}
                    </ul>

                </div>

                {/* Sağ Panel */}
                <div className="w-2/3 p-4">
                    {<h2 className="text-xl font-bold mb-4">{selectedList.title}</h2>}
                    <hr />

                    {
                        <ul className="list-disc pl-5 m-4">
                            {selectedList.task.map((task, index) => (
                                <li key={index} className="p-2 bg-gray-100 rounded">
                                    {task}
                                </li>
                            ))}
                        </ul>
                    }


                </div>
            </div>
        </div>
    )
}

export default ToDoLists
