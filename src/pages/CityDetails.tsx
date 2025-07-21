/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchWeather } from '../api/weather';
import UnitToggle from '../components/UnitToggle';
import data from '../data/data.json';
import type { City } from '../types/city';

export default function CityDetails() {
  const { name } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [weather, setWeather] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const unit = (searchParams.get('unit') === 'imperial' ? 'imperial' : 'metric') as 'metric' | 'imperial';
  const city = (data.cities as City[]).find(c => c.name.toLowerCase() === decodeURIComponent(name || '').toLowerCase());

  useEffect(() => {
    if (city) {
      setIsLoading(true);
      fetchWeather(city.coords.lat, city.coords.lng)
        .then(setWeather)
        .catch((error) => {
          console.error('Error loading weather:', error);
          setWeather(null);
        })
        .finally(() => setIsLoading(false));
    }
  }, [city]);

  const forecastData = useMemo(() => {
    if (!weather?.forecast?.forecastday) return [];
    
    return weather.forecast.forecastday.slice(1, 4).map((day: any) => ({
      date: day.date,
      icon: day.day.condition.icon.startsWith('http') ? day.day.condition.icon : `https:${day.day.condition.icon}`,
      condition: day.day.condition.text,
      temperature: unit === 'metric'
        ? Math.round(day.day.avgtemp_c) + '°C'
        : Math.round(day.day.avgtemp_f) + '°F'
    }));
  }, [weather?.forecast, unit]);

  function handleUnitChange(newUnit: 'metric' | 'imperial') {
    setSearchParams({ unit: newUnit });
  }

  if (!city) return <div>City not found</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-6 lg:px-12 xl:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <button 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 hover:text-blue-600 hover:border-blue-300 group"
            onClick={() => navigate(`/?unit=${unit}`)}
          >
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Cities</span>
          </button>
        </div>
        <div className="flex justify-end mb-6">
          <UnitToggle unit={unit} onUnitChange={handleUnitChange} />
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${city.image})` }} />
          <div className="p-4 sm:p-6 flex-1 flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{city.name}</h1>
            <h2 className="text-lg sm:text-xl text-gray-600">{city.country}</h2>
            <p className="mt-2 text-gray-700 text-sm sm:text-base">{city.description}</p>
            
            {isLoading ? (
              <div className="mt-4 flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-gray-600">Chargement de la météo...</span>
              </div>
            ) : weather ? (
              <div className="mt-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={weather.current.condition.icon.startsWith('http') ? weather.current.condition.icon : `https:${weather.current.condition.icon}`} 
                    alt={weather.current.condition.text} 
                    className="w-12 h-12 sm:w-16 sm:h-16" 
                  />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold">
                      {unit === 'metric'
                        ? Math.round(weather.current.temp_c) + '°C'
                        : Math.round(weather.current.temp_f) + '°F'}
                    </div>
                    <div className="capitalize text-gray-600 text-sm sm:text-base">{weather.current.condition.text}</div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Humidity: {weather.current.humidity}% | Wind: {unit === 'metric'
                        ? Math.round(weather.current.wind_kph) + ' km/h'
                        : Math.round(weather.current.wind_mph) + ' mph'}
                    </div>
                  </div>
                </div>
                {forecastData.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2 text-sm sm:text-base">Forecast (next 3 days):</h3>
                    <div className="flex gap-2 sm:gap-4">
                      {forecastData.map((day: any, idx: number) => (
                        <div key={idx} className="flex flex-col items-center bg-gray-100 rounded-lg p-2 w-16 sm:w-20">
                          <div className="text-xs text-gray-500">{day.date}</div>
                          <img src={day.icon} alt={day.condition} className="w-6 h-6 sm:w-8 sm:h-8" />
                          <div className="font-bold text-sm">
                            {day.temperature}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4 text-red-500 text-sm sm:text-base">Données météo indisponibles.</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}