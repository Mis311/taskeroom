import React from "react";

// Function to parse the user info and extract todo items
const parseUserInfo = (userInfo:any) => {
  // Split the user info string into lines
  const lines = userInfo.split("\n");

  // Filter out empty lines and lines that start with "name:"
  const todoLines = lines.filter(
    (line:any) => line.trim() !== "" && !line.startsWith("name:")
  );

  return todoLines.map((line:any, index:any) => (
    <li key={index} className="list-disc ml-4">
      {line}
    </li>
  ));
};

const Achievements = () => {
  const achievementsData = [
    {
      title: "Name: amandalexbr ",
      content: "   My goals for this week:",
      imageSrc: "/banner.png",
      userInfo: `

     
        - Inviting more people for my front end project;
        - Filling out forms in Analyst position job application;
        - Conduct sprint planning session in my team;
        - Finish the mocked DB in my group project;
        - Finish part 0 of The Standard open-source translation to Portuguese.
        - Close more important stories in our sprint
        - Start refining my React project
       `,
      score: "Total Score: 3",
    },
    {
      title: " Name: miki ",
      content: "Goal and achievements",
      imageSrc: "/banner2.png",
      userInfo: `
     
        - Typing my redux selectors and actions
        - Type predicate functions & learn Intersections + return types
        - Typing redux cart files and typing out firebase utils
        - Typing root state, third-party libraries, custom middleware, and categories saga
        - Typing the rest of sagas and button, input, and form components
        - Typing my SVG imports and the payment form
       `,
      score: "Total Score: 1",
    },
    {
      title: " Name: cryingDebugger",
      content: "Goal and achievements",
      imageSrc: "/banner4.png",
      userInfo: `
       
        - Complete my bank coding project
        - Study and complete a project on sockets
        - Continue my JavaScript project
        - Study web3 concepts and start building my own platform
        - Read and prepare for a chrome extension project paying close attention to webRTC
        - General Review and Solving some JS challenges
        - Read on three.js and start implementing some 3d illustrations`,
      score: "Total Score: ?", // You can fill in the score
    },
    {
      title: "  Name: Ley",
      content: "Goal and achievements",
      imageSrc: "/banner6.png",
      userInfo: `
      
        - Study API on Next.js and understand how to write
        - Watch MongoDB tutorial
        - Work on UI of Sign up page and Sign in page
        - Research language to make UI of freeframing
        - API videos x 2
        - Make goal cards on website`,
      score: "Total Score: 3",
    },
    {
      title: "Name: zhivkosh ",
      content: " - My goal for 11.09 - 17.09:",
      imageSrc: "/banner7.png",
      userInfo: `
     
       
        - Node.js lecture + exercises
        - ExpressJS lecture + exercises
        - MongoDB lecture + exercises
        - React.dev Tutorial (React recap: props/state)
        - Web Dev Simplified React: Component Lifecycle
        - Work on personal business website
        - CSS Flexbox exercise
        Score:`, // You can fill in the score
    },
    // Add more achievements as needed
  ];

  return (
    <div className="container mx-auto mt-4 grid grid-cols-2 gap-4">
      {achievementsData.map((achievement, index) => (
        <div key={index} className="card bg-white rounded-lg p-4 shadow-md">
          <h2 className="card-title text-xl font-semibold">
            {achievement.title}
          </h2>
          <p className="card-content text-gray-600">{achievement.content}</p>
          <img
            src={achievement.imageSrc}
            alt={`Image for ${achievement.title}`}
            className="w-full h-auto mt-4"
          />

          <div className="user-info mt-4">
            <h3 className="text-lg font-semibold">User Info</h3>
            <ul className="list-disc list-inside mt-2">
              {parseUserInfo(achievement.userInfo)}
            </ul>
            <p className="text-orange-500  mt-2">{achievement.score}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Achievements;
