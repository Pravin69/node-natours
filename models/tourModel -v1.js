const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

// Mongoose and Schema : So, Mongoose is all about models, and a model is like a blueprint that we use to create documents. So it's a bit like classes in JavaScript, which we also kind of use as blueprints in order to create objects out of them, right? So again, we create a model in Mongoose in order to create documents using it, and also to query update and delete these documents. So basically, to perform each of the CRUD operation, so create, read, update, and delete, we need a Mongoose model, and in order to create a model, we actually need a schema. So, we actually create models out of Mongoose schema just like we learned in the last video, and we use the schema to describe our data, to set default values, to validate the data, and all kinds of stuff like that.

// So, let's say tourSchema is a new mongoose.Schema. Add that in here we actually pass our schema as an object. All right, we can then also pass in some options into the schema. and so let's now replicate that here by saying name, and then describing what type of data we want after name, and we want it to be a string. So Mongoose actually uses the native JavaScript data types, and so here we can say string, or after rating we can say that we want a number and the same as the price. It should also be a number, right? So this is the most basic way of describing our data. So we have a name, a rating, and a price, and we specified the data type that we expect for each of these fields. So again, this is the most basic way of describing a schema, but we can take it one step further by defining something called schema type options for each field, or only for some specific field. So let's start here with the name, and instead of just specifying it as a string, let's actually pass in another object. And so now, we say that we want the type to be string but we can now define a couple more options, okay? For example, we can say that this field is required, and so we simply set the required property here to true, all right? So again, this object here are the schema type options, and they can be different for different types, for example the number type has some different schema options than the string here, but many of them are also similar. So for example, the required, we can use it on number as well, and so let's do that here. So the type, we still want it to be a number, and we also want it to be required, okay? Now, here in the required we can actually specify the error that we want to be displayed when we're missing this field.

// So, in order to do that we just have to pass in an array, and the first one is true. So the first element is true, and the second one is the error string. Let's say, a tour must have a name, and then here let's do the same. The tour must have a price, okay? Then we can also set default values and let's do that here for the rating. So again, I'm gonna specify some schema type options here, which is not mandatory, so it's enough to simply define the type here like we did, but if you want some more features, then we need to to at least specify the schema type options object. Okay, and then we need to specify the type again, which is number, and as a default, I want it to be 4.5. And so if we'd now create a new tour document using this schema and not specifying the rating, it would then automatically be set to 4.5, all right? And just to finish, let's try another one here, which is to say that the name should be unique. So, unique and set it to true, and so like this, we can now have two tour documents with the same name, all right?

// So, this is our very basic schema, let's now go ahead and actually create a model out of it, all right? And that's very simple, we simply create a variable called Tour, and then mongoose.model, then the name of the model, which is Tour with an uppercase T here, all right. And so that's just kind of a convention in programming to always use uppercase on model names and variables. So here it's the same, so I also created this tour variable here with a capital T just so we know that we're dealing with a model here. All right, so the name of the model and then the schema, and that's it. So just like this, we created a tour out of the schema that we created here in the beginning.

