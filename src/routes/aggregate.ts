/// <reference path="../types/index.d.ts" />

import { Router, Request, Response, NextFunction } from 'express';
import { searchRepos } from '../services/github';
import { getWeather } from '../services/weather';
import { getNews } from '../services/news';

const router = Router();

router.get('/:query', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const q = req.params.query;

    const repos = await searchRepos(q);
    const top = repos.items[0];
    const city = top.owner?.location || 'San Francisco';

    const [weather, news] = await Promise.all([
      getWeather(city),
      getNews(q)
    ]);

    clearTimeout(res.locals.guard); // cancel timeout
    res.json({
      query: q,
      topRepo: {
        name: top.full_name,
        stars: top.stargazers_count,
        url: top.html_url
      },
      ownerLocation: city,
      weather: {
        tempC: weather.main.temp,
        condition: weather.weather[0].description
      },
      news: news.articles.map((a: News.Article) => ({
        title: a.title,
        url: a.url,
        source: a.source.name
      }))
    });
  } catch (err) {
    next(err);
  }
});

router.get('/promise/:query', (req, res, next) => {
  const q = req.params.query;

  searchRepos(q)
    .then(repos => {
      const top = repos.items[0];
      const city = top.owner?.location || 'San Francisco';
      return Promise.all([getWeather(city), getNews(q), Promise.resolve(top), Promise.resolve(city)]);
    })
    .then(([weather, news, top, city]) => {
      clearTimeout(res.locals.guard); // cancel timeout
      res.json({
        query: q,
        topRepo: {
          name: top.full_name,
          stars: top.stargazers_count,
          url: top.html_url
        },
        ownerLocation: city,
        weather: {
          tempC: weather.main.temp,
          condition: weather.weather[0].description
        },
        news: news.articles.map((a: News.Article) => ({
          title: a.title,
          url: a.url,
          source: a.source.name
        }))
      });
    })
    .catch(next);
});

export default router;
