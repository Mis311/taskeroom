import React, { useState } from "react";
import { config } from "dotenv";
import Layout from "@/components/layouts/layout";
config();

const TaskMaker = () => {
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [milestones, setMilestones] = useState(false); // For the checkbox state
  const [aiSuggestSchedule, setAISuggestSchedule] = useState(false); // For the checkbox state
  const [aiSuggestAction, setAISuggestAction] = useState(false); // For the checkbox state
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);

  type Choice = {
    text: string;
    // other properties of a choice object
  };
  const handleTaskSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskDescription: taskDescription,
          deadline: deadline,
          milestones: milestones,
        }),
      });

      const data = await response.json();

      if (data && data.result) {
        setAiSuggestions([data.result]);
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Failed to fetch AI suggestions:", error);
    }
    // Add code to add the task to your dashboard or whatever else you need to do with the task
  };

  return (
    <>
     
        <div className="flex flex-col items-center p-4 font-sans text-gray-800 bg-gray-200 w-full min-w-full">
          <h2>Add Your Task</h2>
          <form
            className="flex flex-col mb-8 w-3/5"
            onSubmit={handleTaskSubmit}
          >
            <input
              className="w-full mb-4 p-2 border-none rounded-lg shadow-md"
              type="text"
              placeholder="What is your goal/todo?"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <input
              className="w-full mb-4 p-2 border-none rounded-lg shadow-md"
              type="text"
              placeholder="When is the deadline?e.g. 1month, July 3rd 2023..."
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={milestones}
                onChange={(e) => setMilestones(e.target.checked)}
              />
              Add Milestones
            </label>
            <label>
              <input
                type="checkbox"
                checked={aiSuggestSchedule}
                onChange={(e) => setAISuggestSchedule(e.target.checked)}
              />
              AI Suggest Session Schedule
            </label>
            <label>
              <input
                type="checkbox"
                checked={aiSuggestAction}
                onChange={(e) => setAISuggestAction(e.target.checked)}
              />
              AI Suggest what AI can do
            </label>
            <button
              className="p-2 border-none rounded-lg text-white bg-purple-500 cursor-pointer transition-colors duration-300 hover:bg-purple-600 w-1/5"
              type="submit"
            >
              Confirm Task
            </button>
          </form>

          <h2>AI Suggestions</h2>
          <div className="flex flex-col items-center">
            {aiSuggestions &&
              aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="w-full p-4 mb-4 text-center text-gray-800 bg-white rounded-lg shadow-md"
                >
                  <p>{suggestion}</p>
                </div>
              ))}
          </div>
        </div>
   
    </>
  );
};

export default TaskMaker;
