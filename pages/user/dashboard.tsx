import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Image from "next/image";
const Dashboard = () => {
  const todos = [
    "Inventory System Optimization",
    "Campaign Planning",
    "Social Media Update",
    "Product Description",
    "CS Training",
    "Customer Feedback",
  ];

  const localizer = momentLocalizer(moment);
  const events: any[] = []; // to add events

  return (
    <div className="flex flex-col h-screen ">
      {/* Overall Progress */}
      <div className="w-full p-4 text-center items-center flex justify-center border-b border-white">
        <Image
          src="/component2.png"
          alt="Overall Progress"
          width={800}
          height={200}
        />
      </div>
      <div className="w-full bg-white h-3"></div>
      <div className="flex flex-grow">
        <div className="w-1/4 p-4 ">
          <h1 className="text-2xl font-bold text-purple-700 mb-4">
            Seller&apos;s Todo Lists
          </h1>
          {todos.map((todo, index) => (
            <div
              key={index}
              className="bg-purple-200 rounded-lg p-2 mb-4 flex justify-between items-center cursor-pointer"
            >
              <p className="text-purple-600">{todo}</p>
            </div>
          ))}
        </div>

        {/* Progress tree */}
        <div className="w-2/4 p-4 ">
          <Image
            src="/component.png"
            alt="barchart"
            width={500}
            height={800}
          ></Image>
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
