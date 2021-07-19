const { AuthenticationError } = require('apollo-server-express');
const { User, Dog, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    dogs: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Dog.find(params).populate('category');
    },
    dog: async (parent, { _id }) => {
      return await Dog.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.dogs',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.dogs',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    // checkout: async (parent, args, context) => {
    //   const url = new URL(context.headers.referer).origin;
    //   console.log(url)
    //   console.log(args.dogs)
    //   const order = new Order({ dogs: args.dogs });
    //   console.log(order)
    //   console.log(order)

    //   const line_items = [];
    //   console.log(line_items)

    //   const { dogs } = await order.populate('dogs').execPopulate();
    //   console.log(dogs)
    //   for (let i = 0; i < dogs.length; i++) {
    //     console.log("looping")
    //     const dog = await stripe.dogs.create({
    //       name: dogs[i].name,
    //       description: dogs[i].description,
    //       images: [`${url}/images/${dogs[i].image}`]
    //     });

    //     const price = await stripe.prices.create({
    //       dog: dog.id,
    //       unit_amount: dogs[i].price * 100,
    //       currency: 'usd',
    //     });

    //     line_items.push({
    //       price: price.id,
    //       quantity: 1
    //     });
    //     console.log(line_items)
    //   }
    //   console.log(line_items)
    //   const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     line_items: line_items,
    //     mode: 'payment',
    //     success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    //     cancel_url: `${url}/`
    //   });
    //   console.log(session)
    //   return { session: session.id };
    // }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { dogs }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ dogs });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    // updateDog: async (parent, { _id, quantity }) => {
    //   const decrement = Math.abs(quantity) * -1;

    //   return await Dog.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    // },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
