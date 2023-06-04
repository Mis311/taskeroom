import React from "react";
import Layout from "@/components/layouts/layout";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <header className="flex items-center justify-between w-full px-4 py-2">
        <h1 className="text-2xl font-bold text-white">Taskeroom</h1>
        <button className="px-4 py-2 text-white rounded-lg bg-pink-400 hover:bg-pink-500 transition-colors duration-300">
          Login
        </button>
      </header>

      <div className="flex flex-col md:flex-row md:space-x-10 space-y-10 md:space-y-0">
        <section className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold">
            Automate and go ahead of your life
          </h2>

          <p className="mt-4 text-xl text-gray-500">
            Let&apos;s get things done and complete your life together with AI and
            automate execution sessions with your new friends.
          </p>

          <div className="flex items-center justify-center mt-8 space-y-4 flex-col md:flex-row md:space-y-0 md:space-x-4">
            <input
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-pink-400 text-center md:w-2/3"
              placeholder="Input Your Goal"
            />
            <button className="w-full px-4 py-2 text-white rounded-lg bg-pink-400 hover:bg-pink-500 transition-colors duration-300 md:w-auto">
              Automate ➡
            </button>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center">
          <div className="w-64 h-64">
            <img
              className="object-cover w-full h-full"
              src="calendar.png"
              alt="calendar"
            />
          </div>
        </section>

        <section className="flex flex-col items-center">
          <h2 className="text-3xl text-right">
            May <span className="text-6xl">23rd</span> 2023
          </h2>

          <ul className="flex flex-col space-y-2">
            <li className="text-2xl border-b border-gray-400">todo1</li>
            <li className="text-2xl border-b border-gray-400">todo2</li>
            <li className="text-2xl border-b border-gray-400">todo3</li>
          </ul>

          <button className="w-16 h-16 mt-12 text-white bg-black rounded-full cursor-pointer">
            ➡
          </button>
          <p>Automate</p>
        </section>
      </div>
    </div>
  );
};

export default Home;
