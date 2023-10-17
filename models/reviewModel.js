const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // The choice between using an array or an object for references depends on the cardinality of the relationship: If multiple child documents can be associated with a single parent document, use an array. If a single child document is associated with a single parent document, use an object. The guides reference is wrapped in an array because a tour can have multiple guides, while the tour and user references are wrapped in objects because a review is associated with a single tour and a single user.
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour', // reference to the model Tour in our case (tour is a collection)
      required: [true, 'Review must bellong to tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  },
);

// Preventing Duplicate Reviews: So in the real world, each user should only review each tour once. So basically, a duplicate review happens when there is a review with the same user and the same tour ID. And that's what we want to avoid from happening. And the obvious solution here is to just use a unique index, right? However, it is not enough to set both these fields to unique. And actually that would really be very wrong, because that would mean that each tour can get only review, and each user can only write one review. And obviously that's not what we want. So what we do need is them both together to be unique, so the combination of user and tour to be always unique. So that sounds a bit complicated, but luckily for us, that's actually very easy to achieve with indexes. so review schema dot index... Tour set to one, and once more it's not really important if it's one or minus one in this case. And user also set to one, okay. And so again, that's similar to what we did before, but here we're going to take it to the next level and now add an object for options. And the option here that we're gonna set is unique set to true. And that's actually it. This will achieve exactly what we want. So now each combination of tour and user has always to be unique.

// Now I want to take a look at the average. Okay, so right now it is this 4.6666, which of course does not look good. And for doing that, there is small new feature in Mongoose that we didn't use yet. So let's go to our tour model, and to that average, so right here. And so now, we can use a setter function. So set and this function will be run each time that a new value is set for this field, okay. And so here, we usually specify a callback function, which receives the current value. And in this case, it returns basically this value, but rounded. So we use math dot round for the current value, but the problem with math dot round is that it rounds values to integers. So for example, if we had something like this, it would then round this to five, okay. And that's not what we want. We want it to be rounded to 4.7. And so we're gonna use a trick here, which is quite common, so multiplying this by 10, and so with that, we would get 46.666, and then this rounded would be 47. And so then, we divide the results by 10 again, and that then is 4.7.
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// Populating Reviews: So at this point the query is populated with the tours, and now we need to populate it again, this time with the user. And now select, and that's actually only display the user name and the photo, and not for example, stuff like the email. So let's say that someone hits the API to get all the reviews, but then we don't want to leak all the details about the users posting these reviews to the client. So no one should really be able to know the private data about the reviewers, like emails, okay. So again, we only leak, we only send relevant data about the user, and in this case, it's the name and the photo, okay.

// Now, you might start to see that this is creating kind of a problem because this here is basically creating a chain of populates. And that's not ideal at all. So, we have the tour being populated with reviews. But then the reviews also get populated with the tour again, and also with the user. And then also the tour is also getting populated with guides. Which in this case, is not happening because there are no guides. But if there were, then we would have yet another populate. And so here we would have a chain of three populates. And so for performance, that's of course, not ideal at all. Especially here with the tour. So we have the tour populated with reviews. And in the reviews, we again have the data about the tour. And so that doesn't make much sense at all. So, it's kind of a mess now. SO, the solution that I'm going to use here is to actually turn off populating the reviews with the tours, okay? So basically, we do not need this data here on each review. So in this case, I think that's a good solution.

// And so, now we should only see the ID of the tour here. Okay? And indeed, that's exactly what we get. Okay? Now with this, of course, we still do parent referencing, okay? We still keep a reference to the tours here, but we simply do not populate it. And again, because we don't always need that data right here.
reviewSchema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: 'tour',
  //     select: 'name _id',
  //   }).populate({
  //     path: 'user',
  //     select: 'name photo _id',
  //   });

  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

