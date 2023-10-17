const multer = require('multer');
const sharp = require('sharp');
const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// Uploading and Processing Multiple Images: So now that the user photo upload feature is completed, let's now learn how to upload multiple files at the same time and also how to process multiple images at the same time and so we should take a look at our tour model here. And so here we have the image cover and that is actually only one image and then also we have the image field which is going to be an array of images. And typically these should be at least three images because that is the amount of images that we have in the tour detail page. So again, we're going to have image cover and images as an array. All right. Now the way we're going to upload and process these images is going to be very similar to what we did with the users. And so just like before we will store the images in memory, all right, and also we only allow images to pass our filter. So in other words we only want to be able to upload images. All right. Then here we create or upload in the exact same way as before, and so now lets actually create the middleware out of this upload. All right. So export dot upload tour, images, then upload. And now here comes the different part, so something that's going to be different to what we did here in the users controller because we had upload dot single. Okay. And so that was because we only had one single field with a file that we wanted to upload and so that here is the name of that field. Right?

// But now we actually have multiple files and in one of them we have one image and in the other one we have three images. So, how can we do that? Well, we're going to use upload dot fields, and so multer is actually perfectly capable of handling this kind of situations. So here we pass in an array and each of the elements is an object where we then specify the field name. And so the first one, remember, is image cover, and then we say that the max count is one. And so that means that we can only have one field called image cover, which is then going to be processed. All right, and then let's do the same for our images, so that is the other field in our database and so here we call it images as well and here lets say that the max count is three. And in case that we didn't have the image cover and if that only had one field which accepts multiple images or multiple files at the same time, we could have done it like this. So we would then use upload dot array, okay? And then the name of the field, and then basically the max count here as a number like this. So when there's one only, then it's upload dot single, let's say image, when there is multiple with the same name, then it's upload dot array and when there's basically a mix of them, then it is upload dot fields. lets actually create our next middleware here, which is going to be the one to process these images. So export dot resize tour images, so request, response, and next, and now lets here log them to the console. All right, and in case we have multiple files it is actually on request dot files, and not just file. All right? So this here basically will produce request dot file while the fields and the array will both produce request dot files, so the plural.

const multerSrorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerSrorage,
  fileFilter: multerFilter,
});

exports.uploadTourImages = upload.fields([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 3,
  },
]);

// Processing Images : So just to quickly recap what we did in these two lectures. So we created a multer upload using the memory storage and this filter only for images. Then we created the upload tour image middleware by using upload.fields, which takes in one image cover and three images, and then on the request it will put the files property like this, all right? Then in our next middleware we resize these images, and first the cover image, and then the remaining three images. And what's really important to note here is how we put the image filenames on request.body. And we do that so that in the next middleware, which is the actual route handler, it will then put that data onto the new document when it updates it, okay? So we do that with the image cover, and we also do that with the remaining images by pushing it into body.images, which as we know from our tour schema, expects an array of strings. And so in this case, filenames. So about these other images, we had them on request.files.images, so it's an array, and so of course we loop through it using map. And we use map so that we can basically save the three promises which are the result of these three async functions here, so we can then await all of them here using Promise.all, okay? And only after that we then move on to the actual tour update handler, okay? And this part is really important, so it's important that we only move on to the next middleware as soon as this part here is really completed. Because otherwise, request.body.images will be empty, and of course our filenames are then not gonna be saved to the current tour document, all right? And that actually wraps up the image or file uploading part of this section. So I hope that was fun, I know that for me it was really cool.
exports.resizeTourImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();

  //   1) Cover Image

  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;

  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/tours/${req.body.imageCover}`);

  //  2) Images
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${filename}`);

      req.body.images.push(filename);
    }),
  );

  next();
});

// upload.single(image) req.file
// upload.array('images',3) req.files

// 2] Route Handlers ( Controllers )

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

  next();
};

// exports.getAllTours = catchAsync(async (req, res, next) => {
//   // Reading documents with moongose:
//   const features = new APIFeatures(Tour, req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();
//   const tours = await features.query;

//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// });

exports.getAllTours = factory.getAll(Tour);

// exports.getTour = catchAsync(async (req, res, next) => {
//   // let tour = null;

//   // if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//   //   // Yes, it's a valid ObjectId, proceed with `findById` call.
//   // }

//   const tour = await Tour.findById(req.params.id).populate('reviews');

//   // Adding 404 Error : When sending a request to /customers/41224d776a326fb40f000001 and a document with _id 41224d776a326fb40f000001 does not exist, doc is null and I'm returning a 404 . However, when _id does not match what Mongoose expects as "format" a strange error is returned: CastError: Cast to ObjectId failed for value "foo" at path "_id".
//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });

