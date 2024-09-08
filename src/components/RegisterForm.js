import React from 'react'
import chipImage from '../assets/chip-design.png';

import { useState } from 'react';
import { Tab } from '@headlessui/react';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt:", username, password);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup attempt:", username, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 ">
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center">
        
        {/* Form Section */}
        <div className="w-full md:w-1/2">
          <Tab.Group>
            <Tab.List className="flex space-x-1 bg-blue-900/5 p-1 rounded-md">
              <Tab
                className={({ selected }) =>
                  selected
                   ? 'w-full py-2.5 text-sm leading-5 font-medium text-white bg-green-600 rounded-lg'
                  : 'w-full py-2.5 text-sm leading-5 font-medium text-black bg-gray-200 rounded-lg'
                }
              >
                Login
              </Tab>
              <Tab
             className={({ selected }) =>
                selected
                  ? 'w-full py-2.5 text-sm leading-5 font-medium text-white bg-green-600 rounded-lg'
                  : 'w-full py-2.5 text-sm leading-5 font-medium text-black bg-gray-200 rounded-lg'
              }
                 
              >
                Sign Up
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-4">
              {/* Login Panel */}
              <Tab.Panel>
                <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter your password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-2 rounded-md font-semibold hover:bg-green-700"
                  >
                    Login
                  </button>
                </form>
              </Tab.Panel>

              {/* Sign Up Panel */}
              <Tab.Panel>
                <h1 className=" text-3xl font-bold mb-4 text-center">Sign Up</h1>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Choose a username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Create a password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-2 rounded-md font-semibold hover:bg-green-700"
                  >
                    Sign Up
                  </button>
                </form>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        {/* Image Section */}
        <div className="hidden md:block w-full md:w-1/2 p-4">
          <img
            src={chipImage}
            alt="Chip Design"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
export default RegisterForm
