import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Image from "next/image";
const Dashboard = () => {
  const todos = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 6"];

  const localizer = momentLocalizer(moment);
  const events: any[] = []; // to add events

  return (
    <div className="flex h-screen ml-56">
      <div className="flex flex-grow">
        <div className="w-1/4 p-4 ">
          <h1 className="text-2xl font-bold text-purple-700 mb-4">
            Seller&apos;s Todo Lists Todo List
          </h1>
          {todos.map((todo, index) => (
            <div
              key={index}
              className="bg-purple-200 rounded-lg p-4 mb-4 flex justify-between items-center"
            >
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

        {/* Progress tree */}
        <div className="w-2/4 p-4 ">
          <p>Progress tree</p>
          <Image src="/barchart.png" alt="progress-tree" width={300} height={400} ></Image>
          {/* to be replaced */}
        </div>
        {/* Schedule booking */}
        <div className="w-1/4  p-4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, width: "100%" }}
            defaultView="day"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
