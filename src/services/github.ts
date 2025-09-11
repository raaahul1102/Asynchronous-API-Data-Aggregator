
import { fetchWithRetry } from './retry';
const base = 'https://api.github.com';

export function searchRepos(query: string, perPage = 5) {
  return fetchWithRetry<GitHub.SearchResponse>({
    url: `${base}/search/repositories`,
    method: 'GET',
    params: { q: query, per_page: perPage },
    headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
  });
}
