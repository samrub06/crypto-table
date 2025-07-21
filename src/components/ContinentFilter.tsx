import React from 'react';

interface Props {
  continents: string[];
  selected: string;
  onSelect: (continent: string) => void;
}

const ContinentFilter: React.FC<Props> = ({ continents, selected, onSelect }) => (
  <div className="w-full max-w-xs">
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <select
        value={selected}
        onChange={e => onSelect(e.target.value)}
        className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-gray-900 shadow-sm transition-all duration-200 hover:shadow-md appearance-none cursor-pointer"
      >
        <option value="">All Continents</option>
        {continents.map(continent => (
          <option key={continent} value={continent}>{continent}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

export default ContinentFilter;