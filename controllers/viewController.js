const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');

exports.getOverview = catchAsync(async (req, res) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template

  // 3) Render that template using tour data from step 1

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour ( including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError(`No such tour found with that name!`, 404));
  }

  // 2) Build template

  // 3) Render that template using tour data from step 1
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getSignUpForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create your new account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

// Rendering a Users Booked Tours: In this video, we're gonna implement the my bookings page. So, basically we're gonna render a nice page containing all the tours that a user has booked. And let's start by adding a new route to our viewRoutes.  So I'm duplicating this one, my-tours, then also this route needs to be protected so that only currently logged-in users can access this page, of course. And then, in our viewsController, we're gonna have a controller called getMyTours. And so now, what we need to do here is to find all the tours that the user has booked. So, basically, first we need to find all the bookings for the currently logged-in users which will then give us a bunch of tour IDs, and then we have to find the tours with those IDs. So, basically, find all bookings and then find tours with the returned IDs. So basically the IDs of the bookings for the user, right? Now, instead, we could also do a virtual populate on the tours, and it would be great if you would implement . but here in this function I actually wanted to show you how we can do it manually because I think that's also kind of important and actually a virtual populate should work something similar to what we're gonna do here. And so you see that actually we need two queries in order to really find the tours corresponding to the user's bookings. So await Booking.find, and now remember that each booking document has a user ID, right?

// So here in the Schema remember we have the tour ID, the user ID, and then all this other data, and so what we're gonna do now is to basically query by the user ID, okay? And so that will then return us all the tours that belong to the current user, okay? So these bookings now contain all the booking documents for the current user, but really that only gives us the tour IDs. And so now we want to find the tours with the returned IDs. And so the next step is to basically create an array of all the IDs, and then after that query for tours that have one of these IDs, all right? So tourIDs is equal to bookings and now we're gonna use a map to create a new array based on a callback function which is this one, so the current el.tour.id. So, what is this going to do? Well, basically this loops through the entire bookings array and on each element it will grab the el.tour. And actually, we don't even need the ID here because the tour itself is already the tour ID, right? Then in the end, we have a nice array with all the tour IDs in there here and that's because we used a map. Okay, then having all the tour IDs, we can actually get the tours corresponding to those IDs. So await Tour.find and we actually want to find by ID, but we cannot use the .findbyid because here we actually will need a new operator. And said operator, which I'm not sure if we have used before, is called in. So, in tourIDs. So basically what this is going to do instead it will select all the tours which have an ID which is in the tourIDs array, okay? So that's quite straightforward, but it's very great to know that we can use this very handy in operator here, okay? And so that's actually one of the reasons why I wanted to do this manually instead of just doing a virtual populate like we did before. Okay, and with this we actually have our tours ready to be rendered.

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings for the currently logged in User
  const bookings = await Booking.find({ user: req.user.id });

  //   console.log(bookings);

  // #2.Make an array of tour Ids from the relevant bookings
  const tourIds = bookings.map((el) => el.tour._id);

  //   console.log(tourIds);

  //   3) Find all tours by the returned id of tours array i.e toursId
  const tours = await Tour.find({ _id: { $in: tourIds } });

  //   console.log(tours);

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

exports.updateUserdata = catchAsync(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});
