import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CityGrid from '../components/CityGrid';
import ContinentFilter from '../components/ContinentFilter';
import SearchBar from '../components/SearchBar';
import SortOptions from '../components/SortOptions';
import UnitToggle from '../components/UnitToggle';
import data from '../data/data.json';
import type { City } from '../types/city';

const TEL_AVIV = { lat: 32.0853, lng: 34.7818 };

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

export default function CityGridPage() {
  const [search, setSearch] = useState('');
  const [continent, setContinent] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'distance'>('name');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const unit = (searchParams.get('unit') === 'imperial' ? 'imperial' : 'metric') as 'metric' | 'imperial';

  const cities: City[] = (data.cities as City[]).filter(c => c.active);

  const continents = useMemo(() => Array.from(new Set(cities.map(c => c.continent))).sort(), [cities]);

  const filtered = useMemo(() => cities.filter(city =>
    (city.name.toLowerCase().includes(search.toLowerCase()) ||
     city.country.toLowerCase().includes(search.toLowerCase())) &&
    (!continent || city.continent === continent)
  ), [cities, search, continent]);

  const sorted = useMemo(() => {
    if (sortBy === 'name') return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    return [...filtered].sort((a, b) =>
      haversineDistance(a.coords.lat, a.coords.lng, TEL_AVIV.lat, TEL_AVIV.lng) -
      haversineDistance(b.coords.lat, b.coords.lng, TEL_AVIV.lat, TEL_AVIV.lng)
    );
  }, [filtered, sortBy]);

  function handleCityClick(city: City) {
    navigate(`/city/${encodeURIComponent(city.name)}?unit=${unit}`);
  }

  function handleUnitChange(newUnit: 'metric' | 'imperial') {
    setSearchParams({ unit: newUnit });
  }

  return (
    <main className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-6 lg:px-12 xl:px-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center text-gray-800">
          City Explorer
        </h1>
        
        <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
          {/* SearchBar */}
          <div className="w-full sm:w-auto sm:flex-1 sm:max-w-md">
            <SearchBar searchTerm={search} onSearch={setSearch} />
          </div>
          
          {/* ContinentFilter */}
          <div className="w-full sm:w-auto sm:flex-shrink-0">
            <ContinentFilter continents={continents} selected={continent} onSelect={setContinent} />
          </div>
          
          {/* SortOptions et UnitToggle */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 w-full sm:w-auto sm:flex-shrink-0">
            <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
            <UnitToggle unit={unit} onUnitChange={handleUnitChange} />
          </div>
        </div>
        
        {/* City Grid */}
        <CityGrid cities={sorted} onCityClick={handleCityClick} />
      </div>
    </main>
  );
}