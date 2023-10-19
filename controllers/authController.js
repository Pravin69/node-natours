/* eslint-disable arrow-body-style */
const crypto = require('crypto');
const util = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

// AuthController: So, we will do most of the user-related stuff like creating new users, logging users in, or updating passwords in the authentication controller. So all of the stuff that's related to authentication really, is not gonna be in the user controller that we actually created before, but instead we will create an authentication controller. So all the functions that are related to authentication will go here. And now, all we need to do is to actually implement the route so that this signup handler here then can get called.

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // Sending JWT via Cookie : So we learned in the last lecture that the JSON web token should be stored in a secure HTTP-only cookie. But right now, we're only sending the token as a simple string in our JSON response. So in this video, let's also send the token as a cookie, so that the browser can then save it in this more secure way. So we're in our code. Do we actually send the token to the client? Well, remember, that's in the authController and right here in the createSendToken function. So first of all, a cookie is basically just a small piece of text that a server can send to clients. Then when the client receives a cookie, it will automatically store it and then automatically send it back along with all future requests to the same server. All right, so again, a browser automatically stores a cookie that it receives and sends it back in all future requests to that server where it came from. So in order to send a cookie, it's actually very easy. All we have to do is to basically attach it to the response object. So we say res.cookie and then all we have to do is to specify the name of the cookie, and I'm calling it JSON web token, then the data that we actually want to send in the cookie, and so that's of course gonna be the token variable and then after that, a couple of options for the cookie. And the first option that we're gonna specify is the expires property. Okay, so basically, this expires property will make it so that the browser or the client in general will delete the cookie after it has expired. Okay, and so we set the expiration date similar to the one that we set in the JSON web token, okay. So let's actually create a new variable for that, okay, because the JSON web token package can then work with this format. and so instead, let's create a variable with a real number. So let's call it still JWT, then cookie, expires in, and we still set it to 90, so 90 days, but again, without the D. Okay, so that now we can make actually operations with it because we will need to convert it to milliseconds, okay.

  // So when should this cookie expire? It should expire at a new date. So in JavaScript, when specifying dates, we always need to say new Date and then it should expire at right now, plus these 90 days. But now, of course, we need to convert that to milliseconds. The next option is gonna be the secure option. And so we're gonna set this one to true and so like this, the cookie will only be sent on an encrypted connection. So basically, we're only using HTTPS, all right. And then finally, it's that httpOnly option that we've talked about before. Okay, so we set this one to true and so this will make it so that the cookie cannot be accessed or modified in any way by the browser. Okay, and so this is important in order to prevent those cross-site scripting attacks. All right, so all the browser is gonna do when we set httpOnly to true is to basically receive the cookie, store it, and then send it automatically along with every request. Okay, and that's actually it. Now, if we wanted to test this right now, it wouldn't work because right now, we're actually not using HTTPS. And so because of this secure: true, the cookie would not be created and not be sent to the client. All right, and so basically, we only want to activate this part here in production. So what I'm gonna do is to basically export this entire object here into a separate variable. Yeah, so now, only when we're in production, we will get the secure options set to true. And otherwise, it will only be sent like this, so just with the expiration date and httpOnly. So the name is like the unique identifier for a cookie. And so if we receive one with the a name that was already given, well, then the old one is simply replaced.  Now, just one last thing that I actually want to change in that function that we're just working on, so the createSendToken, is to basically get rid of this password here in the output. Okay, so in our schema, we actually have it set to select false, so that it doesn't show up when we query for all the users. But in this case, it comes from creating a new document and so that's different and so that's why we see it here. Okay, but we can actually very easily fix this. Okay, so all we need to do actually is to set user.password to undefined. All right, and so that should remove the passwords from the output.
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: req.secure || req.headers('x-forwarded-proto') === 'https',
  };

  //   Testing for secure HTTPS: So, let's go here to our authentication controller. And right here at the top, in this create sent token function, here is the place where we set the adjacent web cookie to secure, if we are currently in production. Remember that. So, remember that we created this function with JSON response, it also sends a cookie, which also contains the JSON web token. And that cookie has a couple of options. The first one, when it expires. The second one, that it can only be accessed via http basically. And then, when we're in production, we said that this cookie can only be sent on a secure connection. So, basically, on an https connection. All right. Now, the problem with that is that actually, the fact that we are in production, does not mean that connection is actually secure. Right? Because of course, not all deployed applications are automatically set to https. And so we need to change this if that we have here. All right. Now, in express we actually have a secure property that is on the request. And only when the connection is secure, then this request dot secure is true. Okay? Makes sense, right? Now the problem is, that actually in Heroku, this doesn't work. And that's because Heroku proxy's, so basically redirect or modifies all incoming requests into our application before they actually reach the app. All right. So, in order to make this also work on Heroku we need to also test if the x forward proto header is set to https.

  //   So, if either req.secure is true, or if this header here is set to https, then we want the secure options here set to true. However, right now, this is still not going to be working, because there's just one more thing that we need to do, which is basically to make our application trust proxy's. So, again, request dot secure doesn't work in the first place because Heroku acts as a proxy, which kind of redirects and modifies incoming requests. And, so, we need to go to app dot JS and then right after this one here, let's now trust proxy's. And we do that by saying app dot enable trust proxy.
  //   cookieOptions.secure =
  //     req.secure || req.headers('x-forwarded-proto') === 'https';

  res.cookie('jwt', token, cookieOptions);

  // remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  // this is a vulnerability as anyone can act as an admin, restrictToOnlyUser middleware is safeguarding this vulnerability by allowing only users
  // const newUser = await User.create(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  const url = `${req.protocol}://${req.get('host')}/me`;
  await new Email(newUser, url).sendWelcome();

  // Signing up Users: Now there are some libraries out there that can help us implement authentication and authorization and the most well known one is called Passport, but even a library like that doesn't take all the work and all the responsibility away from you, all right. Now in this case here, we are actually gonna implement the whole login protecting and authorization logic all by ourselves, except of course for the Json web token implementation that we talked about in the last video itself.

  //   Anyway, the first functio that we're gonna use with JWT here is sign, okay, so in order to basically create a new token, and for that of course we need the payload, we need the key so that private secret that I mentioned before that's only stored on our server and that we need to sign the token and then we can pass on some options.  So we also talked about the verification process and that's basically implemented in this function, okay, and so this is the one that we're gonna use, when logging in a user, okay. Okay, so lets create our token here, okay, and I'll like to simply call it like this so just token, okay, then JWT dot sign, and now the first thing is the payload, and this is basically an object for all the data that we're going to store inside of the token, and in this case, we really only want the ID of the user, all right, so nothing crazy here, not a lot of data that's not really important. So we say that the ID is and then we simply get the ID from the new user that was just created, okay, so new user dot and then remember that in MonogoDB, the ID is actually called underscore ID, all right, and so that is the object that's the data, the payload, that we want to put in our JWT. Next up, we need the secret, okay, so basically a string for a secret, all right, of course this is a terrible one, all right, this is just kind of a place holder because actually, our configuration file is a perfect place to store this kind of secret data, so just like password for example, and so let's go add and edit here, okay.

  // What does matter is the secret that we specify here, all right, because using the standard HSA 256 encryption for the signature, the secret should at least be thirty two characters long, all right, but the longer the better actually and this is where many tutorials out there fail.  So at this point, we have the payload and we have the secret. The token header will actually created automatically but now what we can also do is to pass on some options, and the option that I'm gonna pass in is when the JWT should expire. So this means that after the time that we're gonna pass in here, the Jason web token is no longer gonna be valid, even if it otherwise would be correctly verified, all right, so this is basically for logging out a user after a certain period of time simply as a security measure, okay. So let's actually define that expiration time also as a configuration variable here, so JWT expires in.

  // So these options as always, we passed them in as an object and then let's specify the expires in, so expires in and then process dot end and then JWT expires in, okay, and this here will then add some additional data to the payload, but that's of course no problem at all. So we just created a token, now all we need to do, is to send it to the client.

  createSendToken(newUser, 201, req, res);
  // const token = signToken(newUser._id);
  // res.status(201).json({
  //   status: 'success',
  //   token,
  //   data: {
  //     user: newUser,
  //   },
  // });
});

