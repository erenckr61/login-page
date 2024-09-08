import React from "react";
import {Route,Routes} from 'react-router-dom';
import RegisterForm from "./components/RegisterForm";


const App = () => {
  const routers = [
    {path:"/registration", component:RegisterForm},
  ]


  return (
    <div className="App">
      <Routes>
        {
          routers.map((router, index) => {
           return <Route key={`router${index}`} path={router.path} element={<router.component />}></Route>
            
          })
        }
      </Routes>
    </div>
  );
}
export default App;
