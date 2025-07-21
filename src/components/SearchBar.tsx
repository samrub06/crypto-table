import React from 'react';

interface Props {
  searchTerm: string;
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchTerm, onSearch }) => (
  <div className="w-full max-w-md">
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={e => onSearch(e.target.value)}
        placeholder="Search cities or countries..."
        className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-gray-900 shadow-sm transition-all duration-200 hover:shadow-md"
        autoComplete="off"
      />
      {searchTerm && (
        <button
          onClick={() => onSearch('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors duration-200"
          type="button"
          aria-label="Clear search"
        >
          <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  </div>
);

export default SearchBar;