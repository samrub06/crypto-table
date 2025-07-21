import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders search input with placeholder', () => {
    render(<SearchBar searchTerm="" onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search cities or countries...');
    expect(input).toBeInTheDocument();
  });

  it('displays the search term', () => {
    render(<SearchBar searchTerm="Paris" onSearch={mockOnSearch} />);
    
    const input = screen.getByDisplayValue('Paris');
    expect(input).toBeInTheDocument();
  });

  it('calls onSearch when input changes', () => {
    render(<SearchBar searchTerm="" onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search cities or countries...');
    fireEvent.change(input, { target: { value: 'Tokyo' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('Tokyo');
  });

  it('renders search icon', () => {
    render(<SearchBar searchTerm="" onSearch={mockOnSearch} />);
    
    // Vérifier que l'icône SVG est présente
    const searchIcon = document.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
  });
}); 