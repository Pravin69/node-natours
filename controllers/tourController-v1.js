const fs = require('fs');
const Tour = require("../models/tourModel")

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

// Param Middleware : But we can actually use it for a very practical use case here. So let's go to our handler functions here and you see that in all of the handler functions that actually use the id, we check if the id is valid  and as you already know, it is not a good practice to repeat code and so what we can do here is to use the concept of param middleware; and perform this check here in an outside middleware that it's gonna run before the request even hits these handler functions.

// So we no longer have the checkID code in the update handler that we just invoked basically, but still our ID is checked because we have that middleware, so this here. We have that middleware in the stack before it actually hits the update tourController. So this middleware is now part of our pipeline as you can imagine it, now you might argue that we might simply create a simple function which could also check for the ID and I call that function inside of each of these tour function, and then call it inside each of these relevant tour controllers; but that would really go against the philosophy of express, where we should always work with the middleware stack, so with this pipeline as much as we can, okay, and so these functions here, they do not have to worry at all about validation.
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  const tour = tours.find((el) => el.id === +val);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'failed',
      message: 'Missing name or price.',
    });
  }
  next();
};

// Refactoring Routes : So right now, we have all these routes here. So the http method plus the url together with the route handler, which is this callback function. And we have these routes and route handlers kind of all over the place. So we have this and then this and all after the other, but it's kind of difficult to see what route we actually have in our code. So all the routes should kind of be together, and then the handler functions also together. So separate from these routes here.

// 2] Route Handlers ( Controllers )

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  // console.log(req.params);

  const id = req.params.id * 1; //convert from string to number
  const tour = tours.find((el) => el.id === id);

  // if (id >= tours.length || id < 0 || isNaN(id)) {
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Invalid ID',
  //   });
  // }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  // Object Assign:  So we can use object.assign, which basically allows us to create a new object by merging two existing objects together.
  const newTour = {id: newId, ...req.body};

  tours.push(newTour);

  // Object Conversion:  Here I just noticed that we need to also stringify this object, right? We want json in this JSON file, and this right now is just a plain, normal JavaScript object and so we need to convert that. But that's again simple, already did that. JSON.stringify of the object.
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // New Resource creation : So 201 which means created. 200 stands for okay, 201 stands for created, which is exactly what happened here. We created a new resource on a server.
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};

exports.updateTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);

  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Invalid ID',
  //   });
  // }

  const updatedTour = { ...tour, ...req.body };
  const updatedTours = tours.map((tour) =>
    tour.id === updatedTour.id ? updatedTour : tour,
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
    },
  );
};

exports.deleteTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);

  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Invalid ID',
  //   });
  // }

  const updatedTours = tours.filter((t) => t.id !== tour.id);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    },
  );
};
