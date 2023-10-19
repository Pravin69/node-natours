const stripeLib = require('stripe');
const catchAsync = require('../utils/catchAsync');
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const factory = require('../controllers/handlerFactory');
const AppError = require('../utils/appError');

// Integrating Stripe to Back-End: So in this video let's integrate Stripe into our backend by creating that API endpoint which will create and send back a Stripe checkout session. And so at this point, we're actually gonna start creating our next resource. And so that's the bookings. So let's router.get and the route that it will create here will once again not follow the rest principle because this one is not really gonna be about creating or getting or updating any booking. Instead this route will only be for the client to get a checkout session. And so let's actually call this one checkout session. Then we need to protect this route so that only authenticated users can actually get a checkout session. So that makes sense, right? And then add booking controller. We're gonna create a route handler called get checkout session. Now actually there's one more thing we need to do here in the routes which is to specify a URL parameter. And so that's going to be the tour ID. Okay, so basically we want the client to send along the ID of the tour that is currently begin booked. And that is so that we can fill up the checkout session with all the data that is necessary, such as the tour name and the tour price and all that stuff. So let's layout our steps here again. So get the currently booked tour. Then as a second step, we create the checkout session and then finally send it to the client. Great, next up, let's create that session here. And for that we actually need to install this stripe NPM package. Anyway, const stripe equal require and then stripe. Now this here will then expose a function basically. And usually what we do then right away is to pass our secret key right into that. And so that will then give us a Stripe object that we can work with. So we say Stripe.checkout.sessions.create. And then the usual object of options. All right, now there are a ton of options that we can set here. But only three of them are required. So the first one is the payment method types. So that is an array where we can specify multiple types and card is for credit card. And right now that's actually all the payment options that we can use for Stripe checkout. But I read that in the future they will add a lot more.

// Then we need to specify the success URL. And so that is basically the URL that will get called as soon as a credit card has been successfully charged. So as soon as the purchase was successful the user will be redirected to this URL. Then we also need to specify the cancel URL. So just like this. And this one is gonna be similar. And so basically it's the page where the user goes if they choose to cancel the current payment. And actually let's make them go to the tour page where they were previously. Next up, we can also specify the customer email. And so that is very handy because of course we already have access to the customer's email. And so with this we can save the user one step and make the checkout experience a lot smoother. Next up, we can then also specify a custom field which is called client reference ID. And that sounds a bit weird but actually it's going to be really important for us. So this field is gonna allow us to pass in some data about the session that we are currently creating. And that's important because later once the purchase was successful, we will then get access to the session object again. And by then, we want to create a new booking in our database. And also remember how that is only going to work with deployed websites. But still, let's already prepare for that here. Okay, so to create a new booking in our database we will need the user's ID, the tour ID, and the price. And in this session we already have access to the user's email and from that we can then recreate the user's ID because email here is unique. We will also specify the tour's price here in a second and so all that's missing is then the tour ID. And so that's what we're gonna specify here on this custom field basically. So that's called client reference ID. And all of what I just explained before actually is gonna make a lot more sense once we actually implement that last step of creating a booking in the database, right? Anyway, that tour ID is at request.params.tourId. All right, and now finally, we're gonna specify some details about the product itself. So our tour in this case. And so that's called line items which accepts an array of objects. So basically one per item and so in our case that's only gonna be one. So we're to specify the name of the product and so that's at tour.name and as always we also add the tour to that name. Then we can also specify a description. And all these field names here they really come from Stripe.

// So we cannot make up our own fields. So if you try to do that, you will really get some error. Then we can also specify an array of images. Now these images here they need to be live images. So basically images that are hosted on the internet because Stripe will actually upload this image to their own server. And so this is another of the things that we can only really do once the website is deployed. So this is one more thing that we actually need to change once we put our website into production. Anyway, next up is the amount. So basically the price of the product that is being purchased. So that is tour.price and now we need to multiply that by 100. Because this amount is expected to be in cents. And so one dollar or one Euro or really most of the currencies have 100 cents. So one dollar equals 100 cents. And so to convert it to cents, just multiply it by 100. Then we also need to specify the currency. And so that's in this case USD. But it could also be like, for Euro it's EUR and for other currencies, you should probably take a look at the documentation. Anyway, finally we also specify the quantity. And so that's just one tour in this case. So that's actually it. And so basically this part here is the information about the session itself. And then here is the information about the product that the user is about to purchase. All right, now let's actually store the session. So this create here basically returns a promise because setting all these options here will basically do an API call to Stripe and so then of course that's an asynchronous function that we should await here. So as always, the status is success. And then let's simply send the session like this. And so we're missing the second step where we then actually charge the credit card on the client side.

