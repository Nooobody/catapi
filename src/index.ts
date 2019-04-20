import * as Koa from 'koa';
import * as route from 'koa-route';
import * as helmet from 'koa-helmet';
import * as cors from '@koa/cors';

import db from './database';
import routes from './routes';

import { PORT } from './config';

interface KoaApp extends Koa {
  init(): Promise<void>;
}

const app = new Koa() as KoaApp;

app.use(cors());
app.use(helmet());

app.use(route.get('/breed', routes.list));
app.use(route.get('/breed/search/:name', routes.searchByName));
app.use(route.get('/breed/:id', routes.getById));

const port = 4000;

app.init = async function() : Promise<void> {
  this.context.db = await db();

  this.listen(PORT);
  console.log("Server started at port", port);
}

app.init();
