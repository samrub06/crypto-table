import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UnitToggle from '../UnitToggle';

describe('UnitToggle', () => {
  const mockOnUnitChange = vi.fn();

  beforeEach(() => {
    mockOnUnitChange.mockClear();
  });

  it('renders both unit options', () => {
    render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);
    
    expect(screen.getByText('°C')).toBeInTheDocument();
    expect(screen.getByText('°F')).toBeInTheDocument();
  });

  it('shows metric as active when unit is metric', () => {
    render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);
    
    const metricButton = screen.getByText('°C');
    const imperialButton = screen.getByText('°F');
    
    expect(metricButton).toHaveClass('bg-blue-100');
    expect(imperialButton).not.toHaveClass('bg-blue-100');
  });

  it('shows imperial as active when unit is imperial', () => {
    render(<UnitToggle unit="imperial" onUnitChange={mockOnUnitChange} />);
    
    const metricButton = screen.getByText('°C');
    const imperialButton = screen.getByText('°F');
    
    expect(imperialButton).toHaveClass('bg-blue-100');
    expect(metricButton).not.toHaveClass('bg-blue-100');
  });

  it('calls onUnitChange when metric button is clicked', () => {
    render(<UnitToggle unit="imperial" onUnitChange={mockOnUnitChange} />);
    
    const metricButton = screen.getByText('°C');
    fireEvent.click(metricButton);
    
    expect(mockOnUnitChange).toHaveBeenCalledWith('metric');
  });

  it('calls onUnitChange when imperial button is clicked', () => {
    render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);
    
    const imperialButton = screen.getByText('°F');
    fireEvent.click(imperialButton);
    
    expect(mockOnUnitChange).toHaveBeenCalledWith('imperial');
  });

  it('renders units label', () => {
    render(<UnitToggle unit="metric" onUnitChange={mockOnUnitChange} />);
    
    expect(screen.getByText('Units')).toBeInTheDocument();
  });
}); 