// Login in Users: We're gonna implement the functionality of logging users in based on a given password and email address. And just like before, the concept of logging a user in basically means to sign a JSON web token and send it back to the client. But in this case we only issue the token in case that the user actually exists, and that the password is correct. so these options as always, we passed them in as an object and then let's specify the expires in, so expires in and then process dot end and then JWT expires in, okay, and this here will then add some additional data to the payload, but that's of course no problem at all. So we just created a token, now all we need to do, is to send it to the client.

// Okay, next up, let's check if there actually is a user for the email that was posted. So const user, and so let's now use the findOne actually, because this time we're not selecting a user by the ID, but instead by its email, right? And so we need to pass in that filter object where we can say email equal to email, okay? So the field is called email, and the variable is also called email.

// So get all users, and now indeed we see that their password is not included in the output. And that is important because actually, in the find, so back here in the AuthController, this here will now also not contain the password, okay? And so the output of this here will now also not contain the password. But we do need the password in order to check if it is correct, right? And so we need to explicitly select it as well. So remember how we used select before to basically simply select a couple of fields from the database, only the ones that we needed? Now in this case, when we want the field that is by default not selected, we need to user plus and then the name of the field. So password in this case. And so like this, it will be back in the output, okay? Of course we need to await this query, and then mark the function as async.

// and Now remember that the function that we just defined is an instanced method. And so therefore it is available on all the user documents. And so this variable here right now is a user document, right? Because it's a result of querying the user model. And so we can now say user.correctPassword. Now all we need to do is pass in the candidate password, which is password, remember. So this one here, and then the userPassword.
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide an email and password', 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    // 401 status code is for unauthorized
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
  // const token = signToken(user._id);
  // res.status(200).json({
  //   status: 'success',
  //   token,
  // });
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'You have been logged out',
  });
};

