const db = require('./connection');
const { User, Dog, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { size: 'Toy' },
    { size: 'Small' },
    { size: 'Medium' },
    { size: 'Large' },
    { size: 'Giant' }
  ]);

  console.log('categories seeded');

  await Dog.deleteMany();

  const dogs = await Dog.insertMany([
    {
      name: 'Arrow',
      description:
        'Arrow is a handsome young dog looking for his forever home! He is very active and would be best with an owner that is a marathon runner and can throw a ball really, really far.',
      image: 'arrow.jpg',
      breed: 'Belgian Malinois',
      age: '2 years',
      size: categories[3]._id,
    },
    {
      name: 'Chief',
      description:
        'Chief is the perfect companion! He enjoys lots of belly rubs and his favorite activity is swimming.',
      image: 'chief.jpg',
      breed: 'German Shepherd',
      age: '8 years',
      size: categories[3]._id,
    },
    {
      name: 'Echo',
      description:
        'Echo lives up to her name! This girl loves to bark and would make a great guard dog.',
      image: 'echo.jpg',
      breed: 'German Shepherd',
      age: '5 years',
      size: categories[3]._id,
    },
    {
      name: 'Camelot',
      description:
        'Camelot is the floofiest boy in Rescue Express! He loves ice cream and hiking.',
      image: 'camelot.jpg',
      breed: 'Samoyed',
      age: '3 years',
      size: categories[2]._id,
    },
    {
      name: 'Roux',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'roux.jpg',
      breed: 'Corgi',
      age: '3 years',
      size: categories[1]._id,
    },
    {
      name: 'Finn',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'finn.jpg',
      breed: 'Mixed Breed',
      age: '6 years',
      size: categories[2]._id,
    },
    {
      name: 'Bucky',
      description:
        'Bucky is the quintessential Golden Retriever! He loves everyone and everything, especially water and birds! ',
      image: 'bucky.jpg',
      breed: 'Golden Retriever',
      age: '3 years',
      size: categories[2]._id,
    },
    {
      name: 'Roshi',
      description:
        'Bad dog, but a good boy.',
      image: 'roshi.jpg',
      breed: 'Chesapeake Bay Retriever Mix',
      age: '5 years',
      size: categories[2]._id,
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@email.com',
    password: 'password12345',
    applications: [
      {
        dogs: [dogs[0]._id]
      }
    ]
  });

  await User.create({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@email.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
