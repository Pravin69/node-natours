const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const {
  aliasTopTours,
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan,
} = tourController;

// 3] ROUTES
// Refactoring Routes : Because, let's say, that we want to, for example, change the version or the resource name. We would then have to change it in all of these five places, and that is not ideal. And so instead of having all of this, we can do something better. and write app dot route, so that's a new one. And so here we specify the route that we want. And then, on there is where we specify what we want to happen on get. Now, the thing is, that here we can now actually chain the post method. And then we can say createTour just like this. And so just like this, we have now actually created an even better way of writing a route because right now, this is not repeated for the get and the post.

// The two route handlers that we use on this kind of route here. So without the id, is only for get and for post. So for getting all tours, and for creating a new tour.

// Creating multiple routers : We can say that all our routes, so these four routes here, we can say that they're all kind of on a same router, okay? And the router, is this app object. But if we want to separate these routes into different files, so again, one file for these two routes and one file for these two routes, then the best thing to do, is to create one router for each of the resources.

// We create a new router and save it into this variable. So here we use it instead of app.
// const tourRouter = express.Router();
const router = express.Router();

// Nested Routes: Let's think for a second how in practice, we actually want to create a new review. Up until this point, when creating new reviews, we always manually passed the tour ID and the user ID into the request body, and then created the review from there, right. That's okay during development, but of course, that's not how a review will be created in the real world. So, in the real world, the user ID should ideally come from the currently logged in user and a tour ID should come from the current tour. That should ideally be encoded right in the route, so in the URL. When submitting a post request for a new review, we will want to submit that to a URL like this. Let's write that down here just as a comment. Ideally, we will want to do a request for post, for tour, and the ID of the tour, it doesn't really matter here, and then reviews. Okay, so now, just like this, we have the tour ID right in the URL and the user ID will then also come from the currently logged in user. What we see here is now a so-called nested route. They make a lot of sense when there is a clear parent-child relationship between resources. That is clearly the case here, right. Reviews is clearly a child of tour.

// This nested route basically means to access the reviews resource on the tour's resource, all right. In the same way, we will actually also want to access reviews from a certain tour in the same way. Let's say then a get request, and again for tour slash tour ID and slash reviews. This would then ideally get us all the reviews for this tour. We could go even further and also specify the ID of the review. So again, just a random string here, but you get the point. In this case, we would get review with the ID of this here on the tour with this ID. This is what nested routes are all about. This is a way more easier way of reading and understanding how the API works for our API users. It's way easier then messing around with query strings and all that stuff like that. Also, it really shows how there is this clear relationship between these resources, again, reviews and tours.

// Now, since the route actually starts with tours, it will be of course redirected to our tour router. We're going to have to implement this functionality at least for now, in the tour router, even though that seems a bit counter-intuitive since we're in fact, dealing with reviews. But again, for now, let's implement it like this.

// The route that we're going to implement here is slash ID and then reviews. This tour part here, as you already know, is where we mounted this router and so therefore, we do not have to repeat it here.  We now want to implement the create review. Authcontroller dot protect. We also want to restrict access only to users, and then of course, our review controller dot create review, all right. We now need to go ahead and update our review controller right here at create review. We will say, if there is no request dot body dot tour, so basically if we didn't specify the tour ID and the body, then we want to define that as the one coming from the URL. Req dot body dot tour equals request, and now remember how that URL parameter is on request dot params and then of course, the name of the parameter itself, so tour ID. This is the first part and second, we also need to do the same with the user. If there is no request dot user, or actually, request dot body dot user, well then the request dot body dot user should be request dot user dot ID. And again, we get request dot user from the protect middleware, and that's actually it.

// POST /tour/234fadd4/reviews
// GET /tour/234fadd4/reviews
// GET /tour/234fadd4/reviews/94887fda
// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview,
//   );

