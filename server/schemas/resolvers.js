const { AuthenticationError } = require('apollo-server-express');
const { User, Dog, Size, Application } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    sizes: async () => {
      return await Size.find();
    },
    dogs: async (parent, { size, name }) => {
      const params = {};

      if (size) {
        params.size = size;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Dog.find(params).populate('size');
    },
    dog: async (parent, { _id }) => {
      return await Dog.findById(_id).populate('size');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'applications.dogs',
          populate: 'size'
        });

        user.applications.sort((a, b) => b.applicationDate - a.applicationDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    apply: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'applications.dogs',
          populate: 'size'
        });

        return user.applications.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    // checkout: async (parent, args, context) => {
    //   const url = new URL(context.headers.referer).origin;
    //   const application = new Application({ dogs: args.dogs });
    //   const line_items = [];

    //   const { dogs } = await application.populate('dogs').execPopulate();

    //   for (let i = 0; i < dogs.length; i++) {
    //     const dog = await stripe.dogs.create({
    //       name: dogs[i].name,
    //       description: dogs[i].description,
    //       images: [`${url}/images/${dogs[i].image}`]
    //     });

    //     const price = await stripe.prices.create({
    //       product: product.id,
    //       unit_amount: products[i].price * 100,
    //       currency: 'usd',
    //     });

    //     line_items.push({
    //       price: price.id,
    //       quantity: 1
    //     });
    //   }

    //   const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     line_items,
    //     mode: 'payment',
    //     success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    //     cancel_url: `${url}/`
    //   });

    //   return { session: session.id };
    // }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addApplication: async (parent, { dogs }, context) => {
      console.log(context);
      if (context.user) {
        const application = new Application({ dogs });

        await User.findByIdAndUpdate(context.user._id, { $push: { applications: application } });

        return application;
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

    //   return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
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
