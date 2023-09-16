import React from "react";

interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => (
  <div className="card bg-white rounded-lg p-4 shadow-md">
    <h2 className="card-title text-xl font-semibold">{title}</h2>
    <p className="card-content text-gray-600">{content}</p>
  </div>
);

const Achievements = () => {
  const achievementsData = [
    { title: "Achievement 1", content: "Description of Achievement 1" },
    { title: "Achievement 2", content: "Description of Achievement 2" },
    { title: "Achievement 3", content: "Description of Achievement 3" },
    // Add more achievements as needed
  ];

  return (
    <div className="container mx-auto mt-4 flex flex-row space-x-4">
      {achievementsData.map((achievement, index) => (
        <Card
          key={index}
          title={achievement.title}
          content={achievement.content}
        />
      ))}
    </div>
  );
};

export default Achievements;