// Protecting Routes: So far in our authentication implementation we have logged users in with a correct password. So basically we completed this first step of the authentication workflow where a JSON web token is created and sent back to the client if the user provides a correct email and password. So next up we will actually implement protected routes. So basically using the created JSON web token in order to give logged in users access to protected routes. And this is the second step of authentication. So let's say that we wanted to protect the getAllTours route. So basically only allowing logged in users to get access to a list of all our tours. And what what means is that before running the get all tours handler, so let's take a look at that. Okay, so before running this handle here, we would need to have some check in place in order to verify if the user is actually logged in or not, right? And so the best way of doing that as you already know at this point probably, is to use a middleware function, all right? So in this video, in order to protect routes, we're gonna to create a middleware function which is gonna run before each of these handlers, okay.

// All right, and now about the implementation of this protect middleware. What exactly will we have to do? Well, let's start by lining out a couple of steps here.So basically getting the token and then check if it actually exists. So a common practice is to send a token using an http header with the request, okay? So let's take a look at how we can set headers in Postman to send him along with the request and then also how we can get access to these headers in Express.

// Okay, so we talked about http headers before, and so this is how we can get access to them in Express. Okay, so basically to the request headers, so the ones that a client can send along with their request. Okay, and so here in Postman, let's now actually get to the route that we're actually trying to protect. And then here set a header. And so indeed here we get an object with all of the headers that are part of the request. So all of this here. And you see that there are a bunch of headers that Postman actually sends automatically along with the request for example, it says the the user-agent is Postman it also sends the host, and some other ones that we're gonna talk about later like accept for example. Now what matters here is actually the header that we set ourselves. Now to send a JSON web token as a header, there's actually a standard for doing that. And so that standard for sending a token is that we should always use a header called authorization. Okay? So just like this and then the value of that header should always start with Bearer, okay? Because basically we bear, we have, we possess this token and then here the value of the token. So just like this random string that we got before. and so let's send that now. And then indeed, we should get it here. Okay. Now Express then automatically turns all header names to lowercase, as you can see here, but of course, our header value here is still the same. Okay, and so basically this piece of the header value is our token. And so that's how we should now read that token from the header.

// All right? So if there actually is req.headers.authorization, okay, and if it starts basically with this bearer string here okay, so req.headers.authorization and now this is a string and so we can use startsWith on that okay, so this is just normal JavaScript again okay. And so these are the conditions under which we actually want to save a token, okay? So, again, in case that tghe header exists and that its value starts with Bearer, okay. Then in that case we want to say that the token is equal to req.headers.authorization and now how do we actually get this second part of the string? Well, we're basically gonna split the string by this space character, okay, which will then create an array with this Bearer and with this token and so then we're gonna take that part of the array that we want. So split using space, and then from that array we want the second element. So here we have our JSON web token data we just sent along with the request.

// And I hope you remember that in this step, we verify if someone manipulated the data or also if the token has already expired. So we already used, from the JSON web token package, the assign function function, and now we're gonna use the verify function. So just like before, jwt.verify, and then in there, as you can imagine, we pass the token so that the algorithm can read the payload and then remember that this step also needs the secret. So basically, in order to create the test signature. So that secret is process.env.JWT_SECRET. Remember that? Now, as a third argument, this function actually requires a callback function. So this callback is then gonna run as soon as the verification has been completed. So you see that this verify here is actually an asynchronous function. So it will verify a token, and then after that, when it's done, it will then call the callback function that we can specify. Now, we've been working with promises all the time, and I don't really want to break that pattern here. And so, we are actually going to promisifying this function. So basically, to make it return a promise. And so that way, we can then use async await just like any other async function that we've been using. So in order to do that, Node actually has a built-in promisify function. All we need to do in order to use it is to require the built-in util module.

// So that will create an object called util, require... All right, so that stands for utility. That's not what I wanted. So that stands for utility. And then on there, we are going to use the promisify method. All we have to do is to actually call promisify. So promisify, and then pass the function in there. And so now, all this here is a function that we need to call, which will then return a promise. So then here, we actually call  the function. So that result value of the promise will actually be the decoded data, so the decoded payload from this JSON web token. let's log this decoded data to the console as well. So basically, the correct user ID. We then also have the timestamp of the creation date and of the expiration date of the token, as well. So this is working. But now let's actually try to manipulate the payload of this token. And so now, I will actually try to get access to that protected route using this manipulated JSON web token. Okay, make sense? So just to see if it's working correctly. And so, if I now send this request, then we get an error. So, great. So, we see the error name is JsonWebTokenError, and we have an invalid signature. So, great. That's exactly what we were looking for. So that is one of the two errors that can occur. The other one is that the token has already expired. So this one is called JsonWebTokenError, and so actually, let's go ahead and handle this error now.

// I actually want to use our global error-handling middleware in order to do that for us. So we don't like to do error handling right here in our middleware function. Instead, we usually delegate it to the error controller.And so, what we want to say here is simply, invalid token, please log in again. And then, the error code, just like before, is a 401 for Unauthorized. Now, this only works, remember, in production. But another one is that the user tries to access the application with an already expired token. So we can log in, and it will then give us a new token, but this token is only valid for five seconds. And so, these five seconds should have passed at this point. So I will now copy this token and try to access our protected route using that token. And so, this one has the name of TokenExpiredError. All right. And so, let's now handle this one as well. And so this, of course, is very similar to the one before. Your token has expired. Please log in again. And again, with a 401 error code.

