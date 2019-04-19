
export default {
  async list(ctx) {
    const breeds = await ctx.db.getAllBreeds();
    ctx.body = breeds;
  },
  async searchByName(ctx, name) {
    const breed = await ctx.db.searchBreedByName(name);
    ctx.body = breed;
  },
  async getById(ctx, id) {
    const breed = await ctx.db.getBreedById(id);
    ctx.body = breed;
  }
}