// So just a recap here, we used new mongoose.Schema here to specify a schema for our data. So, basically describing it and also doing some validation. For example, this required here, this is actually something called a validator because it is used to validate our data. In this case, simply to validate if the name is actually there. And there are a lot of validators in Mongoose, and we can actually also create our own.
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
    // So basically a reference will be stored in the database. And that's a very common practice, okay? So we could store the entire image as well in a database, but that's usually not a good idea. We simply leave the images somewhere in the file system and then put the name of the image itself in the database as a field.
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String], // to store an array of image-names as type String

    // And the createdAt field should basically be a timestamp that is set by the time that the user gets a new tour. So this here should of course be added automatically. Again, at the time the tour is created. So how do we do that? Well first of all, we set the type to Date. So Data is yet another JavaScript built-in datatype, and so we can use that here. Okay, so the type is Date, and then we simply need to set a default, and the default is the JavaScript built-in function Date.now. And I'm sure you are familiar with this one. So this will simply give us a timestamp in milliseconds, which basically represents the current millisecond. Alright, now in Mongo, this is now immediately converted to today's date in order to make more sense of this data, okay? So yeah, that's the automatically created timestamp.
    createdAt: {
      type: Date,
      default: Date.now(),
      // All right, great, now there's one last thing that I want to show you which is that we can also exclude fields right from the schema. Alright, and that can be very useful, for example, when we have sensitive data that should only be used internally. For example, stuff like passwords should never be exposed to the client and so therefore, we can exclude some fields right in the schema. So for example, we might not want the user to see when exactly each tour was created. alright, so we can go into our schema, which is in the tour model of course, and then at createdAt, we simply set the select property here to false. And now when we try to get our results, you see that it's actually no longer there okay?
      select: false,
    },
    // We also want to able to define an array of start dates. So startDates, and again, we simply define an array, and then say that in there we want dates. Alright, so these startDates are basically different dates at which a tour starts. Anyway, this one here will not be automatically created by MongoDB, and MongoDB will then automatically try to parse the string that we passed in as the date into a real JavaScript date. For example, we could pass in something like let's say 2021, March 21st, and again Mongo would then automatically parse this as a date. And only if it can't, it will then throw an error.
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  },
);

// Virtuals Properties: And so let's open our tour model here. All right, now virtual properties are basically fields that we can define on our schema but that will not be persisted. So they will not be saved into the database in order to save us some space there. And most of the time, of course, we want to really save our data to the database, but virtual properties make a lot of sense for fields that can be derived from one another. For example a conversion from miles to kilometers, it doesn't make sense to store these two fields in a database if we can easily convert one to the other, right? Okay, so let's now define a virtual property that contains the tour duration in weeks. And so that's a field basically that we can very easily convert from the duration that we already have in days, right? And so here is how it works. We define that virtual properties on the tour schema, and so we say, tourSchema.virtual and then the name of the virtual property. So let's call it duration weeks, and then on there we need to define the get method. And that's just because this virtual property here will basically be created each time that we get some data out of the database. And so this get function here is called a getter. Now in here we pass a function, and actually this call back function is gonna be a real function, so not an arrow function, and I'm gonna explain to you why in a second. Now how do we then basically define the virtual property? Well it's very simple, all we have to say is that we want to return this, .duration in this case, divided by seven. So this is how we calculate the duration in weeks.

// Now I used this regular function here because remember, an arrow function does not get its own this keyword. In here we actually need the this keyword because the this keyword in this case is going to be pointing to the current document. And so usually when we want to use this, then we should always use a regular function. So really everywhere in Mongoose, I'm gonna always be using these regular functions that we're used to. Now right now it's actually not gonna be there yet, because there's one piece missing here, And that's because we need to explicitly define in our schema that we want the virtual properties in our output. And so remember how I said that into this Mongoose.schema, we can pass in not only the object with the schema definition itself, but also an object for the schema options. And so let's add that here at the end, so this first object here is the schema definition, and now second an object for the options. And what we need to specify here is the two JSON property here, and what we say is then that each time that the data is actually outputted as JSON, we want virtuals to be true. So basically the virtuals to be part of the output. And now I'm duplicating this because we also want to say to object. So basically when the data gets outputted as an object.

// Now one thing that we need to keep in mind is that we cannot use this virtual property here in a query, because they're technically not part of the database. So we can not say, for example, tour.find where duration weeks is equal to one. That's not gonna work, again because this property is not actually part of the database. Now of course we could also have done this conversion each time after we query the data, for example, like in a controller, but that would not be the best practice simply because we want to try to keep business logic and application logic as much separated as possible, remember. So that was that whole talk about models and controllers that we talked about before which says that we should have models with as much business logic as we can offload to them and controllers with as little business logic as possible. And so virtual properties like this are actually a good example of how we can achieve that kind of architecture.
tourSchema.virtual('durationWeeks').get(function () {
  if (this.duration) return this.duration / 7;
});

