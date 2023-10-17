const Tour = require('../models/tourModel');

// 2] Route Handlers ( Controllers )

exports.aliasTopTours = async (req, res, next) => {
  // Route aliasing : Another nice small feature that we can add to an API is to provide an alias route to a request that might be very popular, so it might be requested all the time. And, for example, we might want to provide a route specifically for the five best cheap tours. So, if we'd use our regular route here with the filters and with all the features that we already have, the request would look a little bit like this( ?limit=5&sort=-ratingsAverage,price&fields=name,price,ratingsAverage,summary,difficulty ). So, as soon as someone hits the top-5-cheap route, we will start. The first middleware that's gonna be run is aliasTopTours. So, the function that we just created. So, what this is gonna do is that it will set these properties of the query object to these values that we specified here. Basically prefilling parts of the query object before we then reach the getAllTours handler. And so, as soon as we then get to this function, the query object is already prefilled, even if the user didn't put any of these parameters in the query string. And so, in essence, what we're doing here is prefilling the query string for the user so that the user doesn't have to do it on his own.
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

  next();
};

exports.getAllTours = async (req, res) => {
  // Reading documents with moongose:
  try {
    // QueryString : And the query string looks a bit like this. And I'm sure you've seen it. So we start with a question mark, and then we can simply specify some field value pairs. So let's say we wanted to filter for a duration equal to five and at the same time, a difficulty of easy. So we can very simply build a query string like this. So again, it starts with this question mark, and then we can specify as many key value pairs using this format. Ex : 127.0.0.1:3000/api/v1/tours?duration=5&difficulty=easy

    // Anyway, we now need a way of accessing this data that's in a query string, in our Express application. But, luckily for us, that's very easy, because Express already took care of that. So that's just one of the many many things that Express does for us in order to really make NodeJS development a lot faster. So this data is on a request, which makes sense, and then it is in a field called query. So request dot query should then give us an object nicely formatted with the data from the query string.
    // console.log(req.query);

    // Filtering : Actually where filtering is gonna make sense is here on this get all tours route. Because, this is the one that, well as the name says, gets all the tours. And so here, we want to allow the user to filter the data, so that instead of getting all the data, he only gets the data that matches the filter. Anyway, let's now actually use that data in order to implement our filtering. But before we can do that, I need to tell you that in Mongoose, there are actually two ways of writing database queries. The first one is to just use filter object just like we did in the MongoDB introduction section. Right? Remember that? The second way is to use some special Mongoose methods.

    // Now, the problem with this implementation, is that its actually way too simple. That's because, later on, we will have other query parameters. For example, sort, for sorting functionality, or page, for pagination. We need to make sure that we are not querying for these in our database. For example, if we added here, page, equal to two, then we would, of course, not get any result. So what we will have to do is, to basically exclude these special field names from our query string before we actually do the filtering.

    // What we will do is, to first, create a shallow copy of the request dot query object. Let's call it query object. Here we need, really, a hard copy. We can't just do, request dot query, because then, if you would delete something from this object, we would also delete it from the req dot query object. And that's because in JavaScript, when we set a variable to another object, that new variable will basically just be a reference to that original object.

    // This find method here is going to return a query. All of this here will return a query. And that is the reason why we can then chain other methods like this. Like where, equals, and all these other methods that I talked to you about before. Here we have the query object, and again, when we use the find method, it will return an object which is a query. So in query dot prototype, we then have all of these methods. For example, down here we have where, which I just mentioned. We have sort which is the one that were gonna use later to sort. All of these are part of query dot prototype. Which, again, refers to objects that we're creating using the query class.

    // Now comes the important part. As soon as we actually await the result of the query, so as soon as we use await here or here, for example. As soon as we use this await, the query will then execute and come back with the documents that actually match our query. If we do it like this, such as we have here, then there is now way of, later, implementing sorting, or pagination, or all of these other features. Instead, what we will have to do, is to save this part here into a query, then in the end, as soon as we chain all the methods to the query that we need to, only then by the end, we can await that query.
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // console.log(req.query);

    // const tours = await Tour.find();
    // Method 1:
    // const query = Tour.find(queryObj);

    // Method 2:
    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // Advanced Filtering (includes operators):
    // We want req.query to be {difficulty: 'easy', duration: {$gte: 5}}

    // QueryString: 127.0.0.1:3000/api/v1/tours?duration[gte]=5&difficulty=easy || we specify operators in bracket in the queryString

    // What we get is {difficulty: 'easy', duration: {gte: 5}}

    // Well, what we see here is that the query object looks almost identical to the filter object that we wrote manually, the only difference is that in this one we have the MongoDB operator sign here. So that's really the only thing that's missing here in front of this operator name. Okay, and so the solution for this is to basically replace all the operators like this with their correspondent MongoDB operators, so basically adding this dollar sign here, okay.

    // And so the regular expression to find one of these four words goes like this; so we open up these parenthesis and then we write the operators, so gte or gt or lte or lt. And then we also need to add this \b before and after, and that's because we only want to match these exact words. And so this regular expression that I have here will take care of that, and actually there is one piece missing and that is this g flag here which means that it will actually happen multiple times. So if we have like two or three operators or even all of them, then it will replace all of them. And without this g here, it would only replace the first occurrence, so this one is very important. Now, what do we actually want to replace it with? Well, the replace method actually accepts a callback which is very powerful, and this callback has as the first argument, the matched word, or the matched string. So we can pass match into that callback function and what we return from this callback is the new string that will replace the old one, okay? So let's do a template string here, and so we want to replace the match with dollar sign match, okay, so this is here the part of the template string syntax. So this here is this match, and then we want to put the dollar sign in front of that.

    // In case someone finds this useful you can write the regular expression like this: /\b(gte?|lte?)\b/g ||| The ? sign means that the previous character, in this case the 'e' letter could or not exists.

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryStr = JSON.parse(queryStr);

    let query = Tour.find(queryStr);

    // Sorting:
    if (req.query.sort) {
      // ascending sort query string must be : ?sort=price
      // descending sort query string must be : ?sort=-price
      // If we sorted by first criteria and then the result for 2 or more are same like price : 500 is both then we can sort those by second criteria :
      // queryString: ?sort=price,ratingAverage and sort function must be sort(price ratingAverage) and replace the , with space
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt _id');
    }

    // Limiting Fields: So, basically, in order to allow clients to choose which fields they want to get back in the response. So, for a client, it's always ideal to receive as little data as possible, in order to reduce the bandwidth that is consumed with each request. And that's, of course, especially true when we have really data-heavy data sets, right? And so it's a very nice feature to allow the API user to only request some of the fields. So, as the third feature, we will have field limiting.

    // Mongodbs, actually requests a string with the field name separated by spaces, all right? And actually, this operation of selecting only certain field names is called projecting okay.

    // QueryString: ?fields=name,duration,difficulty,price
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      // We always have this underscore underscore V, which is set to zero, and Mongodbs just creates these fields because it uses them internally. And we could disable them, but that's not a good practice. Again, because Mongodbs actually uses them, alright, but what we can do is to basically never send them to the client, so we can exclude them. And the way we do that is to, instead of doing __v like before, so like we did up here, basically, we just prefix it with a minus, okay? And minus is then not including, but excluding. So what we had before here again, with the name and duration and price, that was to include these fields in the response. But this way, with the minus, we have everything except the V field here okay? So we're excluding only this field, alright.

      query = query.select('-__v');
    }

    // Pagination : So basically allowing the user to only select a certain page of our results, in case we have a lot of results. So let's pretend that we have, for example, 1000 documents in a certain collection. And we say that on each page we have 100 documents. So that would mean that we'd have 10 pages, right? So 10 times 100 is 1000. And so based on that, how are we gonna implement pagination using or query string? Well, we will use the page and limit fields. So there will be a page field. Let's say we want page two and there will be a limit field. And this limit here basically means the amount of results that we want per page. And that's actually setted here only to 10 and of course we have to correct this one here. It's not a comma, but an and. So page two and the limit 10. Now going back to the example of 1000 results, if the limit is 10, so only 10 results per page, well then we're gonna have 100 pages and in here we are then displaying page number 2 of these 100 pages. Okay?

    // ?page=2&limit=10, 1-10 -> page 1, 11-20 -> page 2 , ...
    // And now what kind of methods do we have in order to implement pagination? Well, the most useful one is skip and I'm gonna explain what it does in a second, so let's just put a random number here. So skip and limit, and let's put 10. and so this limit here is actually exactly the same as the limit that we defined in the query string. So basically the amount of results that we want in the query. And then skip, that we have here, is the amount of results that should be skipped before actually querying data. All right, so again, this is just a placeholder here.So let's say that the user wants page number two with 10 results per page. That means that results 1 to 10 are on page one, and 11 to 20 are on page 2. Okay, and so what that means is that we want to skip 10 results before we actually start querying. Okay. So again, 1 to 10 are for page one and then 11 to 20 are for page two. So 21 to 30 will be page three, And so on and so forth. And so we need to skip 10 results in order to get to result number 11, right? So to result number 11 which will the first one on page two. Okay, and since it is page two that was requested, well, again we need to skip 10 results before we actually start page two. Okay? Make sense?
    // query = query.skip(10).limit(10);

    // query = query.sort('-createdAt _id');   According to documentation at Mongo when using $skip with $sort it is advised to include _id or another unique identifier as any duplicates can cause errors (as we have seen).

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exists');
    }

    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    // So we specified this filter object here, and then the property that we're searching for, and then the value that we want to search for. So exactly the same again, as we did in the last section. And this findOne method here will then only return one of the documents.  Now this findById, as I mentioned before, is simply a shorthand for having to write this. So behind the scenes, it's gonna do exactly this. But Mongoose simply wants to make our life easier. And therefore, gives us access to an easier method called findById, which simply expects the ID that we're looking for.
    // Tour.findOne({_id: req.params.id})
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  // Efficient way of creating Documents :
  // Old Method : Now remember how we used to create documents a couple of lectures ago. So we did it like this. For example let's say newTour then equal to newTour and then the data in there. So we did it like this and then that's a new tour. And then we type newTour.save and that works kinda fine. But we can do it in an even easier way.
  // const newTour = new Tour({});
  // newTour.save();

  // New method: So instead of doing this we can do Tour.create and then paste the data in there. Okay and that will do the exact same thing. The main difference is that in this version here we basically call the method directly on the tour while in this first version we called the method on the new document. Okay, and so that is completely different. So again we had the tour that we created from the model. And then on that tour we used the save method. Because the document has access to this method and a lot of other methods as well. But here in the second situation we call this create method right on the model itself, okay? Now remember how this save method here returned a promise. And so this create here does return a promise as well. And so in order to get access to the file document as it was created in the database, we would then to have used .then
  // Tour.create({})

  // Now just one more time, just to make sure that everything is clear to you. Okay so we can use the tour model directly and call the create method on it. Then into that function we pass the data that we want to store in the database as a new tour. And that data comes from the post body, right? And so that's stored inside of request dot body. So this variable here. Now this method here will then return a promise. And we await that promise using async await and then store that result into the newTour variable which will be the newly created document already with the ID and everything, okay?
  try {
    // Rejected promise enters in catch block
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    // Update document by id: Something very similar, which is find by ID and update. So again, everything in one query. So, let's do tour.findByID and update. Okay, so, what do we need to pass in here? Well, of course, the ID, so that we can first find the document that is to be updated. So, just like before, that is req.params.ID, and then the data that we actually want to change. And that data will be in the body, just like in the post request. So req.body, okay? And then, actually as a third argument, we can also patch in some options, and we will do that. And the first option that I want to specify is new and set it to true. Because this way, then the new updated document is the one that will be returned. And since we want to send back that updated document to the client, we always want this method to actually return that new document, runValidators is true because it will run the validators in schemna each time we update the document.

    // So I'm not sure if you are familiar with this, but in javascript model.prototype always means an object created from a class, or in this case, created from a model. And so, again, when you see model.prototype here, you know that the save method here is going to be available on all of the instances created through a model, okay? And so, not the model itself. So, for example, if you tried tour.save you wouldn't be able to use it. It would give you an error, but instead, if you tried save on a document created through the tour, then it would, of course, work, okay? I hope that makes sense.

    // All right, now, keep in mind that we're actually doing a patch request here. Now, if we were doing a put request, remember, then you would expect that the original object would be completely replaced with the new one that is sent in, okay? So, in that case it would no longer work the way we implemented here because this one simply really updated the fields that are different here in the body, okay?
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};
