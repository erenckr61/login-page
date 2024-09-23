import React from "react";
import chipImage from "../assets/chip-design.png";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import { useNavigate } from "react-router-dom"; // useNavigate hooku eklendi.

import { useDispatch, useSelector } from "react-redux";
import { registerUser,loginUser } from "../redux/authSlice";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedTab, setSelectedTab] = useState(1); // 0: Login, 1: Sign Up

  const dispatch = useDispatch();
  const navigate = useNavigate(); // yönlendirme için hook

  const {loading, token, user, error} = useSelector((state) => state.auth);
  
    // Login işlemi
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }
    
    console.log(email+"------"+password);
    dispatch(loginUser({email, password})).then(({payload}) => {
      console.log('Login Response:', payload);
      if(payload) {//payload.token dı içerisi onceden
        navigate("/dashboard");
      } else {
        alert("Invalid email or password.");
      }
    });
    // Kullanıcı bilgilerini localStorage'dan al
    // const storedUser = JSON.parse(localStorage.getItem("user"));

    // Kullanıcı bilgilerini doğrula
    // if (storedUser && storedUser.email === email && storedUser.password === password) {
    //   navigate("/dashboard"); 
    // } else {
    //   alert("Invalid email or password.");
    // }
    // Login işlemi başarılıysa bilgileri kaydedip yönlendir
    // localStorage.setItem("user", JSON.stringify({ email }));

    // navigate("/dashboard"); // Dashboard sayfasına yönlendir
  };

  // Kayıt işlemi
  const handleSignup = (e) => {
    e.preventDefault();

    const minLength = 8;
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasDigit = /\d/;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    if (password.length < minLength) {
      alert("Password must be at least 8 characters long.");
      return;
    }
  
    if (!hasUppercase.test(password)) {
      alert("Password must include at least one uppercase letter.");
      return;
    }
  
    if (!hasLowercase.test(password)) {
      alert("Password must include at least one lowercase letter.");
      return;
    }
  
    if (!hasDigit.test(password)) {
      alert("Password must include at least one number.");
      return;
    }
    
    dispatch(registerUser({firstName, lastName, email, password})).then(({payload}) => {
       console.log("kayıt yanıtı:", payload);
      if (payload){
        setSelectedTab(0);
        alert("Account created successfully! Please log in.");
        setEmail("");
        setPassword("");
       
      } 
    });
  
    // Kullanıcı bilgilerini localStorage'a kaydet
    // localStorage.setItem('user', JSON.stringify({ firstName, lastName, email, password }));
   
    //Login alanlarının temizlenmesi
    // setEmail("");
    // setPassword("");

    // Sign Up işleminden sonra Login sekmesine geç
    // setSelectedTab(0);
  
    // Login işlemi gerçekleştir
    // handleLoginFromSignup();
  };
  

  // const handleLoginFromSignup = () => {
  //    // Giriş yapmış kullanıcıyı kaydet
  //   localStorage.setItem('user', JSON.stringify({ email, password }));
  //   // Dashboard sayfasına yönlendir
  //   navigate('/dashboard');
  // };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 ">
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center">
        {/* Form Section */}
        <div className="w-full md:w-1/2">
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
            <Tab.List className="flex space-x-1 bg-blue-900/5 p-1 rounded-md">
              <Tab
                className={({ selected }) =>
                  selected
                    ? "w-full py-2.5 text-sm leading-5 font-medium text-white bg-green-600 rounded-lg"
                    : "w-full py-2.5 text-sm leading-5 font-medium text-black bg-gray-200 rounded-lg"
                }
              >
                Login
              </Tab>
              <Tab
                className={({ selected }) =>
                  selected
                    ? "w-full py-2.5 text-sm leading-5 font-medium text-white bg-green-600 rounded-lg"
                    : "w-full py-2.5 text-sm leading-5 font-medium text-black bg-gray-200 rounded-lg"
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
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="flex items-center mt-1">
                      <FaUser
                        className="h-4 w-4 text-black absolute ml-3"
                        aria-hidden="true"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-8 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="flex items-center mt-1">
                      <FaLock
                        className="h-4 w-4 text-black absolute ml-3"
                        aria-hidden="true"
                      />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-8 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter your Password"
                      />
                    </div>
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
                <h1 className="text-3xl font-bold mb-4 text-center">
                  Create account
                </h1>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <div className="flex items-center mt-1">
                      <FaUser
                        className="h-4 w-4  text-black  absolute ml-3"
                        aria-hidden="true"
                      />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="pl-8 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <div className="flex items-center mt-1">
                      <FaUser
                        className="h-4 w-4 text-black absolute ml-3"
                        aria-hidden="true"
                      />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="pl-8 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="flex items-center mt-1">
                      <FaEnvelope
                        className="h-4 w-4  text-black  absolute ml-3"
                        aria-hidden="true"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-8 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter your Email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="flex items-center mt-1">
                      <FaLock
                        className="h-4 w-4  text-black  absolute ml-3"
                        aria-hidden="true"
                      />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-8 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="********"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="flex items-center mt-1">
                      <FaLock
                        className="h-4 w-4  text-black  absolute ml-3"
                        aria-hidden="true"
                      />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-8 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="********"
                      />
                    </div>
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
};
export default RegisterForm;
