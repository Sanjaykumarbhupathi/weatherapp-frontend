import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart } from 'lucide-react';

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const apiUrl = 'https://weatherapp-backend-j693.onrender.com/api/users/get-favorites';
        const response = await axios.post(apiUrl, { userId });

        setFavorites(response.data.favorites);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError('Error fetching favorites');
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (cityNameToRemove) => {
    const userId = localStorage.getItem('userId');
    
    try {
      const apiUrl = 'https://weatherapp-backend-j693.onrender.com/api/users/remove-favorite';
      const response = await axios.post(apiUrl, { userId, cityName: cityNameToRemove });
      
      if (response.data.success) {
        setFavorites(prevFavorites => prevFavorites.filter(city => city !== cityNameToRemove));
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      alert('Error removing favorite');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((cityName, index) => (
          <div key={index} className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">
              <a href={`/forecast/${cityName}`} className="cursor-pointer" target='_blank'>
                {cityName}
              </a>
            </h2>
            <button 
              className="text-red-500 hover:text-red-700"
              onClick={() => handleRemoveFavorite(cityName)}
            >
              <span><Heart fill="red" /></span> Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavorites;
