import React from 'react';

interface Props {
  unit: 'metric' | 'imperial';
  onUnitChange: (unit: 'metric' | 'imperial') => void;
}

const UnitToggle: React.FC<Props> = ({ unit, onUnitChange }) => (
  <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200">
    <div className="flex items-center gap-2">
      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-sm font-medium text-gray-700">Units</span>
    </div>
    <div className="flex items-center gap-1">
      <button
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
          unit === 'metric' 
            ? 'bg-blue-100 text-blue-700 shadow-sm' 
            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
        }`}
        onClick={() => onUnitChange('metric')}
        aria-pressed={unit === 'metric'}
        type="button"
      >
        °C
      </button>
      <span className="text-gray-300 mx-1">•</span>
      <button
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
          unit === 'imperial' 
            ? 'bg-blue-100 text-blue-700 shadow-sm' 
            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
        }`}
        onClick={() => onUnitChange('imperial')}
        aria-pressed={unit === 'imperial'}
        type="button"
      >
        °F
      </button>
    </div>
  </div>
);

export default UnitToggle;