const stripe = stripeLib(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour

  const tour = await Tour.findById(req.params.tourId);

  if (!tour) return next(new AppError('Tour not found!', 404));

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/my-tours?alert=booking`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              `${req.protocol}://${req.get('host')}/img/tours/${
                tour.imageCover
              }`,
            ],
          },
        },
      },
    ],
    mode: 'payment',
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

// Creating New Bookings on Checkout Success: So let's now create a new booking document in our database whenever a user successfully purchases a tour. So we're back here in the booking controller and in the raw tender, which creates the checkout sessions, right? And remember that here we have this success url and this url is the basis of the functionality that we're going to implement in this lecture. So whenever a check out is successful, the browser will automatically go to this url, which right now is basically simply our homepage, right? It's also at this point in time, so when a checkout is successful that we want to create a new booking, right? So basically we want to create a new booking whenever this url here is accessed. Now we could now create a new route for this success, but then we would have to create a whole new page and that's not really worth it in this case. And that's because what we're going to do in this lecture is only a temporary solution anyway because it's not really secure, okay? So remember how we said some lectures ago and that nice diagram that later when a website is actually deployed on a server we will get access to the session object once the purchase is completed using Stripe Webhooks. And so these webhooks will then be perfect for us to create a new booking. Okay? But for now, since we can't do that yet, let's use a work around, which is simply to put the data that we need to create a new booking right into this url as a query string. Okay? And we need to create a query string because Stripe will just make a get request to this url here, and so we cannot really send a body or any data with it except for the query string. So let's do that and what we need here is basically the three required fields in our booking model. So tour, user, and price. Now as I said before, this is of course not secure at all because right now anyone who knows this url structure here could simply call it without going through the checkout process, right? And so anyone really could just book a tour without having to pay.

// All they'd have to do is to open this url with the tour, user, and price and then they would automatically create a new booking without even paying, okay? So again, not really secure, but for now as a work around it works just fine because not many people will of course will know that this our success url. Okay? Because actually we're going to hide that fact a little bit in a second, okay? So let's now create the function that will actually create the new booking in the database. And let's start by getting our data from the query string. So tour, user, and price are available at request .query. Then we actually only want to create a new booking if all of these here are specified. And so basically we say that if they don't exist then we turn and go to the next middleware. So that's our very standard procedure, right? So we say that if there is no tour and no user and no price. So basically we require that all on them exist. Now what exactly is the next middleware actually? Well remember that we want to create a new booking on this home url. So this one here ('/'). Because again that is the url that is called whenever a purchase is successful with Stripe. And so what we need to do is add this middleware function that we're creating right now onto the middleware stack of this route handler. So what route handler is that? Well it's in view routes and it is this one, right? But again this is the route that will be hit when a credit card is successfully charged. And so this is also the point of time where we want to create a new booking. And so here is where we need to add that middleware function so let's actually do that . And again this is here just kind of temporary until we actually have our websites deployed to a server where we will then be able to create a better solution for this. So here in the booking controller it is now time to actually create that new booking.

// At this point all we want to do here is create that new document, okay? Next up we could then say next, like this. And so that would then go the next middleware but that's not really ideal. So again keep in mind that the next middleware in the stack is of course this one and the get overview. So basically the function that it's going to render our page. But remember that this url is all of this. So all this with all this data here. And so again that's not secure at all. And so at least let's make it a little bit more secure, all right? And so what we can do here is to basically redirect the application now to only this url. And so basically you're removing the query string from the original url. And so actually we're now going to use something we never used before. So now what we want is the entire url, but without the query string. So what we're doing is request .theoriginalurl, which we already used before. And so that's the entire url basically from which the request came. And so now what we need to do is to split it by the question mark. Right? Because that's the divider between the part that we actually want and the query string. So if we split this by the question mark, then we will have an array where the first element is this and the second element is all of the rest. And so here we take the first element and so that is then our homepage. So our root url. And what redirect here does is basically to create a new request but to this new url that we passed in there. All right? So this will now create yet another request to our root url. So we're again gonna hit this route. And so once more we will hit this middleware here. So the one that we're just creating. So for the second time we're going to be hitting that but now the tour, user, and price are no longer defined. And so then we will go to the next middleware, which finally is the get overview handler function, which then we'll just render the homepage, okay?

// Made sense? So let's just again take a minute to recap what we did here. So basically we added all the variables that we need to create a new booking to the success url. Then we added a new middleware function here to the stack of that exact route. So this one here. And so like this whenever this url here is hit we will attempt to create a new booking. All right? But that new booking is of course only created when the tour, user, and price are specified in the query. And so in this middleware function, if they are specified on the query well then we create a new booking in here. Then after that is done we remove the query string from the url in order to make the whole process a bit less transparent for the user. Basically so that whole query string doesn't show up in our browser's url bar. And then down here we redirect our application to this new route url here, okay? And so this way this middleware here will be skipped and then our normal homepage will simply get rendered.
const createBookingCheckout = async (session) => {
  // This is only TEMPORARY, because it's INSECURE everyone can make bookings without paying
  //   const { tour, user, price } = req.query;

  //   if (!tour || !user || !price) return next();

  //   await Booking.create({
  //     tour,
  //     user,
  //     price,
  //   });

  //   res.redirect(req.originalUrl.split('?')[0]);

  const tour = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email }))._id;
  const price = session.amount_total / 100;
  await Booking.create({ tour, user, price });
};

// Stripe WebHooks: Once more, all of this code here will run whenever a payment was successful. Stripe will then call our webhook, which is the URL, which is going to call this function. And so, this function receives a body from the request, and then together with the signature and/or webhook secret, creates an event, which will contain the session. And then using that session data, we can create our new booking in the database.
exports.webhookCheckout = (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
