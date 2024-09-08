// kullanıcı bilgilerini localStorage'dan okuyup kullanıcıya özel bir karşılama mesajı göstereceğiz.
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Tab } from '@headlessui/react';
import HorizontalBar from '../components/HorizontalBar'; 

 const Dashboard = () => {
    const[user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
       // Fetch user data from local storage when the dashboard loads
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }else {
          // Redirect to login if no user is found
          navigate("/");
        }
      }, [navigate]);

      const handleLogout = () => {
        // Clear user data from local storage
        localStorage.removeItem("user");
        navigate("/"); // Redirect back to login screen
      };


      return (
        <div className="h-screen flex flex-col bg-gray-200 p-6">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold mb-4">
              Welcome, {user ? user.firstName || user.email : "Guest"}!
            </h1>
            <Tab.Group>
              <Tab.List className="flex space-x-1 bg-blue-900/5 p-1 rounded-md mb-6">
                <Tab
                  className={({ selected }) =>
                    selected
                      ? 'w-full py-2.5 text-sm leading-5 font-medium text-white bg-green-600 rounded-lg'
                      : 'w-full py-2.5 text-sm leading-5 font-medium text-black bg-gray-200 rounded-lg'
                  }
                >
                  Overview
                </Tab>
                <Tab
                  className={({ selected }) =>
                    selected
                      ? 'w-full py-2.5 text-sm leading-5 font-medium text-white bg-green-600 rounded-lg'
                      : 'w-full py-2.5 text-sm leading-5 font-medium text-black bg-gray-200 rounded-lg'
                  }
                >
                  Statistics
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Overview</h2>
                    <HorizontalBar label="Sales" value={75} />
                    <HorizontalBar label="Visitors" value={50} />
                    <HorizontalBar label="Conversions" value={90} />
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Statistics</h2>
                    {/* Diğer istatistik bileşenleri buraya eklenebilir */}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      );
    };
    
    export default Dashboard;