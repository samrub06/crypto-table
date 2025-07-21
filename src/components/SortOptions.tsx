import React from 'react';

interface Props {
  sortBy: 'name' | 'distance';
  onSortChange: (sort: 'name' | 'distance') => void;
}

const SortOptions: React.FC<Props> = ({ sortBy, onSortChange }) => (
  <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200">
    <div className="flex items-center gap-2">
      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>
      <span className="text-sm font-medium text-gray-700">Sort by</span>
    </div>
    <div className="flex items-center gap-1">
      <button
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
          sortBy === 'name' 
            ? 'bg-blue-100 text-blue-700 shadow-sm' 
            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
        }`}
        onClick={() => onSortChange('name')}
        aria-pressed={sortBy === 'name'}
        type="button"
      >
        Name
      </button>
      <span className="text-gray-300 mx-1">•</span>
      <button
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
          sortBy === 'distance' 
            ? 'bg-blue-100 text-blue-700 shadow-sm' 
            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
        }`}
        onClick={() => onSortChange('distance')}
        aria-pressed={sortBy === 'distance'}
        type="button"
      >
        Distance
      </button>
    </div>
  </div>
);

export default SortOptions;