// Static Function : Remember how we have a field for the average rating on each tour document? Well up until this point that field doesn't really hold any meaningful data. So storing a summary of a related data set on the main data set is actually a very popular technique in data modeling that I hadn't actually mentioned yet. And this technique can actually be really helpful in order to prevent constant queries of the related data set. So in our application a great example of this technique is to store the average rating and the number of ratings on each tour, so that we don't have to query the reviews and calculate that average each time that we query for all the tours, okay. For example, that could become very useful for a tour overview page in our front-end where we really do not want to display all the reviews, but still want to show a summary of these reviews, like for example, the number of ratings and the average. So right now we're gonna calculate the average rating and also the number of ratings of a tour each time that a new review is added to that tour or also when a review is updated or deleted, because that's exactly the situations when the number or the average might change, right. So how are we actually going to implement this? Well back here in the review model we're gonna create a new function which will take in a tour ID and calculate the average rating and the number of ratings that exist in our collection for that exact tour. Then in the end the function will even update the corresponding tour document. Then in order to use that function we will use middleware to basically call this function each time that there is a new review or one is updated or deleted, okay. So let's now start by writing that function and for that we're actually gonna write a static method on our schema, and that's a feature of Mongoose that we hadn't used yet. So we only used instance method, which we can call on documents and they are also very useful, but this time we're really going to use static methods. So again, these can be called on the model directly, for example, like this review.calcStats, okay. And the way this works is of course reviewSchema and then .statics and then the name of the function.

// So calcAverageRatings is equal to a function, which remember takes in a tour ID, and that ID is of course for the tour to which the current review belongs to. Anyway in order to now actually do the calculation we will again use the aggregation pipeline, right. So we used the aggregate method, which we called directly on the model, okay. So in a static method like this  keyword actually points to the current model. So into aggregate we need to pass in an array of all the stages that we want in aggregate, okay. So what do we want to do first? Well the first step should be to select all the reviews that actually belong to the current tour that was passed in as the argument. So our first stage is a match stage, remember that, and so in here we passed our filter object and we can say tour equal to tourId. So like this we only select a tour that we actually want to update, okay. Now in the next stage let's actually calculate the statistics themselves, and for that we use a group stage. And in the group phase remember the first field that we need to specify is the ID, so _id and then the common field that all of the documents have in common that we want to group by and so that's again going to be the tour. But here, of course we're grouping all the tours together by tour. Great. Now the number of ratings, remember how we do that, so all we do is to basically add one for each tour that we have, so each tour that was matched in the previous step, okay. Then also the average rating, which just like before we use the average operator and this needs to be inside an object and in here the name of the field which is the rating, right. Okay, and that's actually it. And remember how we said at the beginning that we will do this using middleware each time that a new review is created. So let's implement that using reviewSchema pre save and then just our normal regular middleware function here. And remember that in this kind of middleware that this keyword points to the document that is currently being saved. Now how are we actually going to call this function? Remember how I said that this function is available on the model. So basically like this put review.calcAverageRatings and then as I said we want to use this.tour.

// Now the problem is that at this point here in the code the review variable is not yet defined. Now you might think that the simple solution would be to simply move this code in here after this review declaration, but unfortunately that's not going to work, because just like in Express this code here basically runs in the sequence it is declared. So if we were to put this code here after the review declaration then this reviewSchema here would not contain this middleware, because we would then only be declaring it after the review model was already created, okay, but there is fortunately still a way around this and that is to use this.constructor. So this here still points to the model. You know, basically again this is the current document and the constructor is basically the model who created that document. but anyway the point that I wanted to make here is that we shouldn't use pre, but instead we should use the post save middleware, okay. And that's because at pre save the current review is not really in the collection just yet. So therefore, when we then do this match here it shouldn't be able to then appear in the output here, because again at this point in time it's not really saved into the collection just yet, okay. So it's best to use post here, because at that time, of course, all the documents are already saved in the database and so that's then a great time to actually do this calculation with all the reviews already and then store the result on the tour. So we're now correctly calculating the statistics, but of course they're not yet being persisted to the current tour document. So now it's time to actually persist the calculated statistics into this tour document, okay. And so let's do that. First of all, in order to be able to do that we need to require the tour model, right. So what we need to do is to basically find the current tour and then update it. So we did that before many times, findById and update, okay. And the ID is of course the tour ID that was passed in into the function and then an object of the data that we actually want to update. Now keep in mind how we said that we also want to update the statistics whenever a review is edited or deleted, because these actions will, of course, also influence the number and the average. However, doing so is a bit more complex.
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  // this points to model
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
    { $project: { _id: 0 } },
  ]);

  // console.log(stats);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  // this points to current review doc
  // this.constructor points to Model
  this.constructor.calcAverageRatings(this.tour);
});

