const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      minlength: [10, 'A tour name must have more or equal to 10 characters'],
      maxlength: [40, 'A tour name must have less or equal to 40 characters'],
      validate: {
        validator: function (nameValue) {
          return Boolean(nameValue.match(/^[A-Za-z ]*$/));
        },
        message: 'Tour name must only contain characters',
      },
      // validate: [validator.isAlpha, 'Tour name must only contain characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to curr doc on New doc creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below the regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true, //to remove whitespace at beginning and end
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String], // to store an array of image-names as type String
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    // Geo-Spatial Data Modelling: So in this video, you're gonna learn all about geospatial data in MongoDB. And this is really a topic that I personally find really exciting. Now, remember from the previous lecture that our location data will actually be embedded into the tours. And so therefore, we're basically gonna declare everything that is related to locations in our tour model. let's start by adding the startLocation. Okay, so we will have startLocation and then also, locations in general. Now, MongoDB supports geospatial data out of the box. And geospatial data is basically data that describes places on earth using longitude and latitude coordinates. Okay, so we can describe simple points or we can also describe more complex geometries like lines or even polygons or even multi-polygons. So really, everything is possible with geospatial data in MongoDB. Okay, so let's add our startLocation field here and then let's actually implement this geospatial data. And MongoDB uses a special data format called GeoJSON. All right, so. GeoJSON, in order to specify geospatial data. And now, how does this actually work? Well, this object that we specified here is actually, this time, not for the schema type options as we have it, for example, up here. So this object here is for the schema type options. Remember that? But now, this object here is actually really an embedded object. And so inside this object, we can specify a couple of properties. All right, and in order for this object to be recognized as geospatial JSON, we need the type and the coordinates properties, all right. So we need type and we need coordinates, all right. And so now, each of these fields here, so basically, each of these sub-fields is then gonna get its own schema type options. All right, so basically here, it's a bit nested, so we have one level deeper. Okay, so we have the type schema type options and then we also need schema type options for coordinates and again, just like we have up here in these other fields with the difference that these are now sub-fields.So type needs the type of string, all right, and the default should be point. So remember how I said that we can specify multiple geometries in MongoDB? And the default one is always point. But again, we could also specify polygons or lines or other geometries like that. But in this case, for the startLocation, it really should be point.

    // And so let's actually make that the only possible option by specifying the enum, so the enumeration property. So remember, we can specify an array of all the possible options that this field can take and so in this case, we only want it to be point, all right. So we need to define the type, remember, and also, an array of coordinates. Okay, and so we do that by saying number, but then in these curly brackets. Okay, and so that basically means that we expect an array of numbers and this array, as the name says, is the coordinates of the point with the longitude first and only second, the latitude. And so that's a bit counterintuitive because usually it works the other way around. But in GeoJSON, that's just how it works. So if you were to go, for example, to Google Maps in order to get your coordinates, then you will see first the latitude and then the longitude. because I also want to specify a property for the address. So add another string and then also, a description of this startLocation and that again, as a string, all right. And we're not gonna say that any of these fields should be required because we want to be allowed to leave the startLocation blank. Okay, so again, in order to specify geospatial data with MongoDB, we basically need to create a new object such as we did here. And that object then needs to have at least two field names. So coordinates has this array of numbers and then the type, which should be of type string and should be either point or some other of these other geometries that I just told you about before. Okay, and we can then of course add some more fields to this object such as we did here, all right. Now, remember how in the last lecture we said how we were gonna embed all the locations into the tour documents? But right now, the startLocation here is not really a document itself. It's really just an object describing a certain point on earth. But in order to really create new documents and then embed them into another document, we actually need to create an array, all right. So it's actually very similar to what we already have here, but it needs to be an array. And so that's what we're gonna do with our locations. So locations, and now, I'm creating an array. And then in this array is where I'm gonna specify the object such as I did it before in startLocation.So the type, remember, for geospatial data needs to be string.

    // The default needs to be point. And also, it cannot be anything but point, okay. And this date will basically be the day of the tour in which people will go to this location. Now, if we wanted to make it simpler, we could delete the startLocation all together and then simply define the first location as the startLocation and set it to day number zero. All right, but I decided it's nice to also have the startLocation as a separate field. Okay, so this is how you create embedded documents. Remember we always need to use this array, okay. And so by specifying basically an array of objects, this will then create brand new documents inside of the parent document, which is, in this case, the tour.
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number], //[longitude, latitude ]
        address: String, //street name + number
        description: String,
        day: Number,
      },
    ],

    // Modelling Tour Guides(Embedding) : So again, in this lecture we are going to embed user documents into tour documents, and then in the next video, I will show you how we can actually reference users instead of embedding, all right? So the idea here is that when creating a new tour document, the user will simply add an array of user IDs, and we will then get the corresponding user documents based on these IDs, and add them to our tour documents. So in other words, we embed them into our tour, okay? So guides will be of the type array, okay? and so this is then how we're gonna create a new tour with two guides, okay, and again once we then save this tour, we will then, behind the scenes, retrieve the two user documents corresponding to these two IDs, all right? So, let's implement that, and back in our model the best place of doing that is a pre-saved middleware, right? So, that will then happen automatically behind the scenes, basically, each time that a new tour is saved. Okay, so we get this.guides as an input, and remember this is gonna be an array of all the user IDs, right, and so we will loop through them using a .map, and then in each iteration get the user document for the current ID, all right, and we're gonna store that inside of guides, all right? So, the current element, which is gonna be the ID, and so now we actually need the user, right, so let's go ahead and import that. so User.findByID with the current ID, all right? But now, keep in mind that we actually do need to await this promise here, right and so, therefore, the function needs to be marked as async, but now we actually get a problem, all right, because the .map method will assign the result of each iteration to the new element in the guides array, okay, and so now we have an asynchronous function here and, as you know, that returns a promise, and so right now this guides array here is basically an array full of promises, okay. and so we now actually need to run all of these promises, basically at the same time. all we need to do is await Promise.all and then guidesPromise, okay, and we can directly assign the result of this to this.guides, and so basically override that simple array of IDs with an array of user documents, okay, and since we're now using await here, we need to mark this function as async, okay?

    // Okay, but now let's take a look at our results, and so indeed we get our guides here, okay? So these are the complete documents, and indeed not just the IDs, right? Great, and so this is how we could implement embedding for this tour guides example. Now, this simple code that we implemented here of course only works for creating new documents, not for updating them, right? So now, we would have to do go ahead and implement this same logic also for updates. However, I'm not going to do that because, remember from the video where we modeled our data, that there are actually some drawbacks of embedding this data in this case. For example, imagine that a tour guide updates his email address, or they change their role from guide to lead guide. Each time one of these changes would happen, then you'd have to check if a tour has that user as a guide, and if so, then update the tour as well, and so that's really a lot of work and we're not gonna go in that direction, all right?
    // guides: Array,

    // Modelling Tour Guides (Child Referencing) : So we embedded users into tours in the last video, and also talked about the drawbacks of that approach in our specific situation. And so in this video let's actually connect tours and users not by embedding but instead by a reference. Okay, so this one here, responsible for performing the embedding basically. And now let's go here to our guides field. Okay? So this time in this video, the idea is that tours and users will always remain completely separate entities in our database. Okay? So all we save on a certain tour document is the IDs of the users that are the tour guides for that specific tour. Then when we query the tour, we want to automatically get access to the tour guides. But again, without them being actually saved on the tour document itself. And that exactly is referencing. And so let me now show you how we can implement referencing using Mongoose. Okay? So, here in the guides we will now want to specify an array. Okay? So just like we did before with the locations. And so that then again means that these will be some sub-documents. So embedded documents. All right? And now the type is going to be a new type that we never saw before. And that is mongoose.Schema.ObjectId. Okay? And what this means is that we expect a type of each of the elements in the guides array to be a MongoDB ID. and also all of this here needs to be inside of an object, just like any other schema type definition. Okay, because that's all this really is. Okay, so the type is of this MongoDB ID, basically, and then we also need to now specify the reference. And this is where the magic happens behind the scenes, because here, now we say that the reference should be user. Okay, and so this really is how we establish references between different data sets in Mongoose.

    // And for this we actually do not even need to have the user to be imported into this document. All right, and now we create a new tour. And so just like before, all we pass into the guides is an array of the IDs. All right? But this time we actually specified that an object ID is exactly what we expect. Right? So, this here is of the type object ID. But behind the scenes, it's also referenced to the user. All right? So, when we now create this tour here, it will actually only contain these IDs, and not the user corresponding to the IDs. And as I said before, in the next video, we will then take care of actually displaying the user data in the output, using a process called populating.
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  },
);