// Document Middleware: Just like Express, Mongoose also has the concept of middleware. Now, just like with Express, we can use Mongoose middleware to make something happen between two events. For example, each time a new document is saved to the database, we can run a function between the save command is issued and the actual saving of the document, or also after the actual saving. And that's the reason why Mongoose middleware is also called pre and post hooks. So again, because we can define functions to run before or after a certain event, like saving a document to the database. So middleware is an absolutely fundamental concept in Mongoose, so just like in Express.

// So there are four types of middleware in Mongoose: document, query, aggregate, and model middleware. And in this lecture, we're gonna talk about document middleware, which is middleware that can act on the currently processed document. So just like the virtual properties, we define a middleware on the schema, so tourSchema.pre. And so this is for pre middleware, which again, is gonna run before an actual event. And that event in this case is the save event. And so this call back function that we're gonna define here next, so function so this function will be called before an actual document is saved to the database. So this is document middleware, and it runs, let me write all of that here. So it runs before the save command and the .create command. But not on insert many.

// So always keep that in mind. It's very important to realize that only on save and on create actually this middleware here is gonna be executed. And so in a save middleware, the this keyword here is gonna point to the currently processed document. And that is the reason why it is called document middleware. Again, because in this function here, we have access to the document that is being processed. So in this case, the document that is being saved. And so in order to now trigger this function, remember we need to run a save command or a create command. And so we now need to create a new tour using our API in order to, yeah, to then trigger this middleware and so this is what our document is looking like right before it saved into the database. And so at this point of time, we can still act on the data before it is then saved to the database and that is exactly what we're gonna do now. So down here in our middleware function. And what I wanna do here is to create a slug for each of these documents.

// And so a slug is basically just a string that we can put in the URL, usually based on some string like the name. So in this case, we're gonna create a slug based here on the tour name. This is the currently processed document. So we can now define a new property on it. So this.slug should be slugify, and then just a string that we want to create a slug out of, and so that's gonna be this.name and then we also want to pass in the option that everything should be converted to lower case, and so that's lower: true . And one thing that we didn't talk about yet is the next function. So just like in Express, we also have the next function in mMngoose middleware, basically to call the next middleware in the stack as we already know. Now in this case, we only have one middleware function, which is why we didn't run into any problems, even not calling next, but let's actually now do that. And so each middleware function, in a pre save middleware has access to next. So that's exactly the same as in Express, and so by the end of the middleware we call next, and that will then call the next middleware in the stack.

// Let's now just very quickly experiment, also, with a post middleware. So tourSchema.post and let's use save again. And then the callback function, which in the case of post middleware has access not only to next, but also to the document that was just saved to the database. So let's call that one doc and then next. And so post middleware functions are executed after all the pre middleware functions have completed, all right. So in here we actually no longer have the this keyword, but instead we have the basically finished document here in doc. So let's just log that finished document to the console and then call next. Now another thing that I wanted to show you is that we can have, of course, multiple pre middlewares or also post middlewares for the same hook. And hook is what we call this save here. So this middleware here is basically what we call a pre save hook. So you will see that terminology all the time. So some call it middleware, and some call it hooks.

// runs before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function (next) {
//   console.log('Will save document...');
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY Middleware: And, as the name says, query middleware allows us to run functions before or after a certain query is executed. And so let's now add a pre-find hook, so basically, a middleware that is gonna run before any find query is executed. And of course, it works in a very similar way as before. So the tourSchema, and then pre, and in here we define the hook, which is gonna be "find." So, function, and again, we have access to the next function. The only difference here is really this find hook, which will make this query middleware and not document middleware. All right? And so, the big difference here is that the this keyword will now point at the current query and not at the current document, because we're not really processing any documents here. We're really gonna be processing a query. Okay? And the use case that we're gonna do here is this. So let's suppose that we can have secret tours in our database, like for tours that are only offered internally, or for a very small, like, VIP group of people, and that the public shouldn't know about. Now, since these tours are secret, we do not want the secret tours to ever appear in the result outputs. Right? And so what we're gonna do is to create a secret tour field and then query only for tours that are not secret.