// Calculating Average Part -2 : So, this is part two of calculating the review statistics. This time, for when a review is updated or deleted. And this part is actually a bit harder because, keep in mind that a review is updated or deleted using findByIdAndUpdate or also findByIdAndDelete, right? So for these, we actually do not have document middleware, but only query middleware, okay. And so in the query, we actually don't have direct access to the document in order to then do something similar to this, okay. Because, remember, we need access to the current review, so that from there, we can extract the tour ID, and then calculate the statistics from there, right, but again, for these hooks here, we only have query middleware, okay. So, we're going to implement a pre-middleware for these hooks, for these events basically. So pre, and then again I'm going to use a regular expression for a string starting with findOneAnd and that's it. And so this one is then going to work for findOneAndUpdate, and findOneAndDelete because, remember that behind the scenes, findByIdAndUpdate is only just a shorthand for findOneAndUpdate with the current ID, right. So, remember that the goal is to get access to the current review document, okay, but here the, this keyword is the current query. Now, how are we going to go around this? Well, we can basically execute a query, and then that will give us the document that's currently being processed. So then all we need to do is await this query and then save it somewhere. So let's call it r, which is gonna stand for review, okay. Now of course, the rating is still set to five at this point, because this findOne here really gets the document from the database, and so at this point of time, in pre, it still didn't persist any changes to the database, and so it was five before, and so now it's still gonna be five.

// But that doesn't really matter here because all we are interested in is this ID. Actually, this tour ID, right, because that is what we're gonna need in order to calculate the average ratings. Okay, and so now, let's actually use that function. Okay, now, let's think about this because if we were to use this calcAverageRatings function at this point in time, then we would calculate the statistics using the non-updated data, okay. And so that's the exact same reason why up here, we also needed to use post and not pre, okay, because only after the document is already saved to the database it makes sense to then calculate the ratings. And so here, it's the exact same thing, with the big difference that we cannot simply change this pre to post. So we cannot do that because at this point in time we no longer have access to the query because the query has already executed, right, and so without the query, we cannot save the review document, and we can then not run this function. And so now this point in time, so after the query has already finished, and so therefore the review has been updated, this is a perfect point in time where we can then call this function. So, calculate average ratings. But where do we now get the tour ID from? Well, we're gonna have to use a trick which is basically to pass data from the pre-middleware to the post middleware. And so instead of saving this document to a simple variable, we're gonna save it to this.r. So basically, we create a property on this variable. Okay, and so now here, we still have access to that. And so now, we can say this.r, which remember is the review, and then .tour. Now, again, we need something like this here in order to actually call this function here because remember that this in fact is a static method, and so we need to call it on the model. Now where is this model in this case? Well, it's at this.r, which is in this case, equivalent to this this here in this middleware, .constructor.calcAverageRatings. So, again, we basically used this way here of passing the data from the pre-middleware to the post middleware, and so then here we retrieved the review document from this variable. Okay, and again, we did have to do it in this way because at this point in time here, the query was already executed, and so we could not do this here.

// reviewSchema.pre(/^findOneAnd/, async function (next) {
//   this.r = await this.model.findOne(this.getQuery());
//   // console.log(this.r);

//   next();
// });

// reviewSchema.post(/^findOneAnd/, async function (next) {
//   // await this.findOne(); does NOT work here, query has already executed
//   await this.r.constructor.calcAverageRatings(this.r.tour);
// });

// Alternate of above: In post query middleware, we get "docs" parameter which is nothing but the executed document. Since we have the document, we can use constructor on that to get the model ie docs.constructor . Now since we have model, we know that we can directly call statics method on that. That is what I have done.

// eslint-disable-next-line prefer-arrow-callback
reviewSchema.post(/^findOneAnd/, async function (docs) {
  await docs.constructor.calcAverageRatings(docs.tour._id);
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
