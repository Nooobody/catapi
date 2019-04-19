import * as Koa from 'koa';
import * as mount from 'koa-mount';
import * as graphqlHTTP from 'koa-graphql';

import db from './database';
import schema from './schema';

interface KoaApp extends Koa {
  init(): Promise<void>;
}

const app = new Koa() as KoaApp;

app.init = async function() : Promise<void> {
  this.context.db = await db();
  while (!this.context.db) {
    // Database failed to connect, retry in 10 seconds.
    await (new Promise(resolve => setTimeout(resolve, 1000 * 10)));
    this.context.db = await db();
  }

  this.use(mount('/graphql', graphqlHTTP({
    schema
  })));

  this.listen(4000);
}

app.init();
