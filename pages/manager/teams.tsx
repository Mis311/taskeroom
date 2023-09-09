// import { useState } from "react";
// // import { teamsData } from "../../data/teamsData";

// export default function ManagerTeams() {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div className="grid grid-cols-2 gap-4 ml-80">
//       {teamsData.map((team, i) => (
//         <div
//           key={i}
//           className={`m-4 bg-white shadow-lg rounded-lg transform transition-transform duration-200 
//           ${isHovered ? "scale-105" : ""}`}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <div className="p-4">
//             <h2 className="font-bold text-lg mb-2">{team.teamName}</h2>

//             {team.users.map((user, j) => (
//               <div key={j} className="w-full bg-gray-200 p-2 rounded-md mb-2">
//                 <h3>{user.name}</h3>
//                 <p>Productivity Score: {user.productivityScore}</p>
//                 <p>Average Ship Speed: {user.averageShipSpeed}</p>
//                 <p>Task Points: {user.taskPoints}</p>
//                 <div className={`icon-${user.performance}`}></div>
//                 <h4>Completed Tasks:</h4>
//                 <ul>
//                   {user.tasks.map((task, k) => (
//                     <li key={k}>{task}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
