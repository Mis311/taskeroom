import React from 'react'

const Dashboard = () => {
  const todos = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 6"];
  
  return (
    <div className="flex h-screen ml-80">
     

      <div className="flex flex-grow">
        <div className="w-1/3 p-4 overflow-y-scroll">
          <h1 className="text-2xl font-bold text-purple-700 mb-4">Seller's Todo List</h1>
          {todos.map((todo, index) => (
            <div key={index} className="bg-purple-200 rounded-lg p-4 mb-4 flex justify-between items-center">
              <p className="text-purple-700">{todo}</p>
              <div>
                <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder for other contents */}
        <div className="w-2/3 bg-gray-200 p-4 overflow-y-scroll">
          <p>Other contents here...</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
