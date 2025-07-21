import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchWeather } from '../weather';

// Mock de fetch
vi.stubGlobal('fetch', vi.fn());

describe('fetchWeather', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches weather data successfully', async () => {
    const mockWeatherData = {
      current: {
        temp_c: 20,
        temp_f: 68,
        condition: {
          text: 'Sunny',
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
        },
        humidity: 65,
        wind_kph: 15,
        wind_mph: 9
      },
      forecast: {
        forecastday: [
          { date: '2024-01-01' },
          { date: '2024-01-02', day: { avgtemp_c: 22, avgtemp_f: 72, condition: { icon: 'test.png', text: 'Cloudy' } } },
          { date: '2024-01-03', day: { avgtemp_c: 25, avgtemp_f: 77, condition: { icon: 'test.png', text: 'Rainy' } } },
          { date: '2024-01-04', day: { avgtemp_c: 18, avgtemp_f: 64, condition: { icon: 'test.png', text: 'Sunny' } } }
        ]
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData
    } as Response);

    const result = await fetchWeather(48.8566, 2.3522);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.weatherapi.com/v1/forecast.json')
    );
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('q=48.8566,2.3522')
    );
    expect(result).toEqual(mockWeatherData);
  });

  it('throws error when fetch fails', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fetch as any).mockResolvedValueOnce({
      ok: false
    } as Response);

    await expect(fetchWeather(48.8566, 2.3522)).rejects.toThrow('Weather fetch failed');
  });

  it('includes API key in request', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    } as Response);

    await fetchWeather(48.8566, 2.3522);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/key=[^&]+/)
    );
  });
}); 