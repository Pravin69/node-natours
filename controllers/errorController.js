const AppError = require('../utils/appError');

// Error in Development vs Error in Production : So let's quickly recap what we just did here. We're distinguishing between errors in development and in production. When we're in development, we send the error using this function here, which will then send as many details as possible to the client, so that we really get all the information in order to get rid of the bug. If it's a programming error, or if it's an operational error, then we still really want to see anything that's going on. When we're in production, which is arguably the most important part of our application, then we distinguish between operational errors, so errors that we know and trust, and to other errors, that might be kind of unexpected. If the error is operational, so for example the user tried to access a route that doesn't exist, or tried to input invalid data, all of these are operational errors. Then we can send appropriate error messages, for the client to know what went wrong. On the other hand, we have these unknown errors, or unexpected errors, and in that case, we very simply say, something went wrong. Then log the error also to our console, so that we know that it happened and can then fix it. Now in order for this to work, there is something really, really important that we need to do. Right now there are errors that are, for example, coming from MongoDB, which we do not mark as operational. In this case, they would right now simply be handled using this generic error message here. For example, a validation error. Right now, that's an error that's coming from MongoDB and not from our own app error class. We do not create these errors by ourselves. Again, they are right now not marked as operational, but we of course need to mark them as operational so that we can then send the appropriate error message back to the client. In the example that I was just mentioning, that the input data is invalid. There are two or three other errors that we need to mark as operational ourselves.

const sendErrorDev = (err, req, res) => {
  // 1) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // 2) RENDERED WEBSITE
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // 1) API
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic error
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
  // 2) RENDERED WEBSITE
  // A)  Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }

  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err);

  // 2) Send generic error
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later!',
  });
};

// Handling Invlaid Database Id: So as I mentioned in the last video there are three types of errors that might be created by Mongoose in which we need to mark as operational errors so that we can send back meaningful error messages to clients in production. So the first one is when we try an invalid ID here, so simply something like this, and so Mongoose will not be able to convert this into a MongoDB ID, remember that. And so this is the error that we get right now. And so this is the error that we get right now, and actually, here you can see all the kind of stuff that we defined we wanted to see in productions. So the entire error object, then the error message, and also the complete stack, okay? And so this is a perfect example of an operational error. So this is something that might very well happen, and so we need to send back a meaningful response in order to handle this error.

// Okay, so the goal here again will be to basically mark this error as operational, and create a meaningful message, alright? So, let's Create a New Tour, and what I'm gonna do is to create a duplicate name. So, let's just copy this one here. And I think all the values here are correct, so let's try this now. And indeed, here we get the error that we already know, which is duplicate key error because we already have a tour, or a document with the name of Forest Hiker, okay? So again, this is an error that is going to happen at some point, and again, it doesn't have a very meaningful error message, right? And so again, we need to change that. Then the third one is also kind of about validation, and so let's do that here in Update Tour. So, let's say that we want to have a ratingsAverage of six, which we know is invalid, right? Because we said that the max of ratingsAverage could be five. So let's see, and indeed, we get this ValidationError, right? So it's called a ValidationError, and it has this errors object with all the errors. So these are the three errors that we're gonna mark as operational, starting with this first one, so basically, the CastError type, okay?

// Well then we're gonna call a special function that we're gonna create in a second, which is called handleCastError. We're gonna pass the error that Mongoose created into this function, so just like this, and this will then return a new error created with our AppError class, okay? And that error will then be marked as operational, because remember, all our AppErrors have the is operational properties set to true automatically, right? So this will return an error,
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// Handling Duplicate Database Fields : Let's now handle the error that occurs when we try to create duplicate fields for fields that are actually supposed to be unique. And so, remember, that this is the type of error that we get. So, we tried to create a new tour with a name that already exists and the name fields is supposed to be unique and so we get this error. Now this error here doesn't have a name property, okay? And that's because, as I mentioned before, it is actually not an error that is caused by a Mongoose. But instead, really, by the underlying MongoDB driver, okay? And so, what we're gonna do to identify this error is use this 11,000 code here.
const handleDuplicateFieldsDB = (err) => {
  // const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  // const value = err.keyValue.name;
  // const message = `Duplicate field value: ${value}. Please use another value`;

  const key = { ...Object.keys(err.keyValue) };
  const value = { ...Object.values(err.keyValue) };
  const message = `Duplicate field with field '${key[0]}' : '${value[0]}'. Use another ${key[0]} }`;
  return new AppError(message, 400);
};

// Handling Validation Error : Finally, let's now handle Mongoose's validation errors. So remember how we tried to update a tour with some invalid data here, and then got this kind of error? So inside our error, we get an error properties. And that property itself is an object which has a lot of objects in there, and each of them is for one of the fields that has an error. So basically the one that we defined in our Mongoose schema. And so now we want to extract these three messages from here, and put them all into one string, all right? So if(error), and actually let's take a look. So here we have the error. We have the errors, all of them. And I need to scroll here. And yeah, so here's the name.

// So error.name is ValidationError, all right? And so this again, is an error created by Mongoose. Now in order to create one big string out of all the strings from all the errors, we basically have to loop over all of these objects, and then extract all the error messages into a new array. So the object that has all of the objects in there is errors, okay? So we have one error for name, one for difficulty, and one for ratingsAverage. And so we're gonna basically loop over this errors object. Okay? And in JavaScript, we use Object.values in order to basically loop over an object. So the elements of an object. And so we want the values of err.errors, all right? And now loop over them using a map. And then in each iteration, we are simply gonna return the error message, okay?

// The Object.values are these objects, okay? So this object, and this object, and the next one, okay? So these are the values. So errors, and now we simply join all of them together into one string using period and then space, okay?
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again', 401);

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    // Now it's not a good practice at all to override the arguments of a function, okay? So error comes from this middle err function, right? So, from here, and so instead of doing that, I will actually create a hard copy of that error object, okay?
    let error = Object.create(err);

    if (error.name === 'CastError') error = handleCastErrorDB(error);

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    if (error.name === 'JsonWebTokenError') error = handleJWTError();

    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
