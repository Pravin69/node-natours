const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const bookingController = require('./controllers/bookingController');
const viewRouter = require('./routes/viewRoutes');

// // It's kind of a convention to have all the Express configuration in app.js. I'm going to require of course, the Express package. We have Express imported, and now what we do is to create a variable called app. Again, that's kind of a standard. So app and assigned result of calling express. That's actually it. This here is a function which upon calling will add a bunch of methods to our app variable here. The first one that we're going to use is actually app.listen to basically start up a server. That is a bit similar to what we did before with the http package in the previous sections, right. So again, keep in mind that Express is 100% nodeJS under the hood, and some of the things work in a very similar way here in Express. All right, again, it simply makes our lives a bit easier by taking some of the complexity away from us.

// We paste in the port and a callback function. Again, this is the callback function that will be called as soon as the server starts listening. Now what we need to do next is to define route. And once more, we actually already kind of defined routes before in the nodefarm project, remember that, but it works very differently with Express. Remember that routing means basically to determine how an application responds to a certain client request, so to a certain URL. And actually, it's not just a URL but also the http method which is used for that request.

// How do we do that? Well, it's very simple in Express. All we do is app, then the http method that we want to respond to, and let's start with the simplest one which is get, and then the URL. We're just specifying the kind of root URL here. Again, the route is basically the URL, which in this case, is just this root URL and also the http method, which is get in this case. Now, what do we actually want to happen when someone hits that URL with a get request? Well, whatever we want to do, we need to specify it in a callback function, which we specify as the second argument. We have a callback function just like this, and this callback function can accept a couple of arguments. The most basic one, and the ones that we usually always need are get request, entity response. In that regard, it is again very similar to what we did before in the nodefarm project. Back then, when we started our server, we also had access to the request and to response object. Now, they are a little bit different here in Express. They have a lot more data and methods on them, but the idea is exactly the same.
const app = express();
app.enable('trust proxy');

// Setting Pug Template Engine: Now, how do we actually build or render these websites? Well, we use what's called a template engine which will allow us to create a template and then easily fill up that template with our data. And the template engine that we're going to use in this course is called pug. There are a couple of other template engines like handlebars or EGS for people who don't like pug, because I know there are some strong opinions around pug, but I would still say that pug is actually the most commonly used template engine with Express. The first step is to actually tell Express what template engine we're gonna use, and we do that by saying right at the beginning here of the app, app.set, so basically this is like a setting for the view engine, and then we set that to pug. And that's it. So we actually need to install pug, and we also need to require it. So we defined our view engine, now we also need to define where these views are actually located in our file system. So our pug templates are actually called views in Express. That's because these templates are in fact the views in the model view controller architecture which we have been using in this course up until this point. And so now it's time to actually create the views folder. With that we have the three components of the MVC architecture. In order to now define which folder our views are actually located in, all we need to do again is to say app.set, and this time it's the views setting and then here the name of the path. Now here we could just put something like this, so /views, but that's not ideal. As you know already, the path that we provide here is always relative to the directory from where we launched the Note application, and that usually is the root project folder, but it might not be.

// So we shouldn't use dot here, but we should instead use the directory name variable. So let's do that, and together with a nice trick that we can use with Note, which is using the path module. Path is a built-in Note module, so a core module, which is used to manipulate path names, basically. So require path, so of course we don't have to install anything. It's just a native built-in module. What we can now do is path.join, and then the directory name, and then views. This will then, basically behind the scenes, create a path joining the directory name /views. Now it might seem here a bit overkill to use this path.join function here, but we don't always know whether a path that we receive from somewhere already has a slash or not. So you will see this function here used all the time in order to prevent this kind of bug. Because this way we don't even need to think about any slashes or not, because Node will automatically create a correct path.
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Implementing CORS: Now what actually is cross-origin resource sharing, and why do we need to implement it? Well let's say we have our API here at natours-jonas.herokuapp.com/api/v1, and so on and so forth. And then some other website, for example at example.com, is trying to access our API. So basically trying to call this URL here. And this is then called a cross-origin request, because herokuapp.com is a different domain than example.com, and so therefore if example.com is trying to access herokuapp.com, it will be a cross-origin request, all right? Now usually cross-origin requests are not allowed, and will by default fail, unless we implement CORS, so cross-origin resource sharing. And since we want to make our API available to everyone, we definitely need to implement that, all right? So that by default, a cross-origin request will always be blocked. Now by the way, this only applies to requests made from the browser. For example, using the fetch API here, or something like the Axios library that we used in our code. And so that means that from the server, we will always be able to make cross-origin requests without any problems.