// Improve Read Performances with Indexes: So let's come here to get all tours and I will also filter for a price less than 1,000.Yeah, so we get three results back, all right. And that's important to keep in mind for what I'm gonna show you next which is that we can actually also get a couple of statistics about the query itself. And so here on the query, I'll actually now add an explain method. Okay so after the query we will then call explain all right. And so let's take a look at that. And so we now get a completely different result, which is basically these statistics. So you can see here that the number of documents that were returned were three. And so that's exactly the result that we got before. But what's really important to note here is that the number of documents that were examined is nine, okay. And so this means that MongoDB had to examine, so basically to scan all of the nine documents in order to find the correct three ones. So the three ones that match the query okay. And so that's not efficient at all right? And so you really need to learn about indexes. Because with indexes, we will be able to kind of solve this problem. So we can create indexes on specific fields in a collection. For example Mongo automatically creates an index on the ID field by default. And so again you see that by default we have an ID index. And this ID index is then basically an ordered list of all the IDs that get stored somewhere outside of the collection okay. And this index is extremely useful. Because whenever documents are queried by the ID MongoDB will search that ordered index instead of searching through the whole collection and look at all the documents one by one, which is of course much slower. So again without an index Mongo has to look at each document one by one. But with an index on the field that we are querying for, this process becomes much more efficient. So that is pretty smart, right? And of course, we can set our own indexes on fields that we query very often. So we need to go to the tour model right. and we say tourschema.index okay. And then an object with the name of the field and remember how I said we were gonna set the index on the price and then either a one or a minus one. And a one means that we're sorting the price index in an ascending order, while the minus one stands for descending order okay. And there are actually other types of indexes as well, like for text or for geospatial data, but we will see that a bit later.

