import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Auth/Login.js';
import {useAuth } from './Components/Auth/AuthContext.js';
import PrivateRoute from './Components/PrivateRoute.js';
import Home from './Components/Home.js';
import Lead from './Components/Leads.js';
import Navbar from './Components/Navbar.js';
import Sidebar from './Components/Sidebar.js';
import "./Components/Common.css"
import CampaignManagement from './Components/CampaignManagement.js';
import CampaignReminder from './Components/CampaignReminder.js';
import Loader from './Components/Loader.js';
import Add from './Components/Campaign/Add.js';
import useApiInterceptor from './Components/Auth/UseApiInterceptor.js';
import ResetPassword from './Components/Auth/ResetPassword.js';
function App() {
  const { isLoggedIn } = useAuth();
  useApiInterceptor();
  return (
    <div className="app">

   {isLoggedIn && <Navbar/>}
   {isLoggedIn &&<Sidebar/>}
   <Loader/>
        <Routes>
        {!isLoggedIn && <><Route path="/" element={<Login />} />
        <Route path="/reset_password/:token"  element={<ResetPassword/>}/>
        </>
        }
          
          <Route path="/" element={<PrivateRoute ><Home/></PrivateRoute>}/>
          <Route path="/campaign-reminder" element={<PrivateRoute ><CampaignReminder/></PrivateRoute>}/>
          <Route path="/leads" element={<PrivateRoute ><Lead/></PrivateRoute>}/>
          <Route path="/campaign-management" element={<PrivateRoute ><CampaignManagement/></PrivateRoute>}/>
          <Route path="/add-campaign" element={<PrivateRoute ><Add/></PrivateRoute>}/>

        </Routes>
  
    </div>
  );
}

export default App;