// So there are no restrictions on the server, but really only on the browser, for security reasons basically. Oh, and also in order to be considered cross-origin, a request might come from a different domain. So just as we saw in our first example here, but also a different subdomain, a different protocol, or even a different port is considered a cross-origin request. But again, since we want to allow other websites to basically access our API, let's now implement cross-origin resource sharing. All right, and so we do that once more by installing an NPM package. So NPM install, and simply CORS. Then here we require that package. And once again, this CORS here is a very simple middleware function that we now need to use for our application, all right? And so app.use, and then call CORS, which in turn will return a middleware function which is then gonna add a couple of different headers to our response. All right, so then you have a couple of other headers, Access-Control-Allow-Methods, allow-credentials, and that's for different cases. All right, but so you see that it's really just all about headers here. So yeah, maybe we could just add these headers by ourselves, but why would we actually do that? I mean we could of course, in order to fully understand really how it works, but in Node.js and Express development, in the real environment you usually will not want to reinvent the wheel, and instead, whenever you can, use packages that other developers have written for us. Anyway, this is how we enable cross-origin resource sharing for all incoming requests. So basically for our entire API.
app.use(cors());
// Access-Control-Allow-Origin *
// api: api.natours.com, front-end: natours.com
// app.use(cors({
//    origin: ['https://www.natours.com'],
// }))

// And so if we only wanted to enable CORS, let's say on the tours, well, we could simply add that here into this middleware stack. All right, but again in this case we really want to allow it everywhere. And so what this everything here means is for all the requests no matter here they are coming from. And so this is ideal for allowing everyone to consume our API. But now imagine the case where we don't want to share our API, but we want to be able to have the API on one domain, or even one subdomain, and then have our front-end application on a different domain. And so in that case all we want it to do is to allow access from this origin here, basically. And so in that case we would use app.use, and then CORS, and then pass in an object for the options where we'd specify the origin to let's say HTTPS://www.natours.com. And so this is just an example in case we had our front-end at natours.com, all right? And so again, with this we would only allow this URL basically, so this origin, to create requests to API.natours.com. Okay, so this was the first part of enabling CORS, but actually that's not all, because right now this will only work for so-called simple requests. And simple requests are get and post requests. On the other hand, we have so-called non-simple requests. And these are put, patch and delete requests, or also requests that send cookies or use nonstandard headers. And these non-simple requests, they require a so-called preflight phase.

// So whenever there is a non-simple request, the browser will then automatically issue the preflight phase, and this is how that works. So before the real request actually happens, and let's say a delete request, the browser first does an options request in order to figure out if the actual request is safe to send. And so what that means for us developers is that on our server we need to actually respond to that options request. And options is really just another HTTP method, so just like get, post or delete, all right? So basically when we get one of these options requests on our server, we then need to send back the same Access-Control-Allow-Origin header. And this way the browser will then know that the actual request, and in this case the delete request, is safe to perform, and then executes the delete request itself, all right? So let's do that and say app.options. Okay, and so again this is very similar to doing app.get for example, or .post, .delete, .patch, and all these verbs that you already know. So .options is not to set any options on our application, it's really just another HTTP method that we can respond to. And so again, in this case we need to respond to it because the browser sends an option request when there is a preflight phase. So we need to define the route for which we want to handle the options. And once again, we will do this on all the routes, okay? And then basically the handler, which once more is the CORS middleware, all right? And once more, we could of course only allow these complex requests on just a specific route. For example app.options, and let's say only on api/v1/tours/:id, like this, okay? So let's say that someone does a delete or a patch request for one of the tours, and only there we allow a preflight phase. And so basically only on this route here, one of these complex requests can be done. So in this case here where we only had this options route, only the tours could be deleted or patched from a cross-origin request, right? And none of our other resources, all right? But once more, let's allow all of them, okay?
app.options('*', cors());
// app.options('/api/v1/tours/:id', cors())

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/',(req,res) => {
//     res.send('You can post to this endpoint...')
// })

