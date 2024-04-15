import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Heart } from 'lucide-react';

const Forecast = () => {
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('celsius');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = 'e4093872da52f63cd7210a8e35241850';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);

        if (response.data.cod !== 200) {
          setError(response.data.message);
          setLoading(false);
          return;
        }

        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [cityName]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    
    const checkFavorite = async () => {
      try {
        const apiUrl = 'https://weatherapp-backend-j693.onrender.com/api/users/check-favorite';
        const response = await axios.post(apiUrl, { userId, cityName });

        setIsFavorite(response.data.isFavorite);
      } catch (error) {
        console.error('Error checking favorite:', error);
      }
    };

    checkFavorite();
  }, [cityName]);

  const handleAddToFavorites = async () => {
    const userId = localStorage.getItem('userId');


    try {
      const apiUrl = 'https://weatherapp-backend-j693.onrender.com/api/users/toggle-favorite';
      const response = await axios.post(apiUrl, { userId, cityName });

      setIsFavorite(response.data.isFavorite);

      if (response.data.isFavorite) {
        alert('City added to favorites');
      } else {
        alert('City removed from favorites');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Error toggling favorite');
    }
  };

  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/w/${iconCode}.png`;
  };

  const convertTemp = (temp) => {
    if (selectedUnit === 'celsius') {
      return temp;
    } else {
      return (temp * 9/5) + 32;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto mt-20 p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="border p-4 rounded-md">
        <h1 className="text-2xl font-bold mb-4">Weather Forecast for {cityName}</h1>
        <div className="mb-4">
          <label className="mr-2">Temperature Unit:</label>
          <select 
            className="px-2 py-1 border rounded"
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
          >
            <option value="celsius">°C</option>
            <option value="fahrenheit">°F</option>
          </select>
        </div>
        {weatherData && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Current Weather</h2>
            <p>Temperature: {convertTemp(weatherData.main.temp)}°{selectedUnit.toUpperCase()}</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>Pressure: {weatherData.main.pressure} hPa</p>
          </div>
        )}
        <button 
          className={`px-4 py-2 rounded focus:outline-none text-white ${isFavorite ? 'bg-red-500' : 'bg-blue-500'}`}
          onClick={handleAddToFavorites}
        >
          <span>
            <Heart fill={isFavorite ? 'red' : 'none'} />
          </span> 
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>

      <div className="border p-4 rounded-md">
        {/* You can display other details or additional features here */}
        <img 
              src={getWeatherIconUrl(weatherData.weather[0].icon)} 
              alt={weatherData.weather[0].description} 
              className="w-1/2 mx-auto"
            />
      </div>
    </div>
  );
};

export default Forecast;
