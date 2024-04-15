import React, { useState, useEffect } from 'react';
import { ArrowDownUpIcon } from 'lucide-react';

const Table = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [limit, setLimit] = useState(40);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleCityClick = (cityName) => {
    const url = `/forecast/${encodeURIComponent(cityName)}`;
    window.open(url, '_blank');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}&start=${(currentPage - 1) * limit}&q=${searchQuery}`);
      const data = await response.json();
      console.log(data);
      if (data.results.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }
      
      const formattedCities = data.results.map(city => ({
        ...city,
        lat: city.coordinates ? city.coordinates.lat : 'N/A',
        lon: city.coordinates ? city.coordinates.lon : 'N/A'
      }));
      
      setCities(prevCities => [...prevCities, ...formattedCities]);
      setFilteredCities(prevFilteredCities => [...prevFilteredCities, ...formattedCities]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    if (sortBy) {
      const sortedCities = [...filteredCities].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
      setFilteredCities(sortedCities);
    }
  }, [sortBy, sortOrder, filteredCities]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 5 &&
        hasMore &&
        !loading
      ) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, loading]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
    setCities([]);
    setFilteredCities([]);
    setHasMore(true);
  
    try {
      const isIdQuery = /^\d+$/.test(query);
      
      let url;
      if (isIdQuery) {
        url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records/${query}`;
      } else {
        url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=147043&start=0&q=${query}`;
      }
  
      const response = await fetch(url);
      const data = await response.json();
  
      if (isIdQuery) {
        const cityData = {
          ...data,
          lat: data.coordinates ? data.coordinates.lat : 'N/A',
          lon: data.coordinates ? data.coordinates.lon : 'N/A'
        };
        setCities([cityData]);
        setFilteredCities([cityData]);
      } else {
        const formattedCities = data.results.map(city => ({
          ...city,
          lat: city.coordinates ? city.coordinates.lat : 'N/A',
          lon: city.coordinates ? city.coordinates.lon : 'N/A'
        }));
        setCities(formattedCities);
        setFilteredCities(formattedCities);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleSort = (columnName) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnName);
      setSortOrder('asc');
    }
  };

  return (
    <div className="container mx-auto mt-24 p-4">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search city..."
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <table className="w-full border-collapse border border-gray-500">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-500 px-4 py-2 cursor-pointer">City Name<span onClick={() => handleSort('name')}><ArrowDownUpIcon size={24} fill="black" /></span></th>
            <th className="border border-gray-500 px-4 py-2 cursor-pointer">Country <span onClick={() => handleSort('cou_name_en')}><ArrowDownUpIcon size={24} fill="black" /></span></th>
            <th className="border border-gray-500 px-4 py-2 cursor-pointer">Timezone <span onClick={() => handleSort('timezone')}><ArrowDownUpIcon size={24} fill="black" /></span></th>
            <th className="border border-gray-500 px-4 py-2 cursor-pointer">Latitude <span onClick={() => handleSort('lat')}><ArrowDownUpIcon size={24} fill="black" /></span></th>
            <th className="border border-gray-500 px-4 py-2 cursor-pointer">Longitude <span onClick={() => handleSort('lon')}><ArrowDownUpIcon size={24} fill="black" /></span></th>
          </tr>
        </thead>
        <tbody>
          {filteredCities.map((city, index) => (
            <tr key={`${city.geoname_id}_${index}`} className="hover:bg-gray-100">
              <td className="border border-gray-500 px-4 py-2">
                <a onClick={() => handleCityClick(city.name)}>
                  {city.name}
                </a>
              </td>
              <td className="border border-gray-500 px-4 py-2 cursor-pointer">{city.cou_name_en}</td>
              <td className="border border-gray-500 px-4 py-2">{city.timezone}</td>
              <td className="border border-gray-500 px-4 py-2">{city.lat}</td>
              <td className="border border-gray-500 px-4 py-2">{city.lon}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <div className="text-center mt-4">Loading...</div>}
      {!hasMore && <div className="text-center mt-4">No more data to load</div>}
    </div>
  );
};

export default Table;