// Set security HTTP headers: So, in this video, we're gonna use yet another NPM package in order to set a couple of really important security http headers. So, to set these headers we will yet again use a middleware function which will come again from an NPM package. So, let's install that and it's called helmet. So this is kind of a standard in express development so everyone who's building an express app should always use this helmet package, all right. Because again, express doesn't use all the security best practices out of the box. all we need to do is call helmet here and so that will then produce the middleware function that should be put right here, okay. So in app.use, we always need a function, not a function call, right? So here we are calling this function and this will then in turn return a function that's gonna be sitting here until it's called, all right. And it's best to use this helmet package early in the middleware stack so that these headers are really sure to be set, okay. So don't put it like somewhere at the end put it right in the beginning. Let's now do a request and then take a look at all the headers that it gives us basically. So let's send it here and then now you see we have 14 headers. So that's a lot more than before and so the new ones are basically this one here, prefetch control off. we have this strict transport security, you have the download options, there's also this one here for XSS protection and so the browser understands these headers and can then act on them basically, all right.

// Further HELMET configuration for Security Policy (CSP)
// const scriptSrcUrls = ['https://unpkg.com/', 'https://tile.openstreetmap.org'];
// const styleSrcUrls = [
//   'https://unpkg.com/',
//   'https://tile.openstreetmap.org',
//   'https://fonts.googleapis.com/',
// ];
// const connectSrcUrls = ['https://unpkg.com', 'https://tile.openstreetmap.org'];
// const fontSrcUrls = ['fonts.googleapis.com', 'fonts.gstatic.com'];

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: [],
//       connectSrc: ["'self'", ...connectSrcUrls],
//       scriptSrc: ["'self'", ...scriptSrcUrls],
//       styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//       workerSrc: ["'self'", 'blob:'],
//       objectSrc: [],
//       imgSrc: ["'self'", 'blob:', 'data:', 'https:'],
//       fontSrc: ["'self'", ...fontSrcUrls],
//     },
//   }),
// );

// Further HELMET configuration for Security Policy (CSP)
// const scriptSrcUrls = [
//   'https://api.tiles.mapbox.com/',
//   'https://api.mapbox.com/',
// ];
// const styleSrcUrls = [
//   'https://api.mapbox.com/',
//   'https://api.tiles.mapbox.com/',
//   'https://fonts.googleapis.com/',
// ];
// const connectSrcUrls = [
//   'https://api.mapbox.com/',
//   'https://a.tiles.mapbox.com/',
//   'https://b.tiles.mapbox.com/',
//   'https://events.mapbox.com/',
// ];
// const fontSrcUrls = ['fonts.googleapis.com', 'fonts.gstatic.com'];
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: [],
//       connectSrc: ["'self'", ...connectSrcUrls],
//       scriptSrc: ["'self'", ...scriptSrcUrls],
//       styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//       workerSrc: ["'self'", 'blob:'],
//       objectSrc: [],
//       imgSrc: ["'self'", 'blob:', 'data:'],
//       fontSrc: ["'self'", ...fontSrcUrls],
//     },
//   }),
// );

