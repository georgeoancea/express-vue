import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import { todo } from 'node:test';

dotenv.config();

const app: Express = express();

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

const port = process.env.PORT;

type ToDo = {
  id: Number,
  name: String,
  isCompleted: boolean
}

const todos: ToDo[] = [
  {
    id: 1,
    name: 'Initial todo',
    isCompleted: false
  } 
];

app.set('views', [__dirname + '/../src/Presentation/Web/ToDo']);

app.set('view engine', 'pug');

app.get('/', (req: Request, res: Response) => {
res.render('Base', { title: 'To Do App', message: 'To do, to do, to do do do do to do to do to do', todos: todos})
});

app.post('/', urlEncodedParser, (req: Request, res: Response) => {
  console.log(req.body.todoName);
  todos.push({
    id: todos.length + 1,
    name: req.body.todoName,
    isCompleted: req.body.todoIsCompleted ?? false
  });
  res.redirect('/');
});

app.post('/delete/:todoId', (req: Request, res: Response) => {
  const itemIndex = todos.findIndex(item => item.id.toString() == req.params.todoId)
  todos.splice(itemIndex, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});