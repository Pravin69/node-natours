// Reafactoring APIFeatures: And so, what I'm going to do is to, now, create a class in which I'm going to add one method for each of these API features or functionalities, as you might call them as well and then, later on, I'm actually going to export it to its own file, basically, to create a reusable module that we can, later on, import into other controllers. Then, we start with our constructor function and remember that this is the function that gets automatically called as soon as we create a new object out of this class, all right. Now, what do I actually want in these API features? Actually, I'm going to parse in two variables here, okay? So the mongoose query and also the queryString that we get from express. So, basically, coming from the route, all right. So that's what we usually have access to in the req.query, okay. Now, again, I'm passing the query here because I do not want to query inside of this class because that would then bounce this class to the tour resource but, again, I want this to be as reusable as possible.

// And so, what I can do now is to create a variable called Features, for example. And then from here, I will create a new API features object. Okay? So, basically, creating an instance of this API features that will then get stored into Features. And this here, we'll, then, have access to all the methods that we're going to define in the class definition. So, remember, in here, we need to pass a query and the queryString. So, the query, how do we create one? Remember, it's Tour.find. So, there's a query object and so, that's the one that we parsed into this class and then, of course, the queryString which is req.query.

// Okay, now, the goal here is to basically chain these methods here one after another. So let me show that to you here. So we have filter and then, after that, we want to chain the sort method. Now, right now, that is not really going to work because where are we actually chaining this sort on? So, basically, we're trying to call it on the result of this but, right now, what is the result of this? Well, it's not really anything because this filter method here doesn't return anything, right? Now, this piece of code here, of course, returns the object that has just been created and so, then, we can chain the filter method on that. But the filter method, in turn, does not return anything. And so, at this point, we cannot really call a sort on the object, right? And so, the simple solution to that, and maybe you've done it earlier sometime in your code, is that we have to now return this. So, return this and this is simply the entire object, okay.

// Okay, so, just to recap: We are creating a new object of the API features class. In there, we are parsing a query object and the query string that's coming from express. Okay? Then, in each of these four methods here that we call one after another, we, basically, manipulate the query. We keep adding more methods to it just like we've been doing up here before we did any of this refactoring, right. So, we keep adding stuff to the query here until the end, and then, by the end, we simply await the result that query so that it can come back with all the documents that were selected, okay? And that query now lives at features which is this object here. So features.query.

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryStr = JSON.parse(queryStr);

    this.query = this.query.find(queryStr);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt _id');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