const scriptSrcUrls = [
  'https://unpkg.com/',
  'https://tile.openstreetmap.org',
  'https://js.stripe.com',
  'https://m.stripe.network',
  'https://*.cloudflare.com',
  'https://*.mapbox.com',
  'https://api.mapbox.com/',
  'https://api.mapbox.com/',
];
const styleSrcUrls = [
  'https://unpkg.com/',
  'https://tile.openstreetmap.org',
  'https://fonts.googleapis.com/',
  'https://api.mapbox.com/',
  'https://api.tiles.mapbox.com/',
];
const connectSrcUrls = [
  'https://unpkg.com',
  'https://tile.openstreetmap.org',
  'https://api.mapbox.com/',
  'https://a.tiles.mapbox.com/',
  'https://b.tiles.mapbox.com/',
  'https://events.mapbox.com/',
  'https://*.mapbox.com',
  'https://*.stripe.com',
  'https://bundle.js:*',
  'ws://127.0.0.1:*/',
];
const fontSrcUrls = ['fonts.googleapis.com', 'fonts.gstatic.com'];

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws:'],
      baseUri: ["'self'"],
      fontSrc: ["'self'", ...fontSrcUrls],
      scriptSrc: ["'self'", 'https:', 'http:', 'blob:', ...scriptSrcUrls],
      frameSrc: ["'self'", 'https://js.stripe.com'],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", 'blob:', 'https://m.stripe.network'],
      childSrc: ["'self'", 'blob:'],
      imgSrc: ["'self'", 'blob:', 'data:', 'https:'],
      formAction: ["'self'"],
      connectSrc: [
        "'self'",
        "'unsafe-inline'",
        'data:',
        'blob:',
        ...connectSrcUrls,
      ],
      upgradeInsecureRequests: [],
    },
  }),
);

// 1] Global Middleware : Now remember that with a post request, we can send data from the client to the server, right? This data is then ideally available on the request. The request object again is what holds all the data, all the information, about the request that was done. If that request contains some data that was sent, that data should be on the request, right? Now out of the box, Express does not put that body data on the request, and in order to have that data available, we have to use something called middleware. We are gonna talk in great detail about middleware in a couple of lectures, but for now, in order to make this work, we need to include a simple middleware here at the top of the file. So actually, right here. What we need to do, is to say app.use then express .json Okay, and that's it. So again, this [express.json] here is middleware. And middleware is basically a function that can modify the incoming request data. It's called middleware because it stands between, so in the middle of the request and the response. It's just a step that the request goes through while it's being processed. And the step the requests go through, in this example is simply that the data from the body is added to it. So it's added to the request object by using this middleware. We use app.use in order to use middleware like this. And again, we will talk a lot more about middleware a bit later in this section. For now, just know that this is how we use middleware.

// So this express dot json here calling this json method basically returns a function, okay? And so that function is then added to the middleware stack. And so, similar to that, we can create our own middleware function.

// 3rd party Middleware : A third-party middleware function from npm called Morgan in order to make our development life a bit easier. So, as I mentioned, we're gonna use a middleware called Morgan which is a very popular logging middleware. So, a middleware that's gonna allow us to see request data right in the console.Okay, now as I mentioned, this logging middleware is gonna make our development life a bit easier. But it still is code that we will actually include in our application and so, that's why it's not a development dependency but just a simple regular dependency.

// So, calling this morgan function will return a function similar to this one here [(req,res,next) => {}] and so, that makes sense because while this is how a middleware function has to look like. What I really wanted to show you is that this function actually returns another function which is the logger and you see that this function just has our own middleware functions has this very typical signature of request, response and next.

// So, we have the information about the request that we just did. So, we get the HTTP method, we get the URL, we get the status code, the time it took to send back the response and also the size of the response in bytes.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Implementing Rate Limiting: In this lecture let's implement rate limiting in order to prevent the same IP from making too many requests to our API and that will then help us preventing attacks like denial of service, or brute force attacks. So, that rate limiter will be implemented as a global middleware function. So, basically, what the rate limiter is gonna do, is to count the number of requests coming from one IP and then, when there are too many requests, block these requests, okay? And so it makes sense to implement that in a global middleware, so, we do that in app.js and the rate limiter that we're going to use is an npm package called Express Rate Limit. So lets install that. npm i express-rate-limit, alright. And then, here at the top of our application, let's call it rateLimit and then require the express and actually it's already here So VS code grabs this name from our package.json file. Okay, so let's now use this middleware right here at the top of our global middlewares, And we start by creating a limiter. So limiter, and we do that by calling the rateLimit function that we just defined up there. So rateLimit is a function which receives an object of options, okay? And in here, we can basically define how many requests per IP we are going to allow in a certain amount of time. So we can specify the max property, which I'm gonna set to 100, and then also the window, so the time window, okay? So what I want to allow here is basically, 100 requests per hour. And this here actually called window milliseconds. Alright, so again, what this will do is to allow 100 requests from the same IP in one hour. Okay, and if that limit is then crossed by a certain IP, they will get back an error message. And here we can now specify that message. Anyway, this limiter now here that we just created is basically a middleware function okay? So, rateLimit is a function which will, based on our objects, create a middleware function, which we now can use using app.use just like we did before. And we can do it simply like this. But what we actually want is to basically limit access to our API route. So, we can specify that here, remember that we can do that with middleware. And so, we basically want to apply this limiter only to a slash API, okay? And so that will then affect all of the routes that basically start with this, your app so forward slash API, great.