// And so indeed we get still our number of returned at three but this time the number of documents that were examined, so that were scanned, were also only three. And so that proves that with this index, we basically achieved exactly what we wanted. So before we had to scan through all of the nine documents and now the engine only needs to scan the three documents that are actually also returned. And again because their prices are now ordered in that index. And so that makes it much easier and much faster for the MongoDB engine to find them. And so this is of course a huge performance gain. Now another thing that you might notice here is how this ID index that we talked about earlier says unique here okay. And so unique is also a property that we can give to indexes. And this is actually the reason why the IDs have always to be unique. You probably also noticed that there is an index for the name here right? But we didn't actually create that manually ourselves right? So can you guess why it is here? Well it is because in our schema definition, we set the name field to be unique. And so what Mongos then does behind the scenes in order to ensure the uniqueness of this field is to create a unique index for it, all right. And so because of that, not only the ID but also the name always have to be unique. But anyway, if we sometimes query for that field but combined with another one, then it's actually more efficient to create a compound index. And so another field that I think is going to be queried for all the time is the ratings average. So the number of results, so the number of documents that are returned, so that match this query is two. But we still had to examine three documents. And so now we want to fix the situation as well and for that we're gonna use a compound index. All we need to do is to add here the other field. All we need to do is to add here the other field. So ratings average and let's put this one in the ascending order. Or actually, that's the descending order all right. And so now we get the result that we wanted. So only two documents were scanned in order to find the two documents that we were actually looking for. Perfect and actually this compound index that we just created is also going to work when the query for just one of these two fields here individually, so price or ratings average. So when we create a compound index like this, we do not have to then create one individual for each of the fields as well okay.

// One thing that we can still see here and which is pretty interesting is that actually the size of these indexes. So 72 kilobytes is actually way bigger than the total size of all the documents combined, which is only 14 kilobyte right? And so basically these indexes that we create to search the documents take up a lot more space than the documents themselves. But it's still important to talk about this because actually this leads me to our next question. And that question is, how do we decide which field we actually need to index? And why don't we set indexes on all the fields? Well we kind of used the strategy that I used to set the indexes on the price and on the average rating. So basically we need to carefully study the access patterns of our application in order to figure out which fields are queried the most and then set the indexes for these fields. Because we really do not want to overdo it with indexes. So we don't want to blindly set indexes on all the fields and then hope for the best basically. And the reason for that is that each index actually uses resources, so as you can actually see here right. And also, each index needs to be updated each time that the underlying collection is updated. So if you have a collection with a high write-read ratio, so a collection that is mostly written to, then it would make absolutely no sense to create an index on any field in this collection because the cost of always updating the index and keeping it in memory clearly outweighs the benefit of having the index in the first place if we rarely have searches, so have queries, for that collection.
// tourSchema.index({ price: 1 });
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

