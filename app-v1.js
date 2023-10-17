const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

// // It's kind of a convention to have all the Express configuration in app.js. I'm going to require of course, the Express package. We have Express imported, and now what we do is to create a variable called app. Again, that's kind of a standard. So app and assigned result of calling express. That's actually it. This here is a function which upon calling will add a bunch of methods to our app variable here. The first one that we're going to use is actually app.listen to basically start up a server. That is a bit similar to what we did before with the http package in the previous sections, right. So again, keep in mind that Express is 100% nodeJS under the hood, and some of the things work in a very similar way here in Express. All right, again, it simply makes our lives a bit easier by taking some of the complexity away from us.

// We paste in the port and a callback function. Again, this is the callback function that will be called as soon as the server starts listening. Now what we need to do next is to define route. And once more, we actually already kind of defined routes before in the nodefarm project, remember that, but it works very differently with Express. Remember that routing means basically to determine how an application responds to a certain client request, so to a certain URL. And actually, it's not just a URL but also the http method which is used for that request.

// How do we do that? Well, it's very simple in Express. All we do is app, then the http method that we want to respond to, and let's start with the simplest one which is get, and then the URL. We're just specifying the kind of root URL here. Again, the route is basically the URL, which in this case, is just this root URL and also the http method, which is get in this case. Now, what do we actually want to happen when someone hits that URL with a get request? Well, whatever we want to do, we need to specify it in a callback function, which we specify as the second argument. We have a callback function just like this, and this callback function can accept a couple of arguments. The most basic one, and the ones that we usually always need are get request, entity response. In that regard, it is again very similar to what we did before in the nodefarm project. Back then, when we started our server, we also had access to the request and to response object. Now, they are a little bit different here in Express. They have a lot more data and methods on them, but the idea is exactly the same.
const app = express();

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/',(req,res) => {
//     res.send('You can post to this endpoint...')
// })

// 1] Middleware : Now remember that with a post request, we can send data from the client to the server, right? This data is then ideally available on the request. The request object again is what holds all the data, all the information, about the request that was done. If that request contains some data that was sent, that data should be on the request, right? Now out of the box, Express does not put that body data on the request, and in order to have that data available, we have to use something called middleware. We are gonna talk in great detail about middleware in a couple of lectures, but for now, in order to make this work, we need to include a simple middleware here at the top of the file. So actually, right here. What we need to do, is to say app.use then express .json Okay, and that's it. So again, this [express.json] here is middleware. And middleware is basically a function that can modify the incoming request data. It's called middleware because it stands between, so in the middle of the request and the response. It's just a step that the request goes through while it's being processed. And the step the requests go through, in this example is simply that the data from the body is added to it. So it's added to the request object by using this middleware. We use app.use in order to use middleware like this. And again, we will talk a lot more about middleware a bit later in this section. For now, just know that this is how we use middleware.

// So this express dot json here calling this json method basically returns a function, okay? And so that function is then added to the middleware stack. And so, similar to that, we can create our own middleware function.

// 3rd party Middleware : A third-party middleware function from npm called Morgan in order to make our development life a bit easier. So, as I mentioned, we're gonna use a middleware called Morgan which is a very popular logging middleware. So, a middleware that's gonna allow us to see request data right in the console.Okay, now as I mentioned, this logging middleware is gonna make our development life a bit easier. But it still is code that we will actually include in our application and so, that's why it's not a development dependency but just a simple regular dependency.

// So, calling this morgan function will return a function similar to this one here [(req,res,next) => {}] and so, that makes sense because while this is how a middleware function has to look like. What I really wanted to show you is that this function actually returns another function which is the logger and you see that this function just has our own middleware functions has this very typical signature of request, response and next.

// So, we have the information about the request that we just did. So, we get the HTTP method, we get the URL, we get the status code, the time it took to send back the response and also the size of the response in bytes.
app.use(morgan('dev'));

app.use(express.json());

// Creating our own Middleware: In each middleware function, we have access to the request and the response, okay? But also, we have the next function. And so, just like this, we add  a third argument to this middleware function, okay? And like this, express then knows that we are actually defining a middleware here. What matters is that it's the third argument to this function. So express basically passes the next function as the third argument into this middleware function. And we can then call it whatever we want. But again, next is really the convention in express, and in order to avoid confusion.

// And now, just as we talked in the last video, we actually need to call the next function, okay? And if we didn't call next here, well, then the request/response cycle would really be stuck at this point. We wouldn't be able to move on, and we would never ever send back a response to the client. So I can't stress enough how important it is to never forget to use next in all of your middleware.

