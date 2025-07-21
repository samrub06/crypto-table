const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY; // Mets ta clé dans .env

export async function fetchWeather(lat: number, lon: number) {
  const q = `${lat},${lon}`;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${q}&days=4&aqi=no&alerts=no`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather fetch failed');
  return res.json();
}