// So get all tours, then here is our result and now what I want to show you is these headers here. So our rate limiter creates these two headers so the RateLimit-Limit, and the RateLimit-Remaining, okay? So we start with 100 just as we defined, and now we have remaining, 99, because we already did one request, right? And actually down here, we also have the reset. So basically the timestamp where it is resetted okay? So that one hour window that we specified before.
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  bookingController.webhookCheckout,
);

// Body parser, reading data from body into req.body
// We can limit the amount of data that comes in the body. Remember that? So, here in json, we can actually specify some options and for that as always we pass an object. And so we here can say, limit and let's limit it to 10 kilobyte, okay. And so the package will then understand it will parse this string here into a meaningful data, all right? And so now when we have a body larger than 10 kilobyte it will basically not be accepted, all right.
// app.use(express.json());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data Sanitization: In this lecture, we're going to use two more packages to improve our application security, and this time to perform data sanitization. So, data sanitization basically means to clean all the data that comes into the application from malicious code. So, code that is trying to attack our application. In this case, we're trying to defend against two attacks. This middleware here reads the data into request.body, and only after that we can actually clean that data, right? This is a perfect place for doing the data sanitization. So, we will do data sanitization against NoSQL query injection, and also data sanitization against cross-site scripting attacks. We will now simulate a NoSQL query injection and I hope that you will be as shocked as I was when I first discovered how powerful this can be. Let's now head over to Postman here, and try to log in as someone, even without knowing their email address. All right, so basically, simply giving a password, let's say this one here, we will be able to log in, but even without knowing the email address. Again, we're going to do that by simulating a NoSQL query injection, and the easiest way of doing it goes like this. Instead of specifying a real email, we specify this query, basically. We use the MongoDB greater than operator and set it equal to nothing ( "email": {"$gt": ""} ), okay?

// And now, what happens? Indeed, we are now logged in as the admin. So you see we even got our access token. Again, without knowing the email address, only the password, we were able to log in. And believe me, it's not really difficult to find a bunch of really popular passwords that are used on every application. So, this kind of attack is what we need to protect against. This works basically because this will always be true. So basically, all of the users match this query. Again, it is because this here is always true. That will then select all the usernames. That malicious query injection here allowed us to log in only knowing this password, all right? So, to protect ourselves against this, let's install another middleware, and this one is called express-mongo-sanitize, and since we're here, let's also go ahead and install the other one that we're going to need, but later in this video,  it's called XSS-clean. MongoSanitize is a function that we will call, which will then return a middleware function, which we can then use. This is enough to prevent us against the kind of attack that we just saw before. So, what this middleware does is to look at the request body, the request query string, and also at Request.Params, and then it will basically filter out all of the dollar signs and dots, because that's how MongoDB operators are written. By removing that, well, these operators are then no longer going to work. but now let's use that other middleware that we also just required before. So, app.use and XSS, all right? This will then clean any user input from malicious HTML code, basically. Imagine that an attacker would try to insert some malicious HTML code with some JavaScript code attached to it. If that would then later be injected into our HTML site, it could really create some damage then. Using this middleware, we prevent that basically by converting all these HTML symbols. As I said before, the Mongoose validation itself is actually already a very good protection against XSS, because it won't really allow any crazy stuff to go into our database, as long as we use it correctly. Whenever you can, just add some validation to your Mongoose schemas, and that should mostly protect you you from cross-site scripting, at least on the server side.In the name, let's add some HTML code. You see that the XSS module that we used actually converted these HTML symbols here, mostly this one, into this HTML entity here.

// Data Sanitization against NoSQL query injection:
app.use(mongoSanitize());