// And I wanted to quickly touch on what I just said before, which is that this middleware here applies to each and every single request, okay? And that's because we didn't specify any route. So, remember that before I said that all route handlers here are actually kind of middleware themselves. They are simply middleware functions that only apply for a certain URL. So a certain route, okay. But these more simple middleware functions that we define up here, well, they are going to apply to every single request. At least, if the route handler comes before this middleware.
app.use((req, res, next) => {
  console.log(`Hello from the middleware 👋`);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Refactoring Routes : So right now, we have all these routes here. So the http method plus the url together with the route handler, which is this callback function. And we have these routes and route handlers kind of all over the place. So we have this and then this and all after the other, but it's kind of difficult to see what route we actually have in our code. So all the routes should kind of be together, and then the handler functions also together. So separate from these routes here.

// 2] Route Handlers ( Controllers )

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  // console.log(req.params);

  const id = req.params.id * 1; //convert from string to number
  const tour = tours.find((el) => el.id === id);

  // if (id >= tours.length || id < 0 || isNaN(id)) {
  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  // Object Assign:  So we can use object.assign, which basically allows us to create a new object by merging two existing objects together.
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  // Object Conversion:  Here I just noticed that we need to also stringify this object, right? We want json in this JSON file, and this right now is just a plain, normal JavaScript object and so we need to convert that. But that's again simple, already did that. JSON.stringify of the object.
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // New Resource creation : So 201 which means created. 200 stands for okay, 201 stands for created, which is exactly what happened here. We created a new resource on a server.
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }

  const updatedTour = { ...tour, ...req.body };
  const updatedTours = tours.map((tour) =>
    tour.id === updatedTour.id ? updatedTour : tour
  );

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour,
        },
      });
    }
  );
};

const deleteTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }

  const updatedTours = tours.filter((t) => t.id !== tour.id);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

const getAllUsers = (req, res) => {
  // 500 status for internal server error
  res.status(501).json({
    status: 'error',
    message: 'This route has not defined yet!',
  });
};

const createUser = (req, res) => {
  // 500 status for internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route has not defined yet!',
  });
};

const getUser = (req, res) => {
  // 500 status for internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route has not defined yet!',
  });
};

const updateUser = (req, res) => {
  // 500 status for internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route has not defined yet!',
  });
};
const deleteUser = (req, res) => {
  // 500 status for internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route has not defined yet!',
  });
};

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

// 3] ROUTES
// Refactoring Routes : Because, let's say, that we want to, for example, change the version or the resource name. We would then have to change it in all of these five places, and that is not ideal. And so instead of having all of this, we can do something better. and write app dot route, so that's a new one. And so here we specify the route that we want. And then, on there is where we specify what we want to happen on get. Now, the thing is, that here we can now actually chain the post method. And then we can say createTour just like this. And so just like this, we have now actually created an even better way of writing a route because right now, this is not repeated for the get and the post.

// The two route handlers that we use on this kind of route here. So without the id, is only for get and for post. So for getting all tours, and for creating a new tour.
// TOURS Resource

// Creating multiple routers : We can say that all our routes, so these four routes here, we can say that they're all kind of on a same router, okay? And the router, is this app object. But if we want to separate these routes into different files, so again, one file for these two routes and one file for these two routes, then the best thing to do, is to create one router for each of the resources.

// We create a new router and save it into this variable. So here we use it instead of app. Now, how do we actually connect this new router with our application? Well, we'll use it as middleware, alright? And so that is because, this new modular tourRouter here, is actually a real middleware, alright? And so we can say, app.use, and then the route . So we can use, the tourRouter on our application and where do we want to use the tourRouter? Well, we want to use it on, /api/version-one/tours, okay.

// So again, this tourRouter here, is a real middleware. And we want to use that middleware for this specific route. Okay, and so we use app.use and specify the middleware function, which is this router, then we specify the the route so the URL, for which, we actually want to use that middleware, okay. And so just like this, we created basically a sub application.
const tourRouter = express.Router();

// So here, we only want the root, and in here, we only want the id, okay? Now, why is that? Well, it's because this tourRouter middleware, only runs on this route here anyway, okay? And so once we are in the router, then we already are at this route. So at our tourRoute, and so this first route that we had to before, we only want to run it as, api/version-one/tours and so that is what this route here now means, okay? So it's basically the root of this URL, okay.

// So let's say that we have an incoming request now for /api/version-one/tours/version id. So the request goes into the middleware stack and when it hits this line of code here, it will match this URL here, right? So it will match this route and therefore or tourRouter middleware function will run. So our tourRouter is this sub application that we created, which in turn has its own routes, okay? And if the request was for /id, well, then it will inside our mini app, hit this route here, right? And finally, of course, it will run one of these handlers here, depending on the method that was used. So I hope that made sense.
tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// USERS Resource
const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

// And by the way, this is called mounting the router, okay? So mounting a new router on a route, basically, okay . And actually, mounting the routers, has to come after all of these definitions or at least after we declared a variable, right? So we cannot use the routers before we actually declare them.
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4] SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
