
import { fetchWithRetry } from './retry';
const base = 'https://newsapi.org/v2';

export async function getNews(query: string, pageSize = 5) {
  return fetchWithRetry<News.Response>({
    url: `${base}/everything`,
    method: 'GET',
    params: { q: query, apiKey: process.env.NEWSAPI_KEY, pageSize }
  });
}
