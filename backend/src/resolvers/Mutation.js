const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );

    return item;
  },

  updateItem(parent, args, ctx, info) {
    //create a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the updateItem method
    // check what it takes from generated/prisma.graphql, in this case data and where
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: { id: args.id }
      },
      info
    );
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. Find the item
    const item = await ctx.db.query.item({ where }, `{ id title }`);
    // 2. Check the user permissions to delete that item

    // 3. Delete it
    return ctx.db.mutation.deleteItem({ where }, info);
  }
};

module.exports = Mutations;
