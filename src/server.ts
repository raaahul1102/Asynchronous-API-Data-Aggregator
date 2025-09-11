import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import aggregateRouter from './routes/aggregate';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.use((_req, res, next) => {
  const guard = setTimeout(() => {
    if (!res.headersSent) res.status(504).json({ error: 'Upstream timeout' });
  }, 5_000);

  res.locals.guard = guard; // make handle visible to routes
  res.on('finish', () => clearTimeout(guard));
  next();
});

app.use('/aggregate', aggregateRouter);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, () => console.log(`API aggregator running on :${PORT}`));
