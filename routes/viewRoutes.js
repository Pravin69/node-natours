const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Creating Route for Pug : We can now actually create a new route from which we will then access that template. So let's actually do that here right before the api route. So, app.get, which for rendering pages in a browser is usually always the one that we use, and so that specified the url here, so the route, and that's simply the root of our website. Then just like before we of course need a handler function, so request, response, and now to render our template just like before we used the response object, we still set the status to 200 in this case for okay. But then instead of using json, like this, as we've always used up until this point now it's time for using render. So render will then render the template with the name that we pass in, and that is in this case, base. We don't even need to specify the pug extension because Express will automatically know that this is the file that we're looking for and of course it will look for this file inside of the folder that was specified right in the beginning, so this one. It will go into the views folder, and in there look for the template with the name base. Then it will take that template, and render it, and then basically send it as a response to the browser.

// router.use(authController.isLoggedIn);

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview,
);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewController.getSignUpForm);
router.get('/me', authController.protect, viewController.getAccount);

router.get('/my-tours', authController.protect, viewController.getMyTours);

router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserdata,
);

module.exports = router;