// And again, most tutorials that you're gonna find out there would, in fact, just stop here. But this is not really secure enough just yet. So for example, what if the user has been deleted in the meantime? So the token will still exist, but if the user is no longer existent, well then we actually don't want to log him in, right? Or even worse, what if the user has actually changed his password after the token has been issued? Well, that should also not work, right? For example, imagine that someone stole the JSON web token from a user. But then, in order to protect against that, the user changes his password. And so, of course, that old token that was issued before the password change should no longer be valid. So it should not be accepted to access protected routes. So the first thing to do is to check if the user actually still exists. And so, that one should be the easiest one. So let's just say, User.findById. And so, this is now why we actually have the ID in the payload, because we can now use that ID and query the user using just that ID. So decoded.id. All right? So that should then find the new user. So step number four, check if user has recently changed their password. So basically, after the token was issued. And to implement this test, we will actually create another instance method. So basically, a method that is going to be available on all the documents. So documents are instances of a model.

// And so, actually, this code belongs to the User model and not really to the controller. Okay? And so, let's do that just like we did before for checking the password. So in User model, we already implemented this correctPassword static instance method, remember? And so, let's now create another one. So userSchema.methods.changedPasswordAfter. So function, and into this function, we will pass the JWT timestamp. So basically, that timestamp which says when the token was issued. And by default, we will return false from this method. And that will then mean that the user has not changed his password after the token was issued. But then, we also have if this, and remember that in an instance method, the this keyword always points to the current document. And so therefore, here we have access to the properties. Now, we actually need to create a field now in our schema for the date where the password has been changed. So passwordChangedAt, and the type of it will be a Date. Now, this passwordChangedAt property here will always be changed, of course, when someone change the password. So right now, we don't have that logic anywhere, and so nowhere we are actually defining this property. And so, most of the documents, so most of the users, they will simply not have this property in their data, so in their object, right? And so, of course, we need to test for that. Okay? So if the passwordChangedAt property exists, only then we want to actually do the comparison. Okay? But if not, so if passwordChanged does not exist, well then that means that the user has never actually changed the password, and so therefore we can simply return false.

// And again, later in the section when we will implement the logic for changing the password is when we will then set this property. Now, in order to actually see the result of this, we, of course, need to call this method. So that's what we're gonna do here in step four. Okay? And so, remember that we can call this instance method on a user document. So freshUser.changedPasswordAfter, and then that timestamp. So that's at decoded.iat, so issued at, basically. All right. So we basically have this one here this date format, and then the other one in this millisecond or second timestamp here. And so, we now need to convert this passwordChangedAt also to a timestamp like that. So changedTimestamp. And we can use this.passwordChangedAt.getTime. Okay? And so, that's one of the many, many date functions that JavaScript gives us. And so what we see here basically is that this one here is now, basically, in seconds, and this one in milliseconds. So it's 1000 times more. And so, we know we need to divide this by 1000 and then parse this entire thing as an integer. And for that, we use parseInt. So another JavaScript function that's available for numbers. And then we actually also need to specify the base. So this is a base 10 number. And not changed basically means that the day or the time at which the token was issued is less than the changed timestamp.

// So just as an example here, let's say that the token was issued at time 100. But then, we changed the password, let's say, at time 200. Okay? And so, we changed the password after the token was issued, and so therefore, this is now true. All right? And that's exactly what we want to return here, because false means not changed, and so true, of course, means changed. But now, let's say that the password was last changed at 200, but then only after that, we issued the token, so let's say, at time 300. And so, 300, less than 200? No, that's false. And so, we return false, which again means not changed. So if the password was actually changed, well, in this case, we actually want an error. So return next, again, a new AppError. Recently... Please log in again. Okay. And once more, code 401.

// So basically, if the code can make it all to the end of this code here, only then, next will be executed. And then, with next, we go to the next route handler, which effectively means to grant access to that protected route. Let's actually put that here. Grant access to protected route. Just one last thing that we want to do here is to actually then put the entire user data on the request. So we can simply say, req, so request, .user will be equal to the freshUser. And if it did not, well, then we make it to all the way to the end of the middleware function, where we then assign the currentUser to request.user so that we can then use it in a next middleware function. Okay? Because remember, this request object, this is the one that travels, basically, from middleware to middleware. And so, if we want to pass data from one middleware to the next one, then we can simply put some stuff on the request object, and then that data will be available at a later point.

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt && req.cookies.jwt !== 'loggedout') {
    token = req.cookies.jwt;
  }

  //   console.log(token);

  if (!token) return res.redirect('/');

  // 2) Validate token
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
  );

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exist', 401),
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401),
    );
  }

  // Grant access to protected route
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// Only for rendered pages, no errors
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      if (req.cookies.jwt === 'loggedout') return next();

      // 2) Validate token
      const decoded = await util.promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET,
      );

      // 3) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 4) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // There is a logged in user
      res.locals.user = currentUser;
    }
    next();
  } catch (err) {
    return next();
  }
});

