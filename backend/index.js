import express from 'express';
import { CLIENT_URL, PORT } from './config/env.js';
import connectToDB from './db/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jobRouter from './routes/jobRoute.js';

const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: [CLIENT_URL],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send({
    success: true,
    title: 'Market Spehere API',
  });
});

// routes
app.use('/api/v1/jobs', jobRouter);

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Api is running on http://localhost:${PORT}`);
});