tourSchema.virtual('durationWeeks').get(function () {
  if (this.duration) return this.duration / 7;
});

// Virtual Populate: And let's keep it going now with a new and pretty advanced Mongoose feature called 'Virtual Populate.' So, at the point, we have populated the reviews with the tour and the user data right here, right? And so, right now, when we query for reviews, we get access to that information. However, that still leaves one problem unsolved. So, how are we going to access reviews on the tours? So basically, the other way around. So, let's say that I queried for a specific tour. And then, how will I get access to all the reviews for that tour? And this problem arises here because we did parent referencing on the reviews. So basically, having the reviews pointing to the tours and not the tours pointing to the reviews. And so, as we said in the beginning of the section, in this case, the parent does not really know about its children. And so, in this example, the tour does not know about its reviews. And sometimes, that's okay. But in this case, we actually want the tour to basically know about all the reviews that it's got.

// Now, in order to solve this, with what we know at this point, we could have two solutions. And the first one would be to manually query for reviews each time that we query for tours. But it would be a bit cumbersome doing it manually like this. And the second solution could be to also do child referencing on the tours. So basically, keep an array of all the review ID's on each tour document. Then, all we would have to do is to populate that array, right? But, we actually already ruled out doing this right in the beginning because we do not want to store that array of review ID's that could then grow indefinitely in our database, right? And that's actually exactly why we picked parent referencing in the first place. However, there is great solution for this. And that's because Mongoose actually offers us a very nice solution for this problem with a pretty advanced feature called 'Virtual Populate.' So with 'Virtual Populate,' we can actually populate the tour with reviews. So, in other words, we can get access to all the reviews for a certain tour, but without keeping this array of ID's on the tour. So, think of 'Virtual Populate' like a way of keeping that array of review ID's on a tour, but without actually persisting it to the database. And so that then solves the problem that we have with child referencing, right? So, it's a bit like virtual fields, but with populate, okay?

// So we do it here on the tour schema. And we still do it .virtual. So just like with this virtual field here, duration week, then we type in the name of the virtual field. So let's call it 'Reviews,' and then an object of some options. And the first one is the name of the model that we want to reference. And so that works just like with the normal referencing. So again, the name of the model. So, 'Review' or course, in this case. And now, we actually need to specify the name of the fields in order to connect the two data sets. So here, we need to specify two fields. The foreign field and the local field. So let us start with the foreign field. And so, this is the name of the field in the other model. So in the Review model in this case, where the reference to the current model is stored. And that is, in this case, the Tour field, right? So, let's take look at that. And so, again, in our review model, we have a field called 'Tour.' And so this is where the ID of the tour is being stored. And so that's why here, in this foreign field, we specify that name of that field in order to connect these two models, okay? And now we need to do the same for the current model. So, we need to say where that ID is actually stored here in this current Tour model. So, local field. And that is, the ID. So, _ID, okay? And so, again, this _ID, which is how it's called in the local model, is called 'Tour' in the foreign model. So, in the Review model. Okay? And so again, this is how we connect these two models together.

// So, when we get this tour, we now want to populate the reviews. And it should already be here as an empty array. Ah, here it is. It's not an empty array, but it's set to 'null.' But the virtual field is actually already there with the reviews. But it's null at this point because we didn't yet populate it, okay? And again, we only want to populate it here in the 'Get One Tour,' and not in the 'Get All Tours' because that would be a bit too much information to send down to a client when they get all the tours. We only need that when we are really displaying just one tour. Okay? And so, I think it makes sense to only do this populate on 'Get One Tour.' So, let's do that populate actually right in the controller. So, the tour controller and down here where we have 'Get Tour.' And so, that's actually very easy. Only to do is to call 'Populate' after the other query, and then simply pass the name of the field that we want to populate. And so, as we already know, that is called 'Reviews.' And, so that should actually be it already.

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

// Document Middleware: runs before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', async function (next) {
//   // returns an array of promises
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));

//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// tourSchema.pre('save', function (next) {
//   console.log('Will save document...');
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// Query Middleware:  tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  // this.start = Date.now();
  next();
});