// Authorization (User Roles and Permission) : However, sometimes, simply authenticating, so, logging a user in, is really not enough. And, so in this video, we're gonna implement authorization as well. So, imagine the act of deleting a tour from our database. So, not every user should, of course, be allowed to do that. Even if the user is logged in, right? So, we basically need to authorize only certain types of users, to perform certain actions. And so that's exactly what authorization is. It's verifying if a certain user has the rights to interact with a certain resource. So, again, with authorization we basically check if a certain user is allowed to access a certain resource, even if he is logged in. So not all logged in users will be able to perform the same actions in our API, all right? And this is a very common scenario that should be implemented in each and every web application usually, all right? So we're gonna build another middleware function here, this time to restrict certain routes.

// So the first middleware in the stack here, will always be the protect one. But then, after that one, we will also have the authController.restrict. So restrictTo, okay? And into this function we will then pass some user roles, which will be authorized to interact with this resource. In this case, with deleting a tour, okay? So let's set this one to admin. So, only to administrators. Okay, and so now we are dealing with user roles here. So just like admin. And right now, we don't have that in our user model. Anyway, the role here should be of the type String, and now I'm gonna use the enum validator in order to only allow certain types of roles here to be specified. And these are the general, so the normal users, so let's just call them user. Then, we have the tour guide, we have the lead tour guide, and we have the administrator. So, I'm just calling that admin, all right? And these user roles that we have here will of course be specific to the application's domain. So, for example, when you're running a community site, it's not gonna make much sense to have a guide and a lead guide. Instead you will probably have, like, moderators or contributors, or members.

// So, you will always have different names, depending on the type of application that you're writing. But in our case, this is what makes sense. Then, we also want to set a default here, so we actually don't have to specify always which type of user we're creating. And so user, the normal user, let's say, is the one that's gonna be created by default. So, I want the admin to be able to delete tours, but also delete a guide. All right? And so let's add that here as well. Okay? So the admin and the lead guide can now delete tours, but not the normal guides, and also not the normal users. All right? So this is how restrictTo is gonna work, let's now go ahead and implement it. So exports.restrictTo, and now, how are we actually going to implement this? Because usually, we cannot pass arguments into a middleware function, right? But in this case, we really want to. We want to pass in the roles, who are allowed to access the resource, right? So this case, the admin and the lead guide. So we need a way of basically passing in arguments into the middleware function in a way that usually does not work. So, how are we going to do that? Well, in here, we will actually create like a wrapper function, which will then return the middleware function that we actually want to create, okay? So, this is the restrictTo function, and in here we want to pass an arbitrary number of arguments. So, basically, of roles. And so we can use the rest parameter syntax, which is again new in ES6, and this will then create an array of all the arguments that were specified, okay? So we're creating this function, and right away we will then return a new function. And this is the middleware function itself. So, request, response, and next. Okay? Make sense? And so this function here will then basically get access to this role's parameter here, because there is a closure, okay?

// So, if not roles.includes, and okay, once more includes is a very nice array method that is in Java Script available on all arrays, okay? So, if this roles array does not include the role of the current user, then we do not give permission to that user. And where is the role of the current user stored? Well, let's remember the line of code that we actually put up here, right in the end where we grant access to the protected route, we store the current user in request.user. And remember how this protect middleware always runs before restrictTo, right? So, here, we first have protect, and then we have restrictTo. And so by the time this middleware function here runs, this one has already completed, and has put the current user on the request object. And so now, we can use that here. So request.user.role. So that's where the role is stored. So, simple. In this case, we create a new error. So just like before, and now we say you do not have permission to perform this action. And now a new status code, which is 403. And this one means forbidden, okay? So there really is a specific http status code just for this case, so for authorization basically, all right? And, well, otherwise, we simply call next.
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array ['admin', 'lead-guide']
    if (!roles.includes(req.user.role)) {
      return next(
        // 403 Forbidden
        new AppError("You don't have permission to perform this action", 403),
      );
    }

    next();
  };
};

// Password Reset Functionality (Reset Token) : We are going to implement a user-friendly password reset functionality, which is kind of standard in most web applications. And probably, you have used the password reset on some website before and usually, it works like this. You just have to provide your email address and you will then get an email with a link where you can click and then that's gonna take you to a page where you can put in a new password. This is a very standard procedure and so this is also how we're going to implement it here in this application. Basically there are two steps. For the first one is that the user sends a post request to a forgot password route, only with this email address. This will then create a reset token and sent that to the email address that was provided. Just a simple, random token, not a JSON Web Token. Then in the second part, which is gonna be the next video, the user then sends that token from his email along with a new password in order to update his password.

