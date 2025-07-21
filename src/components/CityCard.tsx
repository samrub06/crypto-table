import React from 'react';
import type { City } from '../types/city';
interface Props {
  city: City;
  onClick?: () => void;
}

const CityCard: React.FC<Props> = ({ city, onClick }) => (
  <div
    className="relative rounded-xl overflow-hidden shadow-md cursor-pointer h-64 flex items-end transition-transform hover:scale-105 bg-gray-200"
    onClick={onClick}
    style={{ backgroundImage: `url(${city.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    aria-label={`View details for ${city.name}`}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
    <div className="relative z-10 p-4 text-white w-full">
      <h2 className="text-2xl font-bold leading-tight drop-shadow-md">{city.name}</h2>
      <h3 className="text-lg font-medium opacity-80">{city.country}</h3>
      <p className="mt-2 text-sm opacity-90 line-clamp-3">{city.description}</p>
    </div>
  </div>
);

export default CityCard;