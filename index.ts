import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.set('views', [__dirname + '/../src/Presentation/Web/ToDo']);

app.set('view engine', 'pug');

app.get('/', (req: Request, res: Response) => {
  res.render('ToDo', { title: 'Hey', message: 'Hello there!' })
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});