// Next up, let's then generate the random token and for that, once more, we're actually gonna create an instant method on the user. Because once more, this really has to do with the user data itself. The password reset token should basically be a random string but at the same time, it doesn't need to be as cryptographically strong as the password hash that we created before. We can just use the very simple, random bytes function from the built-in crypto module. Now, let's then actually generate our token. And for that, we use crypto dot random bytes and then here we need to specify the number of characters basically. And then we also in the end, convert it to a hexadecimal string. Now if you're wondering why we are actually creating this token, I guess I didn't really explain it just yet. Basically this token is what we're gonna send to the user and so it's like a reset password really that the user can then use to create a new real password. And of course, only the user will have access to this token. And so in fact, it really behaves kind of like a password. Since essentially it is just a password, it means that if a hacker can get access to our database, well then that's gonna allow the hacker to gain access to the account by setting a new password. If we would just simply store this reset token in our database now, then if some attacker gains access to the database, they could then use that token and create a new password using that token instead of you doing it. They would then effectively control your account instead of you doing it. Just like a password, we should never store a plain reset token in the database.

// Let's actually encrypt it, but such as before with the password, it doesn't need such a cryptographically strong encryption method. Because these reset tokens are a way less dangerous attack vector. Again, we're just gonna use the built-in crypto module. It works in this kind of weird-looking way. We say crypto then create hash with the sha 256 algorithm then we need to say update and then variable where the token is stored. Whatever string we want to encrypt basically. And then we need to say digest and then again store it as a hexadecimal. And now where are we actually gonna save this reset token? Well, we're gonna create a new field in our database schema. 'Cause of course, we want to save it in the database, so that we can then compare it with the token that the user provides. Password reset token, that's the string. And then also password reset expires. Because this reset will actually expire after a certain amount of time as a security measure. You will only have 10 minutes in order to actually reset your password. This dot password reset token is then equal to this encryption. Next up, let's then set password reset expires and let's set that to date dot now and then simply add a couple of seconds to that. We want it to work for 10 minutes and so that's 10 and then we need it in milliseconds. Times 60 for seconds and then times 1000 for milliseconds. And then I also want to return the plain text token because that's actually the one that we're gonna send through the email. Return reset token. We need to send via email the unencrypted reset token because otherwise it wouldn't make much sense to encrypt it at all. If the token that was in the database was the exact same that we could use to actually change the password, well then that wouldn't be any encryption at all. We sent one token via email and then we have the encrypted version in our database. And that encrypted one is then basically useless to change the password. It's just like when we're saving only the encrypted password itself to the database, just like we did up here, So where we encrypted the password using bcrypt. Keep in mind that we only ever save sensitive data in an encrypted form and then compare it with the encrypted version that's in the database.

// All right and so that is done, but actually what we did was just to modify the data in here. When we set this dot password expires for example to this value, we did in fact not really update the document. We did not save it. We really just modify it, but now we then need to save it. Let's say await user dot save. But watch what happens as we now use this. That happens because we're trying to save a document, but we do not specify all of the mandatory data, so the fields that we marked as required. Let's quickly fix that. All we need to do is to actually pass a special option into this user dot save method. We say validate before save set to false. This will then deactivate all the validaters that we specified in our schema.

// Sending mail : So let's go back to our middleware function here, and let's start by defining the reset URL. So, ideally, the user will then click on this email and will then be able to do the request from there. So let's quickly change our route implementation for this. So, it's here in userRoute, so it's not POST, it's PATCH, and we also want to specify a parameter. Okay, and let's build this now, starting with the protocol. So, HTTP or HTTPS, okay? And we're basically gonna get that data from our request. So that's stored on request dot protocol then colon slash slash, and then the host, okay? So we're basically preparing this one here to work both in development and in production. So, request dot get, and then host. All right, so this is how we get the host, and then slash api slash version one, and I guess it's not ideal to define a tier hardcoded like this. So, now, users, resetPassword, and then yet another slash, and finally the token. And as we discussed before, in the last lecture, here we actually gotta send the plain, original resetToken, and not the encrypted one. All right? We will then, in the next step, compare the original token with the encrypted one. So, again, just as we discussed in the last video. Give it a save here now, and so that is our reset URL. And now, based on this URL, let's quickly create the message here as well.

// So let's now, finally, send the email, and remember that sendEmail is an asynchronous function. And so, therefore, we need to await it here. Okay? Because, of course, it's gonna return a Promise. And remember now that the sendEmail function here takes an object with some options. So the email is user.email, right? Or we could also say, req.body.email. Then the subject that we want to say is, Your password reset token. Let's say right away that it's only valid for 10 minutes, so that the user knows that he has to hurry. Okay, and then finally, the message, as well. let's also send, of course, some response. And, of course, we can not send the reset token right here, by adjacent, right, because, then everyone could just reset anyone's password, and take over any account that they wanted. And so that's the whole reason why we send it to an email address, because we assume that the email is a safe place, that only the user has access to. We're almost done, but not entirely, because there might happen an error, using this sendEmail, okay, and so in that case, we, of course, want to send an error message to the client. But in this case, we actually need to do more than simply send an error message. We need to basically, set back the password reset token and the password reset expired that we defined, okay? And so right now it's not enough to simply catch the error and then send it down to our global error handling middleware. But instead we need to simply add a try-catch block right here. So, passwordResetToken, and set it to undefined, all right. And the same for passwordResetExpires. Okay. And then, of course, just like before, this only modifies the data, but doesn't really save it. Okay, and then just to finish, we, of course, then return with an error to the next middleware. There was an error sending the email. Try again later. And in this case, the error code can actually be a 500. So this is really then, like an error that's happened on the server, and so it has to be a fine code, and 500 is just, like, the standard one.