// Let's now improve the nested route implementation that we coded in the last lecture. And for that, we're gonna use a special advanced express feature. So, as you remember, in the last video we implemented a simple nested post route, so just this one here. Right. And so this means that the review route is kind of within the tour route. And again, because reviews belong to tours in a sense. Right? And so this is a very common thing to do in Api design. Now, the problem with this implementation is that it is, of course, a bit messy. And that is because we put a route for creating a review in the tour router. Simply because a route starts with slash tour. So that's a bit confusing, and what's also confusing is that we have something very similar to this here, also in our review route. So, basically this here. So when we create a new review without the nested route, this piece of the code here is actually exactly the same as this one. Right? And so, besides this being a bit confusing, we also have duplicate code which we would have to maintain in two separate places in case we wanted to change anything. And so again, that's a very bad practice. And so let's now fix this using an advanced express feature called mergeParams. Next up, we will actually import the review router into this tour router. And so we will basically say that this tour router should use the review router in case it ever encounters a route like this. And Review routes. Did I call it routes or router? Should be called router.

// Okay? So, keep in mind that a router itself is really just a middleware. And so we can use the use method on it, and then say that for this specific route here, we want to use the review router instead. Okay? And so this is actually again mounting a router. And like this, we have the tour router and the review router nicely separated and decoupled from one another. But now, there's actually still one piece missing because right now this review router here doesn't get access to this tour id parameter, okay. And so now we need to enable the review router to actually get access to this parameter here as well. So let's now move to the review router, okay. And so this is where the magical mergeParams that I mentioned right in the beginning comes into play. So here, in the express.router function, we can specify some options, and here all we need to do is set mergeParams to true. And that's it. But why do we actually need this here? Well, it's because, by default, each router only have access to the parameters of their specific routes, right. But here, in this route, so in this URL for this post, there's of course actually no tour id. But, we still want to get access to the tour id that was in this other router, right. So this here. And so, in order to get access to that parameter in this other router, we need to physically merge the parameters, okay. And so that's what mergeParams, set to true, does.

router.use('/:tourId/reviews', reviewRouter);

// Param Middleware : So param middleware is middleware that only runs for certain parameters, so basically, when we have a certain parameter in our URL. Now in our example here, the only parameter that we might have in our route URL is the id, right? And so we can write middleware that only runs when this id is present in the URL.

// It is quite simple actually, so it's on our router and then the param method, okay. And so here we specify first the parameter that we actually want to search for, so basically the parameter for which this middleware is gonna run, and it's called id, and then of course our actual middleware function. And as usual, we have access to the request and to the response object, also to the next function, right? Now in a param middleware function, we actually get access to a fourth argument and that one is the value of the parameter in URL. So we usually call that one val, which stands for value.

// Now, what I also want to show you is that this middleware function is not going to run for any of the user routes. And so that is of course because this middleware function is only specified in our tour router. So in this kind of local mini application.
// router.param('id', checkID);

// Creating multiple routes :

// So here, we only want the root, and in here, we only want the id, okay? Now, why is that? Well, it's because this tourRouter middleware, only runs on this route here anyway, okay? And so once we are in the router, then we already are at this route. So at our tourRoute, and so this first route that we had to before, we only want to run it as, api/version-one/tours and so that is what this route here now means, okay? So it's basically the root of this URL, okay.

// So let's say that we have an incoming request now for /api/version-one/tours/version id. So the request goes into the middleware stack and when it hits this line of code here, it will match this URL here, right? So it will match this route and therefore or tourRouter middleware function will run. So our tourRouter is this sub application that we created, which in turn has its own routes, okay? And if the request was for /id, well, then it will inside our mini app, hit this route here, right? And finally, of course, it will run one of these handlers here, depending on the method that was used. So I hope that made sense.

// Chaining Multiple Middleware : So its very easy. Lets say our function is called middleware and so what you have to do is to simply add that function here before the createTour handler that will ultimately create the tour. Okay? So this way when we have a post request for this route, it will then run this middleware first and only then the createTour.
// router.route('/').get(getAllTours).post(checkBody, createTour);

// Always place more specific routes (like /top-5-cheap) before more generic ones (like /:id) to ensure that routes are matched correctly.
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(authController.protect, getAllTours).post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour,
  );

module.exports = router;

// So just to recap, the flow goes like this. We start receiving the request in the app.js file, right? It will then depending on the route enter one of the routers, so let's say the tour router, and then depending, again, on that route, and of the request, it will then execute one of these controllers here, and so these are in the tourController files. And that's where then finally the response gets sent, and finishing the request-response cycle.
