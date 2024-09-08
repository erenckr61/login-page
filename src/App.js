import React, { useEffect } from "react";
import {Route,Routes, useNavigate} from 'react-router-dom';
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/dashboard";



const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // İlk açılışta registration sayfasına yönlendirir
    navigate('/dashboard');
  }, [navigate]);

  const routers = [
    {path:"/registration", component:RegisterForm},
    {path: "/dashboard", component:Dashboard},
  ];


  return (
    <div className="App">
      <Routes>
        {
          routers.map((router, index) => {
           return <Route key={`router${index}`} path={router?.path} element={<router.component />}></Route>
            
          })
        }
      </Routes>
    </div>
  );
}
export default App;
