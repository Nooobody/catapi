
import { Context } from '../node_modules/@types/koa/index';

export default {
  async list(ctx: Context) {
    const breeds = await ctx.db.getAllBreeds();
    ctx.body = breeds;
  },
  async searchByName(ctx: Context, name: string) {
    const breed = await ctx.db.searchBreedByName(name);
    ctx.body = breed;
  },
  async getById(ctx: Context, id: string) {
    const breed = await ctx.db.getBreedById(id);
    ctx.body = breed;
  }
}