// If you would've read the docs, you'd understand that Document.prototype.save() by default runs the validators on all modified and required fields. But since we excluded password and passwordConfirm fields from the returned results by specifying select: false in our schema, we encountered a problem, as both of these fields are required: required: [true, 'Password is required'], but not present. As we never define those fields before calling .save(), the validation fails.On the contrary, when calling resetPassword, we explicitly set both the user.password & user.passwordConfirm  fields, so the validation passes. There are 2 simple solutions to our problem. We can either set validateBeforeSave: false and completely skip validation, or even better, we can use validateModifiedOnly: true, to only validate modified fields.

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError(`There's no user with that email address`, 404));
  }

  // 2) Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateModifiedOnly: true });

  //   const message = `Forgot your password? Submit a Patch request with your new password and passwordConfirm to : ${resetURL}.\n.If you didn't forget your password, please ignore this email!`;

  try {
    // 3) Send it to the user's email
    const resetURL = `${req.protocol}://${req.get(
      'host',
    )}/resetPassword/${resetToken}`;

    //  await sendEmail({
    //    email: user.email,
    //    subject: 'Your Password Reset Token (valid for only 10 min)',
    //    message,
    //  });

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      ),
    );
  }
});

// Reset Password Functionality : So, first off, get user based on the token. Then as the second step, we will set the new password but only if token has not expired, and there is a user. So in that case, set the new password. Then after that, we need to update the changedPasswordAt property for the current user, and then finally, as is usual in this functionality, is to log the user in. Basically, send the JSON Web Token to the client.  And so, remember from the last video, that the reset token that is actually sent in the URL is this non-encrypted token here. So, actually this one. But the one that we have in the database is the encrypted one. So we talked about that before, and so what we now need to do, is to basically encrypt the original token again, so we can then compare it with the one that is stored, so the encrypted one in the database. So, we actually did something similar before with the password, but with the password, we couldn't compare it as easily as we can with this one, again because for the password we used the quite complex bcrypt algorithm, which in this case, we didn't. Now this is basically the same as we had before, where we encrypted the original one, and so we could refactor this into its own function. So, now let's actually get the user based on this token. Because that is actually, the only thing that we know about the user right now. We have no email, we have nothing, so this token is the only thing that can identify the user. And so we can now, basically, query the database for this token. And it will then find the user which has this token. So, await, as we already know, and then User.findOne. So, that property is called passwordResetToken and we are looking for the hashedToken. So, this will find user who has the token that will send via URL.

// But, right now, we're not taking the token expiration date into consideration. And so how could we do that? Well, basically, what we want is to check if the passwordResetExpires property is greater than right now. Because if the expires date is greater than now, it means it's in the future, which in turn means, that it hasn't yet expired. And so, that's a very easy way in which we can actually do this right with this query. So, passwordResetExpires, which is where that date is stored, and now all we need to check if it is actually greater than right now. And so we know how to do that already with MongoDB, right? So, new object and then the greater operator and then what we want to compare it with is Date.now, and this will actually be a timestamp of right now, but behind the scenes, MongoDB will then convert everything to the same, and therefore be able to compare them accurately. So, next up we want to, of course, send an error if there is no user, or basically, if the token has expired. But that's, in this case, the same, because if the token has expired, well then it will simply not return any user. So new AppError, and let's say Token is invalid or has expired. And then 400, so bad request. So, we already got the user and now it's very simple: user.password is equal to req.body.password. And that's because we will of course, send the password and also passwordConfirm via the body. So let's duplicate that and passwordConfirm as well. And then also, let's basically delete the reset token and the expired.All right. And again, of course, we now need to save it, because this only modifies the document, it doesn't really update. So it doesn't really save it. So, await user.save. And in this case, we actually don't have to turn off the validators, because indeed we want to validate. For example, we want the validator to confirm if the password is equal to passwordConfirm. And so that validator automatically does all that work for us. Then the third step, what we're gonna do actually in the end, and so what we're gonna do next is to basically logs the user in. So in other words, send the JSON Web Token. And remember, actually, that this is the whole reason why we need to use save and not update.

// So before, for updating tours, we used to use findOneAndUpdate, but now, for everything related to passwords and to the user, we always use save, because we always want to run all the validators, and above all, the save middleware functions. So, for example, the ones where the passwords are encrypted. Now all we need to do actually, is this missing step here, which is to update the passwordAt property for this current user. But that shouldn't be all too hard, and so let's quickly go back to the userModel, which is where we are gonna do that using middleware. So, userSchema.pre and again dot save, and then a function with next. Again, this function here is gonna run right before a new document is actually saved. And so, it's the perfect place for actually specifying this property. And I could, of course, have done it in a controller right next to here to this code, for example. But I really want this to happen, kind of, automatically. So, kind of behind the scenes. Because later on, we will have another place where we update the password and then we would make sure that we're including the same code there. And like this, again, it happens, kind of, behind the scenes, without us having to worry about it at all. Now, when exactly do we actually want to set the passwordChangedAt property to right now? Well we only want it when we actually modified the password property. So if we have not modified, so if not this.isModified, so just like this, and then the name of the property, so password. So in that case, return right away and run the next middleware. So again, if we didn't modify the password property, well then of course, do not manipulate the passwordChangedAt. But what about creating new document? Well, when we create a new document, then we did actually modify the password, and then we would set the passwordChangedAt property, right? Well, in the current implementation we actually would. But there is something else that we can use here. So, basically, we want to exit this middleware function right away, if the password has not been modified or if the document is new, and so we can use the isNew property. Anyway, if the code passes this verification here, well, then let's very simply say, this.passwordChangedAt = Date.now. And then, we call next.