// Data Sanitization against XSS(Cross-site scripting attack) :
app.use(xss());

// Prevent Parameter Pollution: And in this one, we're gonna be preventing parameter pollution, using yet another NPM package. But before installing that package, let's go ahead and take a look at the error. But before doing that, let's head over to Postman and see why we actually need to prevent parameter pollution in the first place. So, first up, we need to log in. Okay, so, with this user and this password. So now we can use the Get All Tours route. All right, and so what I'm gonna do now here is to add some parameters to the query string. So let's see, I want to sort by duration, and at the same time, I also want to sort by price. And it doesn't actually make much sense right because we're prepared to only have one sort parameter. So let's see what we actually get with this. And indeed we get an error saying that this .querystring.sort.split is not a function. So it's trying to split the sort property here, which we expect to be a string. But right now since we defined it twice, so sort once and then sort twice, express will actually create an array with these two values, duration and price. And so that of course, we cannot split because split only works on strings, okay? And so this is a typical problem which attackers can then make use of.

// All right, and so basically we're now going to use a middleware which will simply remove these duplicate fields, okay? And that one, let's install it. It is called HPP which stands for HTTP Parameter pollution. So, prevent parameter pollution. And this one again should be used here by the end, okay, because what it does is to clear up the query string, all right? So the error is gone and so now it's only using the last one. So it's sorting my price now. So that's kind of fixed but we actually want some duplicate properties or fields in some cases, right? For example we might want to search for tours with the duration of nine and five. And we want this actually to work but right now it doesn't. It only finds the tour with nine days, right? So what we can do in order to be able to use the middleware but still get this result that we expect here, with the duration, we can white list some parameters, okay? So into this HPP function, we can once more pass an object and then in there, specify the white list, okay? And the white list is simply an array of properties for which we actually allow duplicates in the query string. And so that HPP middleware is doing it's job.
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// Text Compression : And the first thing that I want to do is to install a package that's gonna compress all our responses. So basically, whenever we send a text response to a client, no matter if that's JSON or HTML code. With the compression package, that text will then be dramatically compressed.
app.use(compression());

// Creating our own Middleware: In each middleware function, we have access to the request and the response, okay? But also, we have the next function. And so, just like this, we add  a third argument to this middleware function, okay? And like this, express then knows that we are actually defining a middleware here. What matters is that it's the third argument to this function. So express basically passes the next function as the third argument into this middleware function. And we can then call it whatever we want. But again, next is really the convention in express, and in order to avoid confusion.

// And now, just as we talked in the last video, we actually need to call the next function, okay? And if we didn't call next here, well, then the request/response cycle would really be stuck at this point. We wouldn't be able to move on, and we would never ever send back a response to the client. So I can't stress enough how important it is to never forget to use next in all of your middleware.

// And I wanted to quickly touch on what I just said before, which is that this middleware here applies to each and every single request, okay? And that's because we didn't specify any route. So, remember that before I said that all route handlers here are actually kind of middleware themselves. They are simply middleware functions that only apply for a certain URL. So a certain route, okay. But these more simple middleware functions that we define up here, well, they are going to apply to every single request. At least, if the route handler comes before this middleware.
// app.use((req, res, next) => {
//   console.log(`Hello from the middleware 👋`);
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //   console.log(req.cookies);
  // console.log(req.headers);
  next();
});

// Serving Static files: Now what do I actually mean with static files? Well, it's the files that are sitting in our file system that we currently cannot access using all routes. So, for example, we have this overview.html file here in our public folder. But right now there's no way that we can access this using a browser. But let's say that we actually want to access that HTML file that I was just talking about. So we can, of course, not just write public and then, for example, overview.html, right? There's no way we can access this right now. And that's simply because we didn't define any route for this URL, right? We do not have any handler that is associated to this route. And so, if we actually want to access something from our file system, we need to use a built-in Express middleware. Now in this section we're actually just talking about an API so we don't actually need to serve static files like images or HTML, so what I just showed you.

