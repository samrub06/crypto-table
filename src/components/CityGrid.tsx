import React from 'react';
import type { City } from '../types/city';
import CityCard from './CityCard';

interface Props {
  cities: City[];
  onCityClick?: (city: City) => void;
}

const CityGrid: React.FC<Props> = ({ cities, onCityClick }) => {
  if (cities.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 py-8 sm:py-12 text-lg sm:text-xl">
        No results found
      </div>
    );
  }
  return (
    <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {cities.map(city => (
        <CityCard key={city.name} city={city} onClick={() => onCityClick?.(city)} />
      ))}
    </div>
  );
};

export default CityGrid;