// So, again, keep in mind that this here is now a query object, all right? And so we can chain all of the methods that we have for queries. And so that simply adds a find method here, and then basically select all the documents where secretTour is not true, okay? So secretTour ... And then is not equal to true. So, let's try to understand again what really happens. So as soon as we hit this route, here, using the get method, let's see what happens. So, what happens is that we create a query using tour.find. Okay? And then, of course, we chain all these methods to it as we talked about in one of the last lectures, and then, by the end, we then execute that query here by using await. Right? Remember that? So this is where we execute the query. But, before it actually is executed, then, our pre-find middleware here is executed. Okay? And it is executed because it is find, just like we used here. Right? So, we're creating a find query, and so, therefore, the find hook is then executed. Then, in here, since it is query middleware, the this keyword points to the query. And so, to that query, we can then chain yet another find method, right? And in there, we then filter out the secretTour using this filter object. Okay? So basically saying that we only want tours where the secretTour is not equal to true.

// Okay, there is now just one thing that we need to fix, because right now this middleware is running for find, but not for findOne. And that's because the handle function for this route ( get tour by id ), as you might remember, is using findByID, which, behind the scenes, is findOne, and so it's different from find. All right? So, we need to specify the same middleware also for findOne. But that's not really good, and so instead we're gonna use a regular expression and  then, remember, a regular expression starts and ends with a slash. And then in here, what I want to say, is that this middleware should be executed not only for find, but for all the commands that start with the name find. Okay? So, find, and findOne, and also findOne and delete, findOne and update, and so all of these will now actually trigger this middleware function that we have here. So the tour with this ID here is secret, but we never want the secretTours to show up in any query. And so that's why, right now, we get zero results. Okay? So that works now.

// Let's now actually also specify a post middleware for find. So, tourSchema, and then, just like before, post, and then let's use our regular expression here again for anything starting with find. And then just a regular function, and then here, in the post-find middleware, we actually get access to all the documents that we returned from the query. So let's call that Docs. All right? So, remember that this middleware is gonna run after the query has already executed. And so, therefore, it can have access to the documents that were returned. Again, because that query has actually already finished at this point. So basically, let's create, kind of, a clock to measure how long it takes to execute the current query.

// So, how are we gonna do that? Well, quite simple. We can simply set a property onto the this object, because this query object is really just a regular object. Of course it has access to all these methods, such as find, but we can also use it to set any property that we want on it. So, again, just a regular object. And so here we can say this.start should be the current date. And so then, here, in the post middleware, which is gonna run after the query has executed, we can then subtract the current time minus the start time.

// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  // this.start = Date.now();
  next();
});

// tourSchema.post(/^find/, function (doc, next) {
//   console.log(`Query took ${Date.now() - this.start} millisecs!`);
//   console.log(doc);

//   next();
// });

// Aggregation Middleware: Aggregation middleware allows us to add hooks before or after an aggregation happens, and so let's now actually continue with our previous example where we did hide the secret tours from the queries, now in an aggregation the secret tours are still being used  and so basically we also want to exclude the secret tour in the aggregation. So how could we do that? Well let's take a look at where our aggregation is actually happening so it's down here in yeah, so in get tour steps, and so what we could do is to here in this match state simply exclude the secret tours that are true right? So that would be quite easy to add here, but then we would have to add the same thing down here in the other aggregation that we have, and if we had even more aggregations we would then have to add that in all of them and that's of course not a good idea, because for example we could forget to do it and it's also just repetitive code and so let's simply exclude it right at the model level, alright so let's add aggregation middleware here.

