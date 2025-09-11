import { fetchWithRetry } from './retry';

const base = 'https://api.openweathermap.org/data/2.5';

export async function getWeather(city: string) {
  return fetchWithRetry<Weather.Response>({
    url: `${base}/weather`,
    method: 'GET',
    params: { q: city, appid: process.env.OPENWEATHER_KEY, units: 'metric' }
  });
}
