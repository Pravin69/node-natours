const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Database Connected successful`));

// Read JSON File
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
);

// IMPORT Data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully loaded!');
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted!');
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

// console.log(process.argv);
// So process.argv and basically that is an array of these two arguments of running this node process. So, this here is basically where the node command is located. So this equivalent to this node and then the second one, so this path to this file is actually this here, okay. So let's quit this here and let's add kind of an option here. So I'm gonna write, dash, dash import and so I'm sure you have seen something like this many times before. For example, when we save a package as a dev dependency we do it like this. Save dev, and so we use the same kind of format for specifying options. Okay so, dash dash and then whatever string we put here. And so I choose to basically specify the import option like this. And so you see that now the third argument is dash dash import, all right? And so that means that we can now go ahead and basically use this data here in order to write a very simple command line application basically which will import the data when we specify this option and will delete the data when we specify the delete option, all right? So, let's actually do that.
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
