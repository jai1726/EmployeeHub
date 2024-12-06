const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust to your User model path
const connectDB = require('./db'); // Ensure this function connects to MongoDB

// Function to generate 30 dummy users
const generateDummyData = async () => {
  const dummyUsers = [];
  const password = 'password@123';

  // Generate 30 users
  for (let i = 0; i < 10; i++) {
    const user = {
      email: faker.internet.email(),
      password: password,
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 60 }),
      role: faker.helpers.arrayElement(['employee']),
      class: faker.helpers.arrayElement(['A', 'B', 'C', 'D']),
      subjects: faker.helpers.arrayElements(
        ['Math', 'Science', 'English', 'History', 'Spanish', 'French', 'Economy'],
        { min: 1, max: 5 }
      ),
      attendance: faker.number.float({ min: 50, max: 100, precision: 0.1 }),
    };
    dummyUsers.push(user);
  }

  // Insert dummy data into MongoDB
  try {
    const result = await User.insertMany(dummyUsers);
    console.log(`${result.length} dummy users added successfully.`);
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
};

// Connect to MongoDB and then generate the dummy data
const start = async () => {
  try {
    await connectDB(); // Ensure the connection is successful before proceeding
    console.log('MongoDB connected');
    await generateDummyData(); // Call the function to insert data
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

start();