// We have tourSchema.pre so we want this to happen before the aggregation is actually executed and so here we use the aggregate hook. Alright and then our function which again accepts the next function so calling the next middleware. At this, so remember that up here in query middleware that this object points to the current query. Then here in document middleware the this object points to the current document, and so down here in aggregation middleware this is going to point to the current aggregation object.

// this.pipeline okay because what I really wanted to show you is just the pipeline object. Okay, and actually it's pipeline like this so it's actually a function, a method. Try this again, and so here we get the aggregation pipeline, and so that's simply the array that we passed into the aggregate function before. So that is exactly the pipeline we specified before, and so now in order to filter out the secret tours all we have to do is to add another match stage right at the beginning of this pipeline array, right and so let's do just that. so this.pipeline and remember that this is an array and how do we add an element at the beginning of an array? We use unshift and so that is a standard JavaScript method for arrays okay, we have also shift to add at the end of the array and unshift at the beginning of the array, and so again what we want to add here now is to add just another stage, so very similar to what we have down here. So match and then secretTour, not equal to true. And we can again take a look at our aggregation pipeline now and here you see that now we have these two matched stages. Great and as I mentioned before it's no problem to repeat these stages, we can have as many match stages as we want, okay and that's it for aggregation middleware.
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

// Data Validation (Built-in Validators): So, Mongoose offers us developers very powerful ways of validating data that's coming into our model. Now, what exactly does validation actually mean? Well, validation is basically checking if the entered values are in the right format for each field in our document schema, and also that values have actually been entered for all of the required fields. Now, on the other hand, we also have sanitization, which is to ensure that the inputted data is basically clean, so that there is no malicious code being injected into our database, or into the application itself. So, in that step we remove unwanted characters, or even code, from the input data, all right? And this is actually a crucial step, like, a golden standard in back-end development. To never, ever accept input data coming from a user as it is. So, we always need to sanitize that incoming data. But, anyway, I will leave data sanitization for the security section of the course, so that in this lecture we can focus entirely on data validation. And we are doing this data validation right here on the model. And that, again, is because of the fat model and thin controller philosophy, which makes the model the perfect place to perform validation, right? And, in fact, Mongoose already comes with a bunch of validation tools out of the box.

// And actually, we already did. So, when we used this require here, that is actually already a built in data validator, all right? So you see that we use a validator like required right here in the schema type options. And required is actually available for all the data types. So, not just strings, but really everything. Numbers, Booleans, dates, or really, whatever type you're using. Then we also have unique here, but please note, that this is actually, technically, not a validator. It will still produce an error when we have a duplicate name, but again, this is not really a validator, all right? But, required is a validator, and so I'm going to show you now another one which is specifically just for strings, which is called max length and also min length.

// So, let's say we want 40 as the maximum string length, and then, we add the error after that. Okay, and so just like this we have these two validators that are actually only available on strings. Great, but now what about updating tours? So, let's get one of these here. So, we have this test tour two here, so let's try to update this one. So, we go to our update tour route. And now let's here, change the name to Test, send the request, and, we get the same error. Now, this only works because of a setting that we set way back, when we implemented this updating handler because of this option here runValidators, set to true that the validators are run again. Let's try a couple of more validators here. For example, now on numbers. So, let's go here to the ratings average. And we know that the rating must always must always be between one and five, okay? And so, very similar to the min and max length, on numbers we simply have min and max. So, the minimum that we want is one, and then again our error message.

// Next up, I want to restrict this difficulty value here to only three difficulties. So, easy, medium, and difficult. And if the user puts in something else, then it's not going to work. So, the validator that we use for that is called enum, okay, and so, here we can pass an array of the values, basically, that are allowed. So, we have easy, we have medium, and we have difficult. All right, now we also want to specify our error message here, but right now that's not really possible, right? I mean, if we added another argument here, then that would not be for the error message, it would of course be for yet another possible value, okay? And so, the solution that we need to do here, is to create yet another object here, and then, actually specify that these here are the values. And then, our message, all right? And so, this is actually how it really works. Okay, and so, that is a very nice, very handy validator that is automatically available on all strings, okay, so, don't try to use this one here on numbers, for example. This is only for strings. And, by the way this min and max here is actually not only for numbers, but it's also gonna work with dates, all right?

