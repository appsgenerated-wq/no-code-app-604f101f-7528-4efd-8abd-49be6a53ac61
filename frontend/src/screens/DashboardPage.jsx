import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, restaurants, onLogout, onLoadRestaurants, onCreateRestaurant }) => {
  const [newRestaurant, setNewRestaurant] = useState({ title: '', description: '', address: '' });

  useEffect(() => {
    onLoadRestaurants();
  }, [onLoadRestaurants]);

  const handleCreateRestaurant = (e) => {
    e.preventDefault();
    onCreateRestaurant(newRestaurant);
    setNewRestaurant({ title: '', description: '', address: '' });
  };

  const isOwner = user.role === 'owner';

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">FoodApp Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome, {user.name}! ({user.role})</p>
          </div>
          <div className="flex items-center space-x-4">
             <a 
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              Admin Panel
            </a>
            <button 
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isOwner && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create a New Restaurant</h2>
            <form onSubmit={handleCreateRestaurant} className="space-y-4">
              <input
                type="text"
                placeholder="Restaurant Name"
                value={newRestaurant.title}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <textarea
                placeholder="Description"
                value={newRestaurant.description}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, description: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows="3"
              />
              <input
                type="text"
                placeholder="Address"
                value={newRestaurant.address}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, address: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
                Add Restaurant
              </button>
            </form>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Restaurants</h2>
          {restaurants.length === 0 ? (
            <p className="text-gray-500">No restaurants found. {isOwner ? 'Create one above!' : 'Check back later!'}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map(restaurant => (
                <div key={restaurant.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                    {/* Placeholder for heroImage - Manifest handles image URLs */}
                    Image
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900">{restaurant.title}</h3>
                    <p className="text-gray-600 text-sm mt-1 truncate">{restaurant.description}</p>
                    <p className="text-gray-500 text-xs mt-2">{restaurant.address}</p>
                     <p className="text-xs text-gray-400 mt-2">Owner: {restaurant.owner?.name || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
