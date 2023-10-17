const mongoose = require('mongoose');

// Modelling Bookings: Here is the models folder and so booking model.js. So as always, we need mongoose, and we create our booking schema mongoose.Schema, and now, remember how we said before that we were going to use parent referencing here on the bookings, so basically keeping a reference to the tour and also to the user who booked the tour. Then we also want to know the price at which the purchase actually happened, and so that's because the price might change in the future, and so then we would no longer know how much a certain user paid for a tour. And so it's important to also have this here in the booking. Next up, let's also create our time stamp createdAt, which is a date, and then simply add default so that we don't have to do anything. Finally, I also want to create a paid property, and this one will be automatically set to true, but this is just in case that, for example, an administrator wants to create a booking outside of Stripe. So, for example, if a customer doesn't have a credit card and wants to pay directly, like in a store with cash, or something like that. And in this case, an administrator might then use our bookings API in order to basically manually create a tour, and so that might then be paid or not yet paid. Now what we also want to do here is to populate the tour and the user automatically whenever there is a query, all right? So remember how we used to do that using query middleware. So, again, this query will not happen that often so we can easily populate all of this without any problem.

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belong to a Tour!'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A Booking must belong to a User!'],
  },
  price: {
    type: Number,
    required: [true, 'Booking must have a price!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name',
  });

  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
