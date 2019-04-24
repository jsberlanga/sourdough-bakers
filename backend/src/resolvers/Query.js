const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    // Check if there is a current userId
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // Check if user is logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in");
    }
    // Check permissions
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);

    return ctx.db.query.users({}, info);
  },
  async order(parent, args, ctx, info) {
    // Check if user is logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in");
    }
    // Query current order
    const order = await ctx.db.query.order(
      {
        where: {
          id: args.id
        }
      },
      info
    );
    // Check permissions to see the order
    const ownsOrder = order.user.id === ctx.request.userId;
    console.log(ctx.request.user.permissions);
    const hasAdminPermissions = ctx.request.user.permissions.filter(
      permission => permission.includes(["ADMIN", "VIEWORDER"])
    );
    if (!ownsOrder || !hasAdminPermissions) {
      throw new Error("You are not allowed to see that!");
    }
    // Return the order
    return order;
  },
  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be logged in");
    }
    const orders = await ctx.db.query.orders(
      {
        where: {
          user: { id: userId }
        }
      },
      info
    );
    return orders;
  }
};

module.exports = Query;
