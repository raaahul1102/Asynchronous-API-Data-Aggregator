# Asynchronous API Data Aggregator

Node.js + TypeScript service that fetches data from **GitHub**, **OpenWeatherMap** and **NewsAPI**, merges everything into a single JSON payload, and demonstrates both `async/await` and promise-chain patterns with exponential-backoff retries.

## Features
- `/aggregate/:query` (async/await)  
- `/aggregate/promise/:query` (.then/.catch)  
- Parallel API calls with `Promise.all`  
- Exponential-backoff retry helper  
- 5-second timeout guard with graceful 504  
- API keys loaded via `dotenv`  
- Request logging with `morgan`  

## Requirements
- Node 18+  
- npm / yarn / pnpm  
- API keys for GitHub, OpenWeatherMap, NewsAPI  

## Setup
```sh
git clone https://github.com/your-org/async-api-aggregator.git
cd async-api-aggregator
npm install
cp .env.example .env # add your real keys
npm run dev # nodemon + ts-node
```

## Environment variables
```env
PORT=3000
GITHUB_TOKEN=
OPENWEATHER_KEY=
NEWSAPI_KEY=
```

## Endpoints
| Route                               | Method | Style          |
|-------------------------------------|--------|----------------|
| `/aggregate/:query`                 | GET    | async/await    |
| `/aggregate/promise/:query`         | GET    | .then/.catch   |

Example:
```sh
GET http://localhost:3000/aggregate/react
```

## Folder structure
```
src/
  routes/aggregate.ts
  services/
    github.ts
    weather.ts
    news.ts
    retry.ts
  types/
  server.ts
```

## Scripts
| Command        | Purpose                 |
|----------------|-------------------------|
| `npm run dev`  | Start in dev mode       |
| `npm run build`| Compile to `dist/`      |
| `npm start`    | Run compiled version    |