// Custom Validators: So sometimes the built-in validators are simply not enough. And in that case, we can also build our own custom validators. And a validator is actually really just a simple function which should return either true or false. And if it returns false, then it means there is an error. And on the other hand when we return true, then the validation is correct and the input can be accepted. Okay, so let's now build a simple custom validator here. And what I want to validate is if the price discount is actually lower than the price itself. That's something that we cannot do using the built-in validators and so we're simply gonna build our own. We need to now specify here an object for the SchemaType options. Alright. So the type is number, and then to specify our validator we use the validate property.

// Validate, and then as I said, a simple callback function. And again, not an arrow function, but a real function, because in this function we're gonna have access to the this variable, which will point to the current document. Now if you didn't need the this variable, then you could of course just use an arrow function. We have a callback function, and that callback function actually has access to the value that was inputted. So in this case, the price discount that the user specified. So that's what I call the value, val for short. Remember that we need to return either true or false from this validator. When do we want to return false, and when do we want to return true? Well, we want an error when the price discount is greater or equal than the price. And so basically what we want to return here is the test of testing if the value is less than this.price.

// Now, we do not have any custom message here and so let's quickly fix that. All right and the way we do that is in a very similar way as we did with the enum. So we need to actually specify another object and then set the message property. Validate should be an object and then we have our message in there and this function here will live in a property called validator. Okay and our message here will be (keyboard clacking) discount price should be below the regular price. And actually, one very nice trick is that this message here also has access to the value. And this works in kind of a weird way and this really is internal to Mongoose, so this has nothing to do with JavaScript so I can simply use the curly braces here and then value. So this piece here will get access to the value that was inputted, so it has the exact same value as this val variable.

// Now there is one very important caveat that we need to notice here and that is that inside a validator function, that this key word is only gonna point to the current document when we are creating a new document. So this function here is not going to work on update. And so that's very important to note. But also, there are a couple of libraries on npm for data validation that we can simply plug in here as custom validators that we do not have to write ourselves. And the most popular library is called validator. And the documentation is also gonna be there and so here you see that validator is a library of string validators and sanitizers. We also see this library validates and sanitize only strings. Here is then all of the stuff how we install it and how we use it but that's kind of simple.

// But what I want to show you is the list of all the available validators. For example, we have isAlpha, which is gonna check if the string contains only letters. And so you see, whenever you need some data validation you can grab one of these libraries and simply plug them into your Mongoose validators. Now many of the things that are here are actually already built into Mongoose and so we don't need all of them, okay, but there is one very specific, which I want to use, which is isAlpha. So I want to check if the tour name only contains letters. And so for that I can use this function from the validator library.

// I'm gonna use it here and again, I use the validate property and now all I need to do is to really plug in the function here. And in validator, it works like this, where validator is an object and on there we have then all these methods. Validator is Alpha, so that's the one that we just choose from the documentation. And that's actually it. So we don't call it here. We basically just specify that this is a function that should be used. Just like our own one, like our own validator, we didn't call it. We simply put this callback function here that it's gonna be called as soon as the data should be validated. And so here, it's the same. Now, if we wanna specify an error message, it works just like up here. We can specify an array and then the error message after the callback function. And we could have done it down here. So here we did it differently. Here we then created this new object with validator in there and the message, but we could've done it with an array as well, but that would've looked weird. So the problem was the spaces, but obviously we want to keep the spaces here. In fact, this validation error is not really useful and so I will get rid of it. Consider that this here was only to demonstrate that we can use an external library like this to perform validation.

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
