import axios, { AxiosRequestConfig } from 'axios';

export async function fetchWithRetry<T>(
  config: AxiosRequestConfig,
  attempts = 3,
  delay = 300
): Promise<T> {
  try {
    const { data } = await axios.request<T>(config);
    return data;
  } catch (err) {
    if (attempts <= 1) throw err;
    const backoff = delay * 2;
    await new Promise(r => setTimeout(r, backoff));
    return fetchWithRetry<T>(config, attempts - 1, backoff);
  }
}