// Populating Tour Guides: Let's now use a process called populate in order to actually get access to the referenced tour guides whenever we query for a certain tour. So, in the last video, we created a reference to the user, here in this guides field, right in our tour model, right? And now we're gonna use populate in order to basically replace the fields that we referenced with the actual related data. And the result of that will look as if the data has always been embedded, when in fact, as we know, it is in a completely different collection okay? Now, the populate process always happens in a query. And so let's now go to our tour controller, and then right to the function where we get a single tour. So here, in get tour. And here's our query, right? So this here, is where we build our query. And now all we need to do is to add the populate to the query. So populate, and then the name of the field which we actually want to populate and that is called guides, okay? And if you think about it, this name actually makes sense. So we want to populate so basically to fill up the field called guides in our model. Right, so again, this guides field only contains the reference. and with populate we're then gonna fill it up with the actual data, all right and again only in the query and not in the actual database, okay? So, this is really all we need to do and indeed, here is the data about the guides. Okay, so these two elements that we had in the guides already, have now been populated with the actual data. Okay, now let me just show you a small trick that we can do with the populate function. Which is to actually also just select the certain fields. So for example, we're not interested in this v property here and also not in passwordChangedAt right, so that's not the kind of data that we want about our tour guides. And so here in populate, we can actually specify that. So instead of just passing in the string, we can create an object of options and then we can say, the path is guides, so basically, the name of the field we want to replace, and then, as usual, we can use select, and then minus, this one here and also, the other one, so passwordChangedAt, it's just easier to copy, all right, so let's change it here, and send this again. And so we already did that, so if we send it now, then of course we only get the data that we're interested in. All right, so this populate function is an absolutely fundamental tool for working with data in Mongoose.

// And especially of course when there are relationships between data, okay, so you should always know exactly how and when to use it for your own applications. Now just one thing that I want you to keep in mind, is that behind the scenes, using populate will still actually create a new query, and so this might affect your performance. let's remember what I showed you that this actually didn't work when we get all the tours. So, remember how in this situation, we still simply get the ids of the tour guides and not the referenced user data. Okay, and so one solution would basically be to copy this code here, so this populate function, also here into this route handler, but of course, duplicate code is never a good idea. And I hope that you already know at this point of a better way of doing this. And the answer to that is query middleware. So, a pre and then I will actually just as before do it with a regular expression, which is then gonna work for everything that starts with find. So, just like this, Okay, and of course, we do this in query middleware, well because, this is the kind of middleware that is going to run each time there is a query. and now let's just add it to this, because remember that in query middleware, this always points to the current query. And so now basically all of the queries will then automatically populate the guides field with the referenced user. Okay, and so we can now get rid of it here. And yeah, that's actually it. So now we do it here, instead of doing it in two places, in the controller. And so this is a nice little trick in case that you always want to populate all your documents. So this is a two step process. First, you create a reference to another model. And so, with this, you effectively create the relationship between these two datasets. Then, in the second step, you populate that field that you just specified before, so guides using the populate method.
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });

  next();
});

// tourSchema.post(/^find/, function (doc, next) {
//   console.log(`Query took ${Date.now() - this.start} millisecs!`);
//   console.log(doc);

//   next();
// });

// Aggregate Middleware:

tourSchema.pre('aggregate', function (next) {
  const things = this.pipeline()[0];
  if (Object.keys(things)[0] !== '$geoNear') {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  }
  next();
});

// const GEOSPATIAL_OPERATOR_TEST = /^[$]geo[a-zA-Z]*/;

// tourSchema.pre('aggregate', function(next) {
//   const geoAggregate = this.pipeline().filter(
//     // finding if the pipeline stage name has any geo operator using the regex. 'search' method on a string returns -1 if the match is not found else non zero value
//     stage => Object.keys(stage)[0].search(GEOSPATIAL_OPERATOR_TEST) !== -1
//   );

//   //Placing secretTour query first if no GEO queries exist
//   if (geoAggregate.length === 0) {
//     this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   }

//   //If GEO queries exist, keep the secret tour functionality by placing the secretTour query after all GEO queries in the pipeline
//   else {
//     this.pipeline().splice(geoAggregate.length, 0, { $match: { secretTour: { $ne: true } } });
//   }
//     console.log(this.pipeline());
//   next();
// });

// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
