"use client";
import React, { useEffect, useRef, useState } from "react";
import Layout from "@/components/layouts/layout";
import { useAuth } from "../firebase/AuthContext";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import Image from "next/image";
const Home: React.FC = () => {
  const { currentUser, googleSignIn, login, signUpUser, logOut } = useAuth();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [role, setRole] = useState<"user" | "manager">("user");
  const [showEmailSignUp, setShowEmailSignUp] = useState(false);
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [error, setError] = useState(false);

  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const confirmPassRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleConfirmPassCheck = () => {
    const password = passwordRef.current.value;
    const confirmPass = confirmPassRef.current.value;

    if (confirmPass === "") {
      confirmPassRef.current.style.border = "none";
      return;
    }

    if (password !== confirmPass) {
      confirmPassRef.current.style.border = "1px solid red";
    } else {
      confirmPassRef.current.style.border = "1px solid green";
    }
  };

  useEffect(() => {

    if (currentUser && currentUser.displayName) {
      router.push(`/${currentUser.displayName}/dashboard`);
    }
  }, [currentUser, router]);

  const handleGoogleLogin = async () => {
    if (showSignUp) {
      await googleSignIn(role);
      router.push(`/${role}/dashboard`);
    } else {
      await googleSignIn();
    }
    setShowLogin(false);
  };
  const handleLoginEmailPassword = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    await login(email, password);
    setShowLogin(false);
  };

  const handleSignUp = async () => {
    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPass = confirmPassRef.current.value;

    if (username === "" || email === "" || password === "" || confirmPass === "") {
      return;
    } else if (password !== confirmPass) {
      return;
    } else {
      try {
        await signUpUser(email, password, role, username);
        setShowSignUp(false);
        router.push(`/${role}/dashboard`);
      } catch (error) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    }
  };

  return (
    <Layout header={true} navbar={false}>
      <div className="flex flex-col items-center ml-16 mr-16 justify-center  max-h-screen  ${navbar ? 'ml-64' : ''}`">
        <div className="flex flex-col md:flex-row md:space-x-5 space-y-5  md:space-y-0 ">

          <section className="flex flex-col items-center text-left md:w-2/5 mt-10">
            <h2 className="text-5xl font-middle font-semibold leading-relaxed p-2 text-left">
              Automate and go ahead of your life
            </h2>

            <p className="mt-4 text-xl text-gray-500 text-left">
              Let&apos;s automate and complete your tasks together with AI and
              automate execution sessions with your new friends.
            </p>

            <div className="flex items-center justify-center w-full flex-col md:flex-row md:space-y-0 md:space-x-4">
              <input
                className="w-full px-4 mt-4 py-2 border-2 rounded-lg focus:outline-none focus:border-pink-400 text-center w-1/2 md:w-2/3"
                placeholder="Set your goal and get rewards"
              />
            </div>

            <div className="flex justify-center gap-2 px-4 py-2 mt-4 w-full">
              {" "}
              <button
                onClick={() => {
                  setShowLogin(true);
                }}
                className="px-4 py-2 text-white rounded-lg bg-green-400 hover:bg-green-500 transition-colors duration-300"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShowSignUp(true);
                }}
                className="px-4 py-2 text-white rounded-lg bg-pink-400 hover:bg-pink-500 transition-colors duration-300"
              >
                Sign Up
              </button>
            </div>
          </section>

          <section className="flex flex-col items-center justify-center ml-12 mt-10">
            <div className="w-full">
              <Image
                src="/calendar.png"
                alt="calendar"
                width={300}
                height={200}
                className="object-cover"
              />
            </div>
          </section>

          <section className="flex flex-col items-center  w-2/5 ">
            <h2 className="text-3xl text-right mt-10 ">
              May <span className="text-6xl">23rd</span> 2023
            </h2>

            <ul className="flex flex-col space-y-4 mt-10">
              <li className="text-2xl border-b border-gray-400">todo1</li>
              <li className="text-2xl border-b border-gray-400">todo2</li>
              <li className="text-2xl border-b border-gray-400">todo3</li>
            </ul>

            <button onClick={() => {
                  setShowSignUp(true);
                }} className="w-16 h-16 mt-12 text-white bg-black rounded-full cursor-pointer">
              ➡
            </button>
            <p>Automate</p>
          </section>
        </div>
        {showLogin ? (
          <div className="bg-white w-full h-full absolute bg-opacity-40 flex items-center justify-center">
            {showEmailLogin ? (
              <div className="w-96 h-64 bg-[#efefef] rounded-md shadow-md flex items-center justify-center gap-2 flex-col  ">
                <input
                  type="email"
                  ref={emailRef}
                  placeholder="Email..."
                  className="rounded-md outline-none shadow-md p-1 w-[280px] font-rubik"
                />

                <input
                  type="password"
                  ref={passwordRef}
                  placeholder="Password..."
                  className="rounded-md outline-none w-[280px] shadow-md p-1 font-rubik"
                />

                <div className="w-full  flex flex-row items-center gap-2 justify-center">
                  <button
                    onClick={() => {
                      setShowEmailLogin(false);
                    }}
                    className="font-rubik text-xs underline text-gray-400"
                  >
                    cancel
                  </button>
                  <button
                    onClick={handleLoginEmailPassword}
                    className="bg-green-200 p-2 shadow-md rounded-md font-rubik"
                  >
                    Log In
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-96 h-64 bg-[#efefef] rounded-md shadow-md flex items-center justify-center gap-2 flex-col relative">
                <button
                  onClick={() => {
                    setShowLogin(false);
                  }}
                  className="text-black p-2 text-xs bg-white rounded-md shadow-md absolute right-2 top-2 hover:bg-gray-200 duration-200"
                >
                  back
                </button>
                <h1 className="text-black">Log In Method</h1>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      handleGoogleLogin;
                    }}
                  >
                    <FcGoogle className="h-14 w-14 rounded-md shadow-md hover:bg-gray-200 duration-200 p-1" />
                  </button>
                  <button
                    onClick={() => {
                      setShowEmailLogin(true);
                    }}
                  >
                    <AiOutlineMail className="h-14 w-14 rounded-md shadow-md hover:bg-gray-200 duration-200 text-black p-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
        {showSignUp ? (
          <div className="bg-white w-full h-full absolute bg-opacity-40 flex items-center justify-center">
            {showEmailSignUp ? (
              <div className="w-96 h-64 bg-[#efefef] rounded-md shadow-md flex items-center justify-center gap-2 flex-col relative">
                <input
                  type="text"
                  ref={usernameRef}
                  placeholder="Username..."
                  className="rounded-md outline-none shadow-md p-1 w-[280px] font-rubik"
                />
                <input
                  type="email"
                  ref={emailRef}
                  placeholder="Email..."
                  className="rounded-md outline-none shadow-md p-1 w-[280px] font-rubik"
                />
                <input
                  type="password"
                  ref={passwordRef}
                  placeholder="Password"
                  className="rounded-md outline-none w-[280px] shadow-md p-1 font-rubik"
                />
                <input
                  type="password"
                  onChange={handleConfirmPassCheck}
                  ref={confirmPassRef}
                  placeholder="Confirm Password"
                  className="rounded-md outline-none w-[280px] shadow-md p-1 font-rubik"
                />
                <div className="w-full flex flex-row items-center gap-2 justify-center">
                  <button
                    onClick={() => {
                      setShowEmailSignUp(false);
                    }}
                    className="font-rubik text-xs underline text-gray-400"
                  >
                    cancel
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="bg-green-200 p-2 shadow-md rounded-md font-rubik"
                  >
                    Finish
                  </button>
                </div>
                {error ? (
                  <h1 className="w-full h-5 flex items-center justify-center text-xs text-red-400">
                    email is invalid or already taken
                  </h1>
                ) : null}
              </div>
            ) : (
              <div className="w-96 h-64 bg-[#efefef] rounded-md shadow-md flex items-center justify-center gap-2 flex-col relative">
                <button
                  onClick={() => {
                    setShowSignUp(false);
                  }}
                  className="text-black p-2 text-xs bg-white rounded-md shadow-md absolute right-2 top-2 hover:bg-gray-200 duration-200"
                >
                  back
                </button>
                <h1 className="text-black">Choose your role</h1>
                <div className="flex gap-4">
                  {role === "user" ? (
                    <button className="text-black p-2 shadow-md rounded-md bg-gray-200">
                      User
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setRole("user");
                      }}
                      className="text-black p-2 shadow-md rounded-md bg-white hover:bg-gray-200 duration-200"
                    >
                      User
                    </button>
                  )}
                  {role === "manager" ? (
                    <button className="text-black p-2 shadow-md rounded-md bg-gray-200">
                      Manager
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setRole("manager");
                      }}
                      className="text-black p-2 shadow-md rounded-md bg-white hover:bg-gray-200 duration-200"
                    >
                      Manager
                    </button>
                  )}
                </div>
                <h1 className="text-black">Sign Up Method</h1>
                <div className="flex gap-4">
                  <button onClick={handleGoogleLogin}>
                    <FcGoogle className="h-14 w-14 rounded-md shadow-md hover:bg-gray-200 duration-200 p-1" />
                  </button>
                  <button
                    onClick={() => {
                      setShowEmailSignUp(true);
                    }}
                  >
                    <AiOutlineMail className="h-14 w-14 rounded-md shadow-md hover:bg-gray-200 duration-200 text-black p-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default Home;