// Now, in theory, this should work just fine, but actually, in practice, sometimes a small problem happens. And that problem is that sometimes saving to the database is a bit slower than issuing the JSON Web Token, making it so that the changed password timestamp is sometimes set a bit after the JSON Web Token has been created. And so that will then make it so that the user will not be able to log in using the new token. Because, remember, the whole reason this timestamp here actually exists, is so that we can compare it with the timestamp on the JSON Web Token, right? And so, we just need to fix that by subtracting one second. So, basically, a thousand milliseconds. And so that then will put the passwordChangedAt one second in the past, okay, which will then of course, not be 100% accurate, but that's not a problem at all, because one second here doesn't make any difference at all. It's a small hack, but again, it's no problem. So putting this passwordChanged one second in the past, will then ensure that the token is always created after the password has been changed.

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // 2) If token has not expired, and there is user, set the new password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user

  // 4) Log the user in, send JWT
  createSendToken(user, 200, req, res);
  // const token = signToken(user._id);

  // res.status(200).json({
  //   status: 'success',
  //   token,
  // });
});

// Update Current (Logged In) User Password: So, over the last few videos, we allowed a user to reset his password and then create a new one, but now we also want to allow a logged-in user to simply update his password without having to forget it, and so without that whole reset process. Now remember that this password updating functionality is only for logged-in users, but still we need the user to pass in his current password, so in order to confirm that user actually is who he says he is. So, just as a security measure because imagine that someone would find your computer open and then be able to change passwords on the sites that you have currently open without being prompted for a password again. And so that would basically log you out of all your existing applications, which would, of course, be a terrible experience. And so, as a security measure, we always need to ask for the current password before updating it, all right. So, as always, we create a new user variable, and in there we await the result of doing User.findById, and now where is this ID actually coming from? Well, remember again that this update password is only for authenticated, so for logged in users, and so therefore, at this point, we will already have the current user on our request object. Okay, so that's coming from the protect Middleware. So, req.user.id, and then remember that we need to explicitly ask for the password, okay? Because it is, by default, not included in the output. So, we defined that on the schema, remember? And, we actually need that password because now we want to compare it with the one that's stored in the database, and for that, just like before, we're gonna use this instance object that we have somewhere here. Yeah, so correctPassword, which is available on all the user documents, so it takes in the candidate password first, and then the actual user password, all right. So, if not user.correctPassword, and then the candidate password remember, and so that one is gonna be in a body, in a property that we're gonna call the passwordConfirm.

// Okay, and then as a second argument the actual password, so that's a user.password. And then, remember that this is an asynchronous function, and so we need to also await it here. Good, so in case that the password is not correct, just like always, we create a new error here. Now, if we make it to this point in code, so basically if the password is also correct, well then we can actually update the password, and how do we do that? Well, very simple, we did that before.All we say is user.password is equal to req.body.password, and then the same, of course, for the password confirm. Okay, and the validation will be done automatically by the validator that we specified on the schema, and that will be done once we actually save it. So, we await user.save, and so this time we do not turn off the validation because, of course, we want the validation to happen, so just as I said before, we want to check that the password confirm is actually the same as the password, right? Good. And, now just to really make sure that you understand why we didn't do something like user.findByIdAndUpdate. So, why didn't we do it like this? And, I know that I talked about this many times before, but I want you to understand one hundred percent why we cannot use this update, and it is for two reasons, so let me go back again to our model. So, the first one is that this validation here is not going to work, okay? And that's basically because this.password is not defined when we update, so when we use find by ID and update, because internally, behind the scenes, Mongoose does not really keep the current object in memory, and so therefore, this here is not going to work. And, as I said, I already talked about that before, so it's actually written out here as well, okay? But, it's really important to keep in mind not to use update for anything related to passwords, all right? So, this one is not going to work, and also, these two pre-saved Middlewares are also not going to work. So, if we used simply update for updating the password, then that password would not be encrypted, which is this first Middleware, and then also, the passwordChangedAt timestamp would also not be set, okay? So, none of this would work, and so again, we really need to do it like this.

// If you check the DOCS you will find out that Document.prototype.id is a getter, available on all mongoose documents by default and it returns a string version of document._id, which is of type ObjectId.So no, they are not the same. One is a string and the other is an object...
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if Posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so , update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Log user in and send JWT
  createSendToken(user, 200, req, res);
});
