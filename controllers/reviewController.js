const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

// Adding Nested Get ENDPOINT: So, in the last two videos, we created a nested POST endpoint in order to create new reviews on a certain tour. So, let's now build upon that, and also create a nested GET endpoint. So we already have our getAllReviews handler function implemented, right? But right now, all it does is to basically get an array of all the reviews in the review collection. Now, a common use case for your API might be to get an array of all the reviews of one particular tour, so very similar to the createReview, right? So basically similar to this route here, but except with GET. Because right now, thanks to the merge params, and this kind of redirecting that we implemented here in the last video, so thanks to all that, this getAllReviews handler function will now automatically get called whenever there is a GET request for a URL that looks like this, and will also get access to the tourId, and again, thanks to mergeParams set to true.

// And what we're going to do here is to check if there is a tourId, and if there is one, well, then we're only going to search for reviews where the tour is equal to that tourId, okay? So, that's something that's very simple to implement using find, right? So basically, what we're doing is something like this. So, if there is request.params.tourId, then we want to create a filter object, So, let filter, because we want to then mutate this, okay? So, if there is a tourId, then this filter should be equal to tour: req.params.tourId. Okay, and so, again, if there is a tourId, then basically, this object here is what will be here. And so then only the reviews where the tour matches the ID are going to be found. So if it's all regular API call without nested route, well then that filter will simply be this empty object, and so then we're gonna find all the reviews, okay?
// exports.getAllReviews = catchAsync(async (req, res, next) => {
//   let filter = {};
//   if (req.params.tourId) filter = { tour: req.params.tourId };

//   const reviews = await Review.find(filter);

//   res.status(200).json({
//     status: 'success',
//     results: reviews.length,
//     data: {
//       reviews,
//     },
//   });
// });

exports.getAllReviews = factory.getAll(Review);

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  req.body.user = req.user.id;

  next();
};

// exports.createReview = catchAsync(async (req, res, next) => {
//   // Allow nested routes
//   // if (!req.body.tour) req.body.tour = req.params.tourId;
//   // req.body.user = req.user.id;

//   const newReview = await Review.create(req.body);

//   res.status(201).json({
//     status: 'success',
//     data: {
//       review: newReview,
//     },
//   });
// });

exports.getReview = factory.getOne(Review);

exports.createReview = factory.createOne(Review);

exports.updateReview = factory.updateOne(Review, 'user');

exports.deleteReview = factory.deleteOne(Review, 'user');
