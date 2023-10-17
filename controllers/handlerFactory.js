const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

const nameModel = (Model) => Model.modelName.toLowerCase();

// Handler Factory Functions (Delete) : In this video, we're gonna be building a handler factory function in order to delete review documents, but also documents from all the other collections, all with one simple function. So, as I mentioned right at the beginning of this section, adding very similar handlers to all of our controllers will create a lot of duplicate code, right? Because all these update handlers, or all these delete handlers, or all these create handlers, they really all just look basically the same, right? Also, imagine that we wanted to change like some https status code or status message. Then we would have to go into each and every controller and then change all the handlers in there. And so, instead of manually writing all these handlers, why not simply create a factory function that's gonna return these handlers for us? So, a factory function is exactly that. It's a function that returns another function, and in this case our handler function. So, for deleting, for creating, for updating, and also for reading resources. So again the goal here is to basically create a function, which will then return a function that looks like this one here. But of course not only for the tour, but for every single model that we have in our application and that we might have in the future. So this function needs to be prepared for that, and so what that means is that inside the factory function, we will pass in the model, all right.

// So let's call this one deleteOne. And it's called like this, again, because this function is not only going to work to delete tours, but also to delete reviews and users and in the future some other documents that we might also have. So as I was saying in the beginning, we will pass the model into this function. So we pass the model and then we create a new function, and that function will right away then return our async function, so basically all of this or async handler function. Okay, and so now all we need to do is to actually change from the specific tool model to the more generic model. So this function will not really know if it is a tour, or if it is a review, or a user. And so we need to take the tour out of all of this, and that's actually it. So this basically the generalization of this specific function, which worked only for tours, and now this new one works for every model and so the new exports.deletes tour will be... factory.deleteOne and then pass in the model, which is tour. And that's it, that's all we need to do.

// So just to recap very quickly here, so we call this deleteOne function, then in there we pass the model, and so what's going to happen is that this function will then right away return this handler function that we had before. Simply the specific model, which before was the tour, is now going to be replaced with the one that we passed into the function. And by the way this works because of JavaScript closures, which is just a fancy way of saying that this inner function here will get access to the variables of the outer function even after the outer has already returned. So calling this function here will then return another function, which will then sit here and wait until it is finally called as soon as we hit the corresponding route.
// exports.deleteOne = (Model) =>
//   catchAsync(async (req, res, next) => {
//     const doc = await Model.findByIdAndDelete(req.params.id).exec();

//     if (!doc) {
//       return next(
//         new AppError(`No ${nameModel(Model)} found with that ID`, 404),
//       );
//     }

//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   });

exports.deleteOne = (Model, idField) =>
  catchAsync(async (req, res, next) => {
    const modelName = Model.modelName.toLowerCase();

    if (idField && req.user.role === 'user') {
      const doc = await Model.findOneAndDelete({
        _id: req.params.id,
        [idField]: req.user.id,
      });

      if (!doc)
        return next(new AppError(`Invalid ${modelName} ID / forbidden`, 403));

      res.status(204).json({
        status: 'success',
        data: null,
      });
      return;
    }

    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`No ${modelName} found with that ID`, 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

// exports.updateOne = (Model) =>
//   catchAsync(async (req, res, next) => {
//     const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     }).exec();

//     const modelName = nameModel(Model);

//     if (!doc) {
//       return next(new AppError(`No ${modelName} found with that ID`, 404));
//     }

//     res.status(200).json({
//       status: 'success',
//       data: {
//         [modelName]: doc,
//       },
//     });
//   });

exports.updateOne = (Model, idField) =>
  catchAsync(async (req, res, next) => {
    if (idField && req.user.role === 'user') {
      const doc = await Model.findOneAndUpdate(
        {
          _id: req.params.id,
          [idField]: req.user.id,
        },
        req.body,
        {
          returnDocument: 'after',
          runValidators: true,
        },
      );

      if (!doc)
        return next(
          new AppError(`Invalid ${nameModel(Model)} ID / forbidden`, 403),
        );

      res.status(200).json({
        status: 'success',
        data: {
          [`${nameModel(Model)}`]: doc,
        },
      });
      return;
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new AppError(`No ${nameModel(Model)} found with that ID`, 404),
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        [`${nameModel(Model)}`]: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // Rejected promise enters in catch block
    const doc = await Model.create(req.body);

    const modelName = nameModel(Model);

    res.status(201).json({
      status: 'success',
      data: {
        [modelName]: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    // let tour = null;

    // if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    //   // Yes, it's a valid ObjectId, proceed with `findById` call.
    // }

    let query = Model.findById(req.params.id);

    if (popOptions) {
      query = query.populate(popOptions);
    }

    const doc = await query;

    const modelName = nameModel(Model);

    // Adding 404 Error : When sending a request to /customers/41224d776a326fb40f000001 and a document with _id 41224d776a326fb40f000001 does not exist, doc is null and I'm returning a 404 . However, when _id does not match what Mongoose expects as "format" a strange error is returned: CastError: Cast to ObjectId failed for value "foo" at path "_id".
    if (!doc) {
      return next(new AppError(`No ${modelName}  found with that ID`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        [modelName]: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    // Reading documents with moongose:
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // const doc = await features.query.explain();
    const doc = await features.query;

    // const modelName = Model.modelName.toLowerCase();

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
