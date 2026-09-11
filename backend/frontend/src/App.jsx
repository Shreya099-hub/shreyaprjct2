import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, Home as HomeIcon, IndianRupee } from 'lucide-react';

function App() {
  const [properties, setProperties] = useState([]);
  const [city, setCity] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchProperties = async () => {
    // Note: We will change this URL later when we deploy!
    let url = 'http://localhost:8000/api/properties?';
    if (city) url += `city=${city}&`;
    if (propertyType) url += `property_type=${propertyType}&`;
    if (minPrice) url += `min_price=${minPrice}&`;
    if (maxPrice) url += `max_price=${maxPrice}&`;

    try {
      const response = await axios.get(url);
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center gap-2">
          <HomeIcon size={28} />
          <h1 className="text-2xl font-bold">Indian Properties Search</h1>
        </div>
      </header>

      {/* Search Section */}
      <div className="bg-gray-800 p-8">
        <div className="container mx-auto max-w-4xl bg-white rounded-lg p-6 shadow-lg">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select
                className="w-full border rounded p-2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">All Cities</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select
                className="w-full border rounded p-2"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">Rent & Buy</option>
                <option value="Rent">Rent</option>
                <option value="Buy">Buy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 border rounded p-2"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 border rounded p-2"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
              >
                <Search size={20} /> Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <main className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {properties.length} Properties Found
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <div key={property.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={property.image_url}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 truncate">{property.title}</h3>
                  <span className={`px-2 py-1 text-xs font-bold rounded ${property.property_type === 'Rent' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    For {property.property_type}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>

                <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} /> {property.city}
                  </div>
                  <div>
                    {property.bedrooms} BHK
                  </div>
                  <div>
                    {property.bathrooms} Baths
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                  <div className="flex items-center font-bold text-xl text-gray-900">
                    <IndianRupee size={20} />
                    {property.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;