// So, as I was saying, all we have to do is to use a simple built-in middleware that goes like this. Express dot static, because we wanna serve static files, so this is an obvious name for that. And so in here we pass the directory from which we want to serve static files. And in this case, I'm gonna use the public directory. Now it's not going to work in this URL here. It actually has to be like this. So without the public, just /overview.html. Why don't we need the public folder here in the URL? Well, simply because when we open up a URL that it can't find in any of our routes, it will then look in that public folder that we defined. And it sets that folder to the root.

// Serving static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

// GET
// app.get('/api/v1/tours', getAllTours);

// URL Parameters : Now, what we want to actually implement in this lecture is a way of getting only one tour. So, this is just like we talked about in the REST API lecture, where I said that if we hit this endpoint without any ID, so just like this here, well, then we would get all the tours. But if we would specify an ID after that, so, just like this, and of course it doesn't have to be an ID, it can be any unique identifier, but in this case, the easiest way of implementing it is to just use IDs, okay? So, this here is of course a variable, because it can be five, but it can also be anything else. And so this piece of the URL here, so this here, this is a variable, okay? And so what we need to do is to define a route which can accept a variable.

// So here we have the route, and so now all we need to do is to add that variable. And that's very easy. So we have our slash again, and then the variable, we define it using a colon, like this. And so like this, we created a variable called ID.

// req dot params. Okay, so request dot params is where all the parameters of all the variables that we define here are stored, okay? So these variables here in the URL are called parameters, and again, they are in req dot params, available for us to use now.

// Now there is actually one thing that we can do, and that is optional parameters. So if you want to make this parameter optional, we just add a question mark to it, and now, it is optional, so we no longer have to specify it.(:id?)
// app.get('/api/v1/tours/:id', getTour);

// POST
// app.post('/api/v1/tours', createTour);

// PATCH
// app.patch('/api/v1/tours/:id', updateTour);

// DELETE : So when we have a delete request, the response is usually a 204. And 204 means no content. And so that's because, as a result, we usually don't sent any data back. Instead, we just sent null, okay? So the status is still a success, but the data is null, simply to show that the resource that we deleted now no longer exists. So that is what null means.
// app.delete('/api/v1/tours/:id', deleteTour);

// Mounting Routes : Now, how do we actually connect this new router with our application? Well, we'll use it as middleware, alright? And so that is because, this new modular tourRouter here, is actually a real middleware, alright? And so we can say, app.use, and then the route . So we can use, the tourRouter on our application and where do we want to use the tourRouter? Well, we want to use it on, /api/version-one/tours, okay.

// So again, this tourRouter here, is a real middleware. And we want to use that middleware for this specific route. Okay, and so we use app.use and specify the middleware function, which is this router, then we specify the the route so the URL, for which, we actually want to use that middleware, okay. And so just like this, we created basically a sub application.

// And by the way, this is called mounting the router, okay? So mounting a new router on a route, basically, okay . And actually, mounting the routers, has to come after all of these definitions or at least after we declared a variable, right? So we cannot use the routers before we actually declare them.

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

// Handling unhandled routes: Welcome back, now before we go deep into actual error handling, let's first write a handler for undefined routes. So basically for routes that we didn't assign any handler yet. let's say that instead of apiV1 tours, we would say just api/tours. Okay so in that case we would get this HTML result, all right, so Express automatically sends this HTML code here, along with a 404 Not Found error code in case that there is not any handler for the route that was requested, okay. Or, we could also simply misspell tour here for example. So for example in this case we would still get the same error.

// Now since we're doing an API here, it doesn't make much sense to send back HTML, right, and so let's now fix this and basically create a handle function for all the routes that are not cached by our routers. Okay, so let's go back to our application here and open up app.js. Okay, so that's basically the definition of our Express application. All right now how are we gonna implement a route handler for a route that was not cached by any of our other route handlers? So for doing that remember that all these middleware functions are executed in the order they are in the code. And so the idea is that if we have a request that makes it into this point here of our code then it means that neither the tourRouter nor the userRouter were able to cache it, okay. And so if we add a middleware here after these routers it will only be reached again if not handled by any of our other routers, okay.

