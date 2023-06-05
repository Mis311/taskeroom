import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Image from "next/image";

type Event = {
  title: string;
  start: Date;
  end: Date;
};

const Dashboard = () => {
  const todos = [
    "Inventory System Optimization",
    "Campaign Planning",
    "Social Media Update",
    "Product Description",
    "CS Training",
    "Customer Feedback",
  ];

  const aiSuggestSessionTime = () => {
    const start = new Date();
    start.setHours(start.getHours() + Math.random() * 24); // random
    setSuggestedTime(start);
    setIsPopupOpen(true);
  };

  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState<Event[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [suggestedTime, setSuggestedTime] = useState<Date | null>(null);

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt("New Event name");
    if (title)
      setEvents([
        ...events,
        {
          start,
          end,
          title,
        },
      ]);
  };

  const addSuggestedTimeToCalendar = () => {
    let start = new Date();
    let newEvent = { start };

    const end = new Date(suggestedTime!);
    end.setHours(end.getHours() + 1);
    const title = "AI Suggested Session";
    setEvents([
      ...events,
      {
        start,
        end,
        title,
      },
    ]);
    setIsPopupOpen(false);
  };

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
          <Image src="/component.png" alt="barchart" width={500} height={800} />
        </div>
        {/* Schedule booking */}
        <div className="w-1/4  p-4">
          <button
            onClick={aiSuggestSessionTime}
            className="mb-4 bg-purple-600 text-white p-2 rounded"
          >
            AI Suggest Session Time
          </button>
          {isPopupOpen && (
            <div className="absolute z-10 bg-white p-4 rounded shadow-lg">
              <h3 className="mb-2">
                Suggested time: {suggestedTime?.toLocaleString()}
              </h3>
              <button
                onClick={addSuggestedTimeToCalendar}
                className="bg-purple-600 text-white p-2 rounded"
              >
                Add to Calendar
              </button>
            </div>
          )}
          <Calendar
            localizer={localizer}
            selectable
            onSelectSlot={handleSelect}
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