exports.getTour = factory.getOne(Tour, { path: 'reviews' });

// exports.createTour = catchAsync(async (req, res, next) => {
//   // Rejected promise enters in catch block
//   const newTour = await Tour.create(req.body);

//   res.status(201).json({
//     status: 'success',
//     data: {
//       tour: newTour,
//     },
//   });
// });

exports.createTour = factory.createOne(Tour);

// exports.updateTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });

exports.updateTour = factory.updateOne(Tour);

exports.deleteTour = factory.deleteOne(Tour);

// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);

//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        // _id: '$ratingsAverage',
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    // So we want the id and now a new operator that we didn't use yet. We want it to be not equal to, and let's say easy. And so, just like this we're gonna select all the documents that are not easy.
    //   $match: { _id: { $ne: 'EASY' } },
    // },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});

// GeoSpatial Queries (Finding Tours within Radius) : In this lecture, we're gonna learn about geospatial queries in order to implement a really cool feature, which is to provide a search functionality for tours within a certain distance of a specified point. So let's say you live in a certain point and wanted to know which tours start at a certain distance from you, like 250 miles, because you don't want to drive further than that in order to start your tour experience. So that would be an awesome feature, and a really nice use case of geospatial queries. And in order to implement something like this, here in our tour router, we could create a nice route, something like this. So let's say router dot route, and I'm going to call this one tours within, okay? Then we also need to specify the distance. And so therefore we create a distance parameter here. Next, we also need to specify the center, and that's basically the point where you live. So let's specify it around center and then slash, and then lat and longitude. So basically into this variable here, you want to pass in the coordinates of the place where you are. Then, let's also provide the option of specifying the unit. So if this distance here is in kilometers or in miles. Now this way of specifying a URL is something that we never did before.

// So basically saying here center and slash and putting the longitude and latitude after that, and then slash unit, and then after that the queries parameter. And of course we could also make it so that user should specify all of these options using a query string, but this way it looks way cleaner and it's also kind of a standard way of specifying URL's which contain a lot of objects. we need a route handler, and that's gonna be at tour controller, and let's call this handler function get tours within. All right, so let's use a simple restructuring to get all our data at once from the parameters. Next up, let's actually get all coordinates from this latitude longitude variable here. Okay, next up, I want to test if we actually have the longitude and latitude variables to find. Because if not, then it means the user didn't specify them in the required format. So let's say if there is no latitude, or no longitude, then we want to create a new error. Now a geospatial query actually works quite similar to a regular query. So we're still going to write tours is equal to tour.find, and of course, awaiting the result of this promise. Okay, and all we need to do is to specify or filter object here. So remember that we want to basically query for start location, because the start location field is what holds the geospatial point where each tour starts. And so that's exactly what we're searching for.

// So, start location, and now we need to specify the value that we're searching for. And for that, we will now use a geospatial operator called geo within. As always, we need to specify the object, and then here, where we would earlier use like some math operator like greater than, this time we use a geospatial operator like this one. Geo within, and this operator does exactly what it says. Basically it finds documents within a certain geometry. And that geometry is what we need to define as a next step. So we want to find documents, but where do we actually want to find these documents? Well we want to find them inside of a sphere that starts at this point that we defined, and which has a radius of the distance that we defined. So again with our example in Los Angeles, if you specify the distance of 250 miles, then that means you want to find all the tour documents within a sphere that has a radius of 250 miles. And so now we need to pass the information here into the geo within operator, okay? And we do that by defining a center sphere. So the center sphere operator takes an array of the coordinates and of the radius.

// And for that, we need yet another array, and then the longitude and the latitude. And that's right. You first need to always define the longitude and then the latitude, which is a bit counterintuitive because usually coordinate pairs are always specified with the latitude first, and the longitude first. I think I mentioned it before that in geoJson, it for some reason works like this. So that is the center of the sphere. Now we need to specify it's radius. Now here we actually do not pass in the distance, but instead it expects a radius in a special unit called radians. So let me put radius variable here, and then in a second we are going to define it. So again, the radius is basically the distance that we want to have as the radius, but converted to a special unit called radians. And in order to get the radians, we need to divide our distance by the radius of the earth. Okay, so now we actually need to take into consideration our units here, because of course the radius of the earth is different in miles then in kilometers and say that if the unit is equal to miles, well then the result here should be distance. So basically our original radius divided by 3963.2. Okay, so again, that is the radius of the Earth in miles. And so if it is kilometers, then it is the distance divided by 6,378.1 kilometers. Another very important thing is that we actually in order to be able to do just basic queries, we need to first attribute an index to the field where the geospatial data that we're searching for is stored. So in this case, we need to add an index to start location. So let's do that here in tour model. So down here, we need yet another index. Tour schema.index. Start location, but now we're actually not going to set it to one or minus one, because this time it is a different index that we need.