// So we're gonna implement a route handler, and so we say app. and now the HTTP method for which we want to specify the route. Now we could use get here right, so just like we did before but then what about post requests, or delete, or patch requests? You would then have to write handlers for these as well, and we don't want that, we simply want to handle all the routes, so all the URL's, for all the verbs right here in this one handler, okay. And so in Express, we can use app.all. And so that's then going to run for all the verbs, So all the HTTP method, all right. Next up we specify the URL, and since here we want to handle all the URL's that were not handled before we can use the star here, which is going to stand for everything, all right, and then the rest is just a regular middleware function, just like before. And then we can use req.originalUrl okay, so that's a property that we have on the request which is as the name says, the URL that was requested, all right. So this new response that we're going to send back now is a lot better than the HTML that we were receiving previously.
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handling Middleware:  So remember that the goal is to write a middleware function, which is gonna be able to handle operational errors like this one. Okay, so when a user hits a URL that doesn't exist, while we can consider that an operational error, and we in this case handle it by sending back this response here, right? But again, the goal is to do that in one central place. And so let's now start by actually building that middleware function. And in Express, it's actually very easy. Remember how I told you that Express already comes with middleware handlers out of the box. So as always, we start by using app.use, okay, and then in here we define our middleware function. So, to define an error handling middleware, all we need to do is to give the middleware function four arguments and Express will then automatically recognize it as an error handling middleware. And therefore, only call it when there is an error. And so just like in many other cases, this middleware function is an error first function, which means that the first argument is the error, and then we have request, response, and next. So by specifying four parameters, Express automatically knows that this entire function here is an error handling middleware.

// So let's now implement the code for this function here and after that I will show you how we can actually create an error so that this middleware function is actually caught. So two steps, first we create the middleware, then in the second step we will actually create an error so that this function will get caught. So all we really want to do in order to handle this error is to send back a response to the client. So res.status, but now we don't really know which status code it is, right? So for example, in this case here it's a 404, but we have some errors here, which have other status codes. Like we have a 400 for example for bad request, or really all kinds of other codes. And so we actually want to read that status code from the error object, all right? So when we create that error a bit later in the second step, as I told you, we will define this status code on the error. So let's say status code, and now I want to define a default here. Because there will be errors that are not coming from us because there are gonna be errors without a status code, so errors that are not created by us, but for example some other places in the note application.

// So we say that the error.statuscode is equal to err.statuscode basically if it is defined or the code 500, which means again, internal server error, and so that's usually the standard that we use. And in the same way, we also define the status, so let's say error.status is equal to error.status if it is defined, and if not, it's error. So error, remember, is when we have a 500 status code and if it's a 400 status code, then it's a fail. So we start with the status and read that from error.status and the message will be coming from the error as well. So err.message and I'm gonna show you in a second how that err.message property here is created. All right, but for now, this is our very simple error handling middleware.

// And so now the second step, where we actually create an error. And so let's do that here. So right here in that function, which handles all the unhandled routes, so let me comment this one out here and instead we want to create an error. So let's say const err and it's a new error. So we basically use the built in error constructor in order to create an error. And now we can pass in a string and that string will then be the error message property. So what we just talked about down here. So that message should be this message. All right? And then it ought to say err.status which is fail, and then err.statusCode is equal to 404. So that's what I mentioned before that we can define the status code and the status on the error object. And so that's exactly what we're doing here. We're creating an error and we then define the status and status code properties on it so that our error handling middleware can then use them in the next step. But now, how do we actually read that next step? So that next middleware. Well, as always, we use next. But this time we use next in a special way. Because now we need to actually pass that error into next, so if the next function receives an argument, no matter what it is, Express will automatically know that there was an error so it will assume that whatever we pass into next is gonna be an error. And that applies to every next function in every single middleware anywhere in our application. So again, whenever we pass anything into next, it will assume that it is an error, and it will then skip all the other middlewares in the middleware stack and sent the error that we passed in to our global error handling middleware, which will then, of course, be executed.

// So we could now go ahead and try to implement this kind of stuff here, everywhere in all our handlers. For example, over here in all of these functions that we have here. So replacing everything that we have here with this kind of error. But what I want to do for now is to actually create our own error class. So that we don't have to write all of this code here and instead have a more like streamlined class of ourself.

app.use(globalErrorHandler);

module.exports = app;
