import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import CityGridPage from '../CityGridPage';

// Mock data
vi.mock('../../data/data.json', () => ({
  default: {
    cities: [
      {
        name: 'Paris',
        continent: 'Europe',
        active: true,
        country: 'France',
        description: 'Test description',
        image: 'test-image.jpg',
        coords: { lat: 48.8566, lng: 2.3522 }
      },
      {
        name: 'Tokyo',
        continent: 'Asia',
        active: true,
        country: 'Japan',
        description: 'Test description',
        image: 'test-image.jpg',
        coords: { lat: 35.6762, lng: 139.6503 }
      }
    ]
  }
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('City Grid Page', () => {
  it('renders the title', () => {
    renderWithRouter(<CityGridPage />);
    expect(screen.getByText('City Explorer')).toBeInTheDocument();
  });

  it('renders search bar', () => {
    renderWithRouter(<CityGridPage />);
    expect(screen.getByPlaceholderText('Search cities or countries...')).toBeInTheDocument();
  });

  it('renders unit toggle', () => {
    renderWithRouter(<CityGridPage />);
    expect(screen.getByText('Units')).toBeInTheDocument();
    expect(screen.getByText('°C')).toBeInTheDocument();
    expect(screen.getByText('°F')).toBeInTheDocument();
  });

  it('renders sort options', () => {
    renderWithRouter(<CityGridPage />);
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Distance')).toBeInTheDocument();
  });

  it('renders city cards', () => {
    renderWithRouter(<CityGridPage />);
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Tokyo')).toBeInTheDocument();
  });

  it('filters cities by search term', () => {
    renderWithRouter(<CityGridPage />);
    
    const searchInput = screen.getByPlaceholderText('Search cities or countries...');
    fireEvent.change(searchInput, { target: { value: 'Paris' } });
    
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.queryByText('Tokyo')).not.toBeInTheDocument();
  });
}); 