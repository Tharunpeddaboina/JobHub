import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Homepage from './component/Homepage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage ';
import ProtectedRoute from './Pages/ProtectedRoute';
import Profile from './Pages/Profile';
import Searchbar from './component/Searchbar';

import { useSelector } from 'react-redux';
import PostJobs from './Pages/PostJobs';

const App = () => {
  const isLoggedIn = useSelector((state) => state.user?.isLoggedIn); 

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/search" element={<Searchbar />} />
      <Route path="/postjobs" element={<PostJobs />} />
      
      <Route
        path="/profile"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  </>
  );
};

export default App;
