import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
import { PostProvider } from './Context/PostContext';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <PostProvider>
      
    <div className="w-[100%]  min-h-screen flex flex-col bg-gray-200">
      {/* Main container that covers full screen */}
      <div className="w-full flex-grow flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow w-full">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
    </PostProvider>
  ) : null;
}

export default App;
