/* eslint-disable arrow-body-style */

// Catching Errors in Async Functions : We know that route handlers/middleware in Express need to take in a function and that function gets called with the (req, res, next) arguments and we want to make it async, so we can do:

// app.get('/myroute', async (req, res, next) => {
//   ...
// })
// So that works and I can do this for every route. However, now I'll have to handle each error inside of the async function using try/catch everywhere and I'll have to do that for every route. How can I clean this up? Well since async functions return Promises, I know I can add a .catch() block to it, but I need to be able to pass next to the catch block. The only way to do that is with closures:

// const myFunc = async (req, res, next) => {
//   ...
// })

// app.get('/myroute', (req, res, next) => {
//   myFunc(req, res, next).catch(next)
// })
// Now when an error occurs, our .catch() block will catch it and call next() with the error. The next problem is that I need to generalize this so I can pass in any function I want so we wrap it in yet another function:

// const catchAsync = fn => {
//   return (req, res, next) => {
//       fn(req, res, next).catch(next)
//   }
// }

// For now, let's really focus on our catchAsync here. So this function here that we passed into async, which is now called fn up here, is an asynchronous function. And remember that asynchronous functions return promises, right? And when there is an error inside of an async function, that basically means that the promise gets rejected. And so up here, where we actually call that function, we can then catch that error. So we catch it here, instead of catching it in the try catch block. So catch, and error, and then next, and pass the error. So this is all we want and we no longer need the try catch block, again, because that catch is now basically transferred to here, to this line. It's no longer a catch block, because in here it's just easier to use the promise that the fn function returns. So again, this fn function is this function, so the one that we passed into catchAsync, and so that is gonna return a promise.

// Now there are actually two big problems with the way that this is implemented right now and so this way, it wouldn't really work at all. So first one, this function call here has no way of knowing request, response, and next. We did not pass them into catchAsync here, and so really there's no way for the function to know the values of these parameters. And second is that right here we are actually calling the async function. So here we have catchAsync and we are then calling it using the parentheses of course. And then inside of catchAsync we are also then right away calling the fn function, and that's not how it is supposed to work. So createTour here should really be a function but not the result of calling a function. But that's right now what's happening. So right now catchAsync is being called, which then calls this function here, okay? And so again, this function should not called, but instead it should sit here and wait until express calls it. And express will of course call it as soon as someone hits the route that needs this control function. And so the solution to that is to basically make the catchAsync function return another function which is then gonna be assigned to createTour and so that function can then later be called when necessary. So let's do that here. So let's return an anonymous function and so remember that this is the function that express is then gonna call. And so here is where we then specify request, response, and next. And all right. And that's actually it. That's our catchAsync function.

// So in order to get rid our try catch blocks, we simply wrapped our asynchronous function inside of the catchAsync function that we just created. This function will then return a new anonymous function, which is this one here, which will then be assigned to createTour. And so basically it is this function here that will get called as soon as a new tour should be created using the createTour handler. And so that's why it has the exact same signature here as this async function, with request, response, and next. Now what this function here will then do is that it will call the function that we passed in initially, so this one here, and it will then execute all the code that is in there. Now since it's an async function here, it will return a promise and therefore, in case there is an error in this promise or in other words, in case it gets rejected, we can then catch the error that happened using the catch method that is available on all promises. And in the end, it is this catch method here which will pass the error into the next function which will then make it so that our error ends up in our global error handling middleware.

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