// So for geospatial data, this index needs to be a 2D sphere index if the data describes real points on the Earth like sphere. Or instead, we can also use a 2D index if we're using just fictional points on a simple two dimensional plane. Now in this case of course, we are talking about real points on the Earth's surface, so we're going to use a 2D sphere index here. Okay, and so we're basically telling that this start location here should be indexed to a 2D sphere. So an Earthlike sphere where all our data are located. Great, and with that, we should now actually be ready to test out our new route. So with this geospatial query that we just defined here, we basically found documents that are located within a certain distance of our starting point. But what if we actually wanted to know the exact distances of all the tours to that starting point? Well that's exactly what we're going to calculate in the next lecture.
exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide  latitude and longitude in the format lat,lng!!',
        400,
      ),
    );
  }

  // console.log(radius);

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      data: tours,
    },
  });
});

// GeoSpatial Aggregation (Calculating Distances) : Now in this lecture, let's use geospatial aggregation in order to calculate distances to all the tours from a certain point. So just like before let's actually start by defining the route so that we know which data we're going to be working with. So router.route; at this time I'm gonna call it simply distances, and then the data that we need is the latitude and the longitude of the point where the user currently is, and then let's also allow the user again to specify the unit. Then here, the route handler function. Now this time here, we do not need the distance parameter, as we had it right here, because we're not gonna be searching for a certain radius. We're really gonna calculate the distance from a certain point to all the tours that we have in our collection. Just like before in order to do calculations we always use the aggregation pipeline. And remember, that is called on the model itself. So Tour.aggregate. So then here, remember, we passed in an array with all the stages of the aggregation pipeline that we want to define. Now for geospatial aggregation, there's actually only one single stage, and that's called geoNear, so this one. Again, this is the only geospatial aggregation pipeline stage that actually exists. This one always needs to be the first one in the pipeline. So keep that in mind that geoNear always needs to be the first stage. Something else that's also very important to note about geoNear is that it requires that at least one of our fields contains a geospatial index. Our start location already has this 2dsphere geospatial index on it. Since we're using this startLocation in order to calculate the distances, well, that's then perfect.

// If there's only one field with a geospatial index then this geoNear stage here will automatically use that index in order to perform the calculation. But if you have multiple fields with geospatial indexes then you need to use the keys parameter in order to define the field that you want to use for calculations. So keep that in mind, but again, in this case we only have one field, and so automatically that startLocation field is going to be used for doing these calculations. So, what do we need to pass into geoNear? Well, first we need to specify the near property, and near is the point from which to calculate the distances. So all the distances will be calculated from this point that we define here, and then all the start locations. So this near point here is of course the point that we pass into this function with this latitude and longitude. Now we need to specify this point here as geojson, so that's just like we did it before, where we need to specify the type as Point, and then specify the coordinates property. And as always the first coordinate here is the longitude, and then the second one, the latitude. And let's multiply both of them by one, simply to convert it to numbers. So this is the first mandatory field, near, and the second one is the distance field property. So, distanceField, and so this is the name of the field that will be created and where all the calculated distances will be stored. Actually, that's it. That's all the fields that are mandatory in this geoNear stage. And of course, we can add other stages here. Remember how we said that geoNear always needs to be the first stage in a pipeline, but if you now take a look at the code you might think that actually our geoNear stage is currently the first stage of our pipeline. Because right here, it actually looks like it is, right? There's nothing before this, and so why do we get this error that geoNear is not the first stage in the pipeline? That's here in the tour model, and if we go down here, I think.

// Right here, we have this aggregation middleware, and remember that what this did is to actually always add this match stage here before all the other stages, and actually we have this console.log here and so indeed you can actually see the entire pipeline down here. And so you see that we first have the match, and then the geoNear phase here, actually only as the second stage. So it actually makes sense that we get that error. Now we get our tours, and now it should have that distance field on them. It is this big number, because actually it's calculated in meters, so this result comes in meters, so let's first of all convert this one to kilometers. Later on we will then also convert it to miles. With that we get rid of all the other data, and now let's basically divide the distance by 1000 in order to convert these meters to kilometers. Actually, it's very easy to do that, because in a geoNear stage we can actually specify the distance multiplier property. So distanceMultiplier, and so here we can specify a number which is then going to be multiplied with all the distances.
exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide  latitude and longitude in the format lat,lng!!',
        400,
      ),
    );
  }

  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
});
