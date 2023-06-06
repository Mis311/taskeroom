import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Image from "next/image";
import axios from "axios";
import { FaEnvelope, FaCheck } from "react-icons/fa";
import Modal from "react-modal";
import { useAuth } from "../../firebase/AuthContext";

type Event = {
  title: string;
  start: Date;
  end: Date;
};
type ReportType = {
  price: number;
  userId: string;
  taskId: string;
};



type Todo = {
  task: string;
  isChecked: boolean;
};
type Task = {
  task_name: string;
  task_description: string;
};

const Dashboard = () => {
  const {currentUser} = useAuth();
  const [todos, setTodos] = useState<Todo[]>([
    { task: "Inventory System Optimization", isChecked: false },
    { task: "Campaign Planning", isChecked: false },
    { task: "Social Media Update", isChecked: false },
    { task: "Product Description", isChecked: false },
    { task: "CS Training", isChecked: false },
    { task: "Customer Feedback", isChecked: false },
  ]);
  const [selectedManagerTask, setSelectedManagerTask] = useState("");

  const [managerTask, setManagerTask] = useState<Task[]>([]);
  const [showReportButton, setShowReportButton] = useState(false);

  // Function to handle checkbox click
  const handleCheck = (index: any) => {
    const newTodos = [...todos];
    newTodos[index].isChecked = !newTodos[index].isChecked;
    setTodos(newTodos);

    // If all tasks are checked, show the "Report to Manager" button
    setShowReportButton(newTodos.every((todo) => todo.isChecked));
  };

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

  const handleUserCardClick = () => {
    aiSuggestSessionTime();
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

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const fetchManagerTask = async () => {
    



    setIsOpen(true);
    try {
      const response = await axios.get(`http://taskeroom.akubuezeernest.com/task/${currentUser?.uid}`);
      setManagerTask(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="flex flex-col h-screen z-0">
      {/* Overall Progress */}
      <div className="w-full p-4 text-center items-center flex justify-center border-b border-white">
        <Image
          src="/component2.png"
          alt="Overall Progress"
          width={800}
          height={200}
        />
      </div>
      {/* Mail Icon and Task */}
      <div className="absolute right-0 top-0 mr-8 mt-8 w-6 h-6">
        <FaEnvelope
          onClick={fetchManagerTask}
          className="text-gray-500 cursor-pointer w-12 h-12 p-2 absolute right-0 mr-4 "
        />
      </div>
      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Manager Task Modal"
        className="w-1/2 text-right"
      >
        <h2>Manager&apos;s Tasks</h2>
        {managerTask.map((task, index) => (
          <div key={index}>
            <h3>{task.task_name}</h3>
            <p>{task.task_description}</p>
            <button
              onClick={() => setSelectedTask(task.task_name)}
              className="bg-green-500 text-black p-2 rounded"
            >
              Add to Todo List
            </button>
          </div>
        ))}
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 bg-gray-500 text-white p-2 rounded-bl"
        >
          X
        </button>
        <button
          className="bg-purple-200 rounded-lg p-2 mb-4 flex justify-between items-center cursor-pointer"
          onClick={() => {
            if (selectedTask) {
              setTodos([...todos, { task: selectedTask, isChecked: false }]);
              setSelectedTask(null);
              closeModal();
            }
          }}
        >
          Confirm
        </button>
      </Modal>

      <div className="w-full bg-white h-3"></div>
      <div className="flex flex-grow">
        <div className="w-1/4 p-4">
          <h1 className="text-2xl font-bold text-purple-700 mb-4">
            Seller&apos;s Todo Lists
          </h1>
          {todos.map((todo, index) => (
            <div
              key={index}
              className="bg-purple-200 rounded-lg p-2 mb-4 flex justify-between items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={todo.isChecked}
                onChange={() => handleCheck(index)}
              />
              <p
                className={`text-purple-600 ${
                  todo.isChecked ? "line-through" : ""
                }`}
              >
                {todo.task}
              </p>
            </div>
          ))}
          {showReportButton && (
            <button className="bg-green-600 text-white p-2 rounded">
              Report to Manager
            </button>
          )}
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
              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-0 right-0 bg-gray-500 text-white p-2 rounded-bl"
              >
                x
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
          <div
            className="flex items-center mt-4 p-4 border-2 border-gray-300 rounded cursor-pointer"
            onClick={handleUserCardClick}
          >
            <Image
              src="/logo.png"
              alt="My Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            <span>Hanna is available for session!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
