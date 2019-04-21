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
    // 1. Check if user is logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in");
    }
    // 2. Check permissions
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);

    return ctx.db.query.users({}, info);
  },
  async order(parent, args, ctx, info) {
    // 1. Check if user is logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in");
    }
    // 2. Query current order
    const order = await ctx.db.query.order(
      {
        where: {
          id: args.id
        }
      },
      info
    );
    // 3. Check permissions to see the order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasAdminPermissions = ctx.request.user.permissions.includes("ADMIN");
    if (!ownsOrder || !hasAdminPermissions)
      throw new Error("You are not allowed to see that!");
    // 4. Return the order
    return order;
  }
};

module.exports = Query;
