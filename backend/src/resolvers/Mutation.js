const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, emailOutput } = require("../mail");

const Mutations = {
  async createItem(parent, args, ctx, info) {
    //Check user is logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
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
  },

  async signup(parents, args, ctx, info) {
    // 1. Lowercase the email
    args.email = args.email.toLowerCase();
    // 2. Hash the password using bcrypt package
    const hashedPassword = await bcrypt.hash(args.password, 10);
    // 3. Create the user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password: hashedPassword,
          permissions: { set: ["USER"] } // Set default persmission to USER as they signup
        }
      },
      info
    );
    // 4. Create JWT token so the user is inmediately signed in after signing up
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 5. Set jwt as a cookie on the res
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // At the end we return user to the browser
    return user;
  },

  async signin(parent, { email, password }, ctx, info) {
    // 1. Check if there is user with that email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if the password matches
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error(`Invalid Password.`);
    }
    // 3. Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    // 4. Set the cookie with the token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // 5. Return the user
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Goodbye!" };
  },
  async requestReset(parent, args, ctx, info) {
    // 1. Check if a real user
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }
    // 2. Generate a reset token and expiry
    const resetToken = (await promisify(randomBytes)(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry }
    });
    // 3. Email sent
    const mailResponse = await transport.sendMail({
      from: "info@sourdoughbakers.com",
      to: user.email,
      subject: "Your Password Reset Token",
      html: emailOutput(
        `Your Password reset token is here! \n\n <a href="${
          process.env.FRONTEND_URL
        }/reset?resetToken=${resetToken}">Click here to reset</a>`
      )
    });
    // 4. Return the message
    return { message: "Email sent. Thanks" };
  },
  async resetPassword(parent, args, ctx, info) {
    // 1. Check if the passwords match
    if (args.password !== args.confirmPassword) {
      throw new Error(`Passwords do not match`);
    }
    // 2. check if legit reset token
    // 3. check if expiration
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    });

    if (!user) {
      throw new Error(`This token is either invalid or expired`);
    }
    // 4. hash new password
    const password = await bcrypt.hash(args.password, 10);
    // 5. save new password and remove old
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    });
    // 6. generate JWWT
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    // 7. set jwt cookie
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // 8. return the udated user
    return updatedUser;
  }
};

module.exports = Mutations;
