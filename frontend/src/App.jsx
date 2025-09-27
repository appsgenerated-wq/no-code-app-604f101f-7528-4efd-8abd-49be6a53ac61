import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import './index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest();

  useEffect(() => {
    const checkConnectionAndSession = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);

      if (result.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const user = await manifest.from('User').me();
          if (user) {
            setCurrentUser(user);
            setCurrentScreen('dashboard');
          }
        } catch (error) {
          console.log('No active session found.');
          setCurrentUser(null);
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', result.error);
      }
    };

    checkConnectionAndSession();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const user = await manifest.from('User').me();
      setCurrentUser(user);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setCurrentUser(null);
    setCurrentScreen('landing');
  };

  const loadRestaurants = async () => {
    try {
      const response = await manifest.from('Restaurant').find({ include: ['owner'] });
      setRestaurants(response.data);
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    }
  };

  const createRestaurant = async (restaurantData) => {
    try {
      const newRestaurant = await manifest.from('Restaurant').create(restaurantData);
      setRestaurants([newRestaurant, ...restaurants]);
    } catch (error) {
      console.error('Failed to create restaurant:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm text-gray-600 font-medium">
          {backendConnected ? 'Backend Connected' : 'Backend Disconnected'}
        </span>
      </div>
      
      {currentScreen === 'landing' || !currentUser ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <DashboardPage 
          user={currentUser} 
          restaurants={restaurants} 
          onLogout={handleLogout} 
          onLoadRestaurants={loadRestaurants}
          onCreateRestaurant={createRestaurant}
        />
      )}
    </div>
  );
}

export default App;
