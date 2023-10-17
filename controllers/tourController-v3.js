const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

// 2] Route Handlers ( Controllers )

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

  next();
};

exports.getAllTours = async (req, res) => {
  // Reading documents with moongose:
  try {
    const features = new APIFeatures(Tour, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

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

exports.createTour = catchAsync(async (req, res) => {
  // try {
  // Rejected promise enters in catch block
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
  // } catch (err) {
  //   res.status(400).json({
  //     status: 'failed',
  //     message: err,
  //   });
  // }
});

exports.updateTour = async (req, res) => {
  try {
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

// Aggregation Pipeline: I want to introduce you to the MongoDB aggregation pipeline which is an extremely powerful and extremely useful MongoDB framework for data aggregation. And the idea is that we basically define a pipeline that all documents from a certain collection go through where they are processed step by step in order to transform them into aggregated results. For example, we can use the aggregation pipeline in order to calculate averages or calculating minimum and maximum values or we can calculate distances even, and we can really do all kinds of stuff. It's really amazing how powerful this aggregation pipeline is.

// Now the aggregation pipeline really is a MongoDB feature. But Mongoose, of course, gives us access to it, so that we can use it in the Mongoose driver, right? So using our tour model in order to access the tour collection, we say tour.aggregate. And so the aggregation pipeline is a bit like a regular query and so using the aggregation pipeline it's a just a bit like doing a regular query. The difference here is that in aggregations, as I already mentioned, we can manipulate the data in a couple of different steps and so let's now actually define these steps. And for that, we pass in an array of so-called stages. So we pass in an array, and then here we will then have a lot of stages. And again the documents then pass through these stages one by one, step by step in the define sequence as we define it here. So each of the elements in this array will be one of the stages. And there are a ton of different stages that we can choose from, but I will just tell you the most common ones in this lecture and also in the next one.

// Anyway, let's now learn how we can actually define one of these stages, all right? And I'm gonna start with match. And match is basically to select or to filter certain documents. And so it's very simple. It's really just like a filter object in MongoDB, such like we've been using so many times. So each of the stages is an object and then here comes the name of the stage. So this one is the match stage, all right? And as I mentioned, it's really just a query. And so let's say that for starters, we only want to select documents which have a ratings average greater or equal than 4.5.

// And so that's it, that's the first stage. And usually this match stage is just a preliminary stage to then prepare for the next stages which come ahead. So the next one is now the group stage. So group and then in there we need to always pass just another object. So it looks kinda weird with all these objects, but, yeah, you've seen that before and MongoDB just works this way. It's always objects, inside of objects, inside of objects. And this group here is where the real magic happens because as the name says, it allows us to group documents together, basically using accumulators. And an accumulator is for example, even calculating an average. So if we have five tours, each of them has a rating, we can then calculate the average rating using group. And so let's do exactly that right here. Now the first thing, is we always need to specify is the id because this is where we're gonna specify what we want to group by. For now, we say null here because we want to have everything in one group so that we can calculate the statistics for all of the tours together and not separate it by groups. We will, a bit later then also group by different stuff, for example we can group by the difficulty and we can then, for example calculate the average for the easy tours, the average for the medium tours and the average for the difficult tours.

// So again, we can group by one of our fields and that field, we are gonna specify in here, but for now, as I said, we want to calculate these averages for all the tours together in one big group. So in that case we say _id and set it to null. Now let's actually calculate the average rating. In order to do that, we simply specify a new field, so let's simply call it the average rating, so like this, and this will be well, the average, which is yet another MongoDB operator, so this one here. You will find it in the reference if you look it up. So this is a mathematical operator calculating the average and now the name of the field. And again, I know that this is gonna look very weird, but in order to specify the field which we want to calculate the average from, we need to use the dollar sign, but in quotes here and then the name of the field. So ratings average in this case. And let's also calculate the average price.

// Let's actually also calculate the minimum price, so the smallest price, and the largest price. So we did not await the result. So this, basically, just like a normal query is gonna return an aggregate object. So .find is gonna return a query, and .aggregate is gonna return an aggregate object. And then only when we await it, it actually comes back with the result. Let's actually also calculate the minimum price, so the smallest price, and the largest price. So we did not await the result. So this, basically, just like a normal query is gonna return an aggregate object. So .find is gonna return a query, and .aggregate is gonna return an aggregate object. And then only when we await it, it actually comes back with the result. So that's also why we defined this function here as an async function, so that we can then use await in there and so this is the right place.

// Now, one more thing that I want to do here is to actually calculate the total number of ratings that we have and also the total number of tours. So we have the average rating here and let's actually do it before, so numRatings, like this and you can probably guess that this one is called sum and then the ratingsAverage, or actually not ratingsAverage, but ratingsQuantity, right? So that's where the number of ratings is stored and so the number of ratings, the total, will be the sum of all of these together. And now, the last one, is the number of tours and that one is a bit trickier, and so that's a nice one to show you here. So we still want to sum, so to add everything together, basically, so we still use sum, but what are we gonna add together? Well, we basically add one for each document, and so we say 1, and that's it. So basically for each of the document that's gonna go through this pipeline, one will be added to this num counter. Let's call it numTours.

// So we have the group stage here which is quite complete. So let's try another one which is a sort stage. So another object in our array for yet another stage and this one is called sort. So sort and then in there, we need yet another object, and so here we can now specify which field we want to sort this by and let's actually use the average price. And now here in the sorting we actually need to use the field names that we specified up here in the group. We can no longer use the old names because at this point they are already gone. They no longer exist. So at this point, in the aggregation pipeline, we really already have these results. So these are now our documents basically. So if you want to sort by the average price, then this is the field name we gotta use. So we can say, the average price and then we can say 1 for ascending. So let's try that out.
exports.getTourStats = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

// Aggregation Pipeline (Unwinding and Projecting) : So let's imagine that we are really developing this application for the Nature's Company. And so let's say that they ask us to implement a function to calculate the busiest month of a given year. So basically by calculating how many tours start in each of the month of the given year. And the company really needs this fine tune to prepare accordingly for these tours, like to hire tour guides or to buy the equipment and handle all the stuff like that. So this is a real business problem that we now can solve using aggregation pipelines.

// And then here this one is called: get monthly plan. And actually we wanna be able to pass a year in the URL. And so let's use a URL parameter for that. And so here we have all nine tours and each of the tours, remember, has an array of these start dates. So one tour will start on April 25th, 2021. Then the next one starts on July 20th and then October 5th. All right. Then uh the next one has this start date and all of them I believe have three starting dates. Okay? So, these dates is what we actually need as a starting point to create this function or to create this aggregation pipeline. Because remember, we want to count how many tours there are for each of the months in a given year. And so let's so that we're analyzing 2021, okay? We have one tour in April, one in July, one in October. Then let's take a look at the next tour. Here we have one in June, one in July, and one in August. So in July we already have two. So this one and this one. Next one we have uh, one in March, one in May, and one in June. So in June we also already have two. Okay? And so we can keep going and doing it manually but of course we want to do it with our aggregation. So if you want to add all of this together the easiest way would basically be to have one tour for each of these dates here, right? And we can actually do that using the aggregation pipeline. There is a stage for doing exactly that. And that is called unwind.

// Okay? So, again we define an object and then the name of the stage. And in this case it is: unwind. Okay? And what unwind is gonna do is basically deconstruct an array field from the info documents and then output one document for each element of the array.Which is, that basically we want to have one tour for each of these dates in the array. Okay? And this stage can be really useful for so many cases. So, the field with the array that we want to unwind is start dates.

//  Now let's actually go ahead and select the documents for the year that was passed in. Okay? And remember which stage we use for that that's right, we use match. So remember, match is basically to select documents. So just to do a query. And so the year is in the start dates. So start dates is the one that we're gonna search for. So start dates, and now what do we want? Well we want the--the date basically to be greater than January 1st of the current year, so let's say 2021. And we want it to be less than January 1st of 2022, all right. So basically we want it to be 2020 and 2022. All right? So let's put that in code now. So start dates and then we need another object for the operators. So, greater or equal than and in MongoDB this works perfectly fine with dates. So Mongo is actually perfect for working with dates like doing date comparisons. So it works really great. So now we actually need to define a new date here so that, that one can then be compared with the date that's in each of the documents. So the formula of the date is year, month, and date. And so let's do a template string here and use our year variable.

// Next up is where the magic happens. And so that is usually in the group stage. So let's add the group here, so just like before so group and remember we need to specify the ID field basically to say what we want to use to group our documents. Now we want to group them by the months, right? But currently we simply have the entire date, with the year, the month, the date, and even the hour. And the one that we're gonna use is month. So it returns to month for a date as a number. And so this will basically extract the month out of our date. And there are lots of other operators. So again, you can take a look at these special aggregation operators. And in this case, again, we use the month. And then again the name of the field, where we want to basically extract the date from.

// So we are grouping it now by the month. And now the real information that we want for each of the month is how many tours start in that month? Right? And for that all we're gonna do is basically count the amount of tours that have a certain month, right? So num of tours starts. And so this one is actually very similar to what we did before. So we use sum and then for each of the documents we add one. So just like we did before.

// Now we actually want some more information which is not only how many tours but also which tours? So let's do that. So if you want information about which tours that should actually be an array. Right? Because how else would we specify two or three different tours in one field, right? And so basically we want to create an array and we do that by using push and then what we're gonna push into that array as each document goes through this pipeline is simply the name of the document, or actually the name field. So not the name of the document but the name field. So in this case the name of the tour. So we have also now the name of the tours in there. So fantastic

// Next up, let's actually uh change the name of this field here, okay? Now not really change but we're simply gonna add another field which will have the same value here so that later on we can basically delete this ID. Okay, and so for that we're gonna use the next stage which is called: add field. So add field and this one is pretty straight forward. It simply does what it says. So add field is used to add fields and actually it is called add fields. And so now, the name that we want to add or the field is called month and it has the value of the field with the name ID. All right. So, pretty straight forward simply the name of the field and then the value. Which as usual, we need to use the uh the dollar sign.

// Indeed now we have the month. Then next up, let's actually get rid of this id and so we use project. So how does project work? Well we simply give each of the field names a zero or a one. So let me show that to you. So we can say ID and set it to zero. And that will then make it so the ID no longer shows up. If I put a one here, well, then it would actually show up.

// Let me just add the next one which is the sort one which I believe I used it before but still I want to sort it here by the number or tours. We should actually sort it by uh, really by the number of tour starts. So the name of the field is number of tour starts and uh remember we had one before which was for ascending and minus one which was for descending and of course that's what we want. So starting with the highest number.

// Let me just show you one, uh last stage here which is uh, not really helpful here but I wanted to show it to you anyway. So we have the limit, and this one is exactly the same as limit in uh query. So basically it is gonna allow us to only uh, have six documents here. Okay so basically six outputs.

exports.getMonthlyPlan = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};
