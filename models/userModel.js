const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [false, 'Please provide a password'],
    minlength: 8,
    // Where we signed up for a new account. And so you see here that in the user output, we actually get the password, okay? It is encrypted actually, but still, it's not a good practice to leak the password data out to the client, okay? And so fixing it is actually quite easy, because we did it before. All we have to do is to say password, and then select and set it to false. And so like this it will automatically never show up in any output.
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE of Doc Obj!!!
      validator: function (el) {
        return el === this.password;
      },
      message: ' Passwords are not the same',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Managing Passwords: We're gonna manage our users passwords in the database. And by that I mean to first validate if the inputted password is equal to the confirmed password and then also to encrypt the password in the database in order to secure it against attacks. And so the first thing that we're gonna do is to validate if the two inputted passwords are the same. And the best place to do that is here in the confirm password, okay? And so let's write our custom validator for that, all right?

// So, very simple, but we need to keep in mind that this is only gonna work on save, okay? And for this reason, whenever we want to update a user, we will always have to use save as well and not, for example, find one and update like we did with our tours, okay? So let's keep this in mind when we write the rest of the code throughout the rest of the section and especially for updating, okay? Because let's say that we updated the user's password simply with a regular update. Then in that case, this password confirm validation that we have here would no longer work, okay? And of course that cannot happen, okay? And so, again, keep in mind that this will only work when we create a new object, so on dot create, or on save.

// But now, the next step is to actually encrypt these plain passwords that we are storing in our database right now. So, as I mentioned in the last video, when we are working with authentication, one of the most fundamental principles is to never ever store plain passwords in a database, okay? So that is something that's absolutely not acceptable, okay? So we should really always encrypt user's passwords because imagine that for some reason, a hacker gets access to the database. If then the passwords are stored in plain text in there, then he can simply login as any user and then do whatever he really wants and cause a lot of damage in some cases, okay? And so we need to absolutely prevent that. And so let's now go ahead and implement this. Now, where is the best place to actually do that? Well, I would argue that the model is always the best place to do this kind of functionality. So in this case, the encryption because it really has to do with the data itself and so it should be on the model and not in the controller, okay? So again, keep the fat models, thin controllers philosophy in mind here. All right? So how are we gonna now implement this encryption? Well, this is another perfect use case for using Mongoose middleware. And the one that we're gonna use is a pre-save middleware. So basically document middleware, okay? So, remember that we defined that on the schema, okay? And in this case, we want to set a pre-hook, so a pre-middleware on save, all right? so a pre-middleware on save, all right? And the reason why we're doing it like this is that the middleware function that we're gonna specify here, so the encryption, is then gonna be happened between the moment that we receive that data and the moment where it's actually persisted to the database, okay? So that's where the pre-save middleware runs. Between getting the data and saving it to the database. And so that's the perfect time to manipulate the data.

// So, a function, and then remember we have access to the next function in order to call the next middleware. Okay, now we actually only want to encrypt the password if the password field has actually been updated, okay? So basically only when really the password is changed or also when it's created new, all right? Because imagine the user is only updating the email. Then in that case, of course, we do not want to encrypt the password again, right? And so we can do that with Mongoose. And so we're gonna say, if and then this, which refers to the current document, right? And so in this case, to the current user and then is modified. Okay? So we have a method on all documents which we can use if a certain field has been modified. And so here, we need to pass in the name of the field, so "password." Okay? And so basically, what we want to do here is to say that if the password has not been modified, so not, then in that case, let's simply return from this function and not run any of the other code that's in here and then call the next middleware.

// And so now it's finally time to actually encrypt, or as we can also say, to hash the password, okay? So you will see the term "hash" or "hashing" all the time and so that basically means encryption as well, okay? Now we are gonna do this encryption, or hashing, using a very well-known and well-studied and very popular hashing algorithm called bcrypt. Okay? So this algorithm will first salt then hash our password in order to make it really strong to protect it against bruteforce attacks, all right? And so that's the whole reason why encryption needs to be really strong. Because bruteforce attacks could try to guess a certain passwords if it's not really strong encrypted. And remember how I said that bcrypt will salt our password and that just means that it's gonna add a random string to the password so that two equal passwords do not generate the same hash, okay?

// In order to use this algorithm. So, npm install bcryptjs. So, we want to say that this dot password, so the current password in this document should be equal to bcrypt dot hash and then our current password. Okay? And then in here we need to specify a cost parameter, okay? And we could actually do this in two ways. So the first way will to be manually generating the salt, so that random string basically, that is gonna be added to our password and then use that salt here in this hash function. All right? But instead, to make it a bit easier, we can also simply pass a cost parameter into this function here. And so that is basically a measure of how CPU intensive this operation will be, all right? And the default value here I believe is 10, but right now it's a bit better actually to use 12 because computers have become more and more powerful. So like 20 years ago, you could have used eight here and then a bit later than 10, but right now at this point in time, it's best to use 12. And so the higher this cost here, basically the more CPU intensive the process will be and the better the password will be encrypted, okay?

// So with this, we encrypted our password and now in the end, what we need to do is to basically delete the confirm password, all right? Because at this point in time, we only have the real password hashed, right? So, this dot password confirm, and how we basically delete the field, so not to be persisted in the database is to set it to undefined. All right? So, we really only need this password confirm here for the validation that we implemented before. So just to make sure that the user actually inputted two equal passwords so that he doesn't make any mistakes with his password. Right? And so after this validation was successful, we actually no longer need this field so we really do not want to persist it to the database. And so that's why we simply set it here to undefined. All right? Now you might wonder why this works because we actually set password confirm to a required, right? But that simply means that it's a required input, not that it's required to actually be persisted to the database, okay? to the database, okay? Now, just to finish, we of course need to also call next.

userSchema.pre('save', async function (next) {
  //  Only run this function if the password was actually modified or the user is created new
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

userSchema.pre(/^find/, function (next) {
  // This points to current query
  this.find({ active: { $ne: false } });
  next();
});

// Password Compare Func: And so now it's time to actually compare the passwords that we have in the database with the one that the user just posted. But how are we gonna do that? Because for example, the password might be, or is in this example, pass1234, but the one that we have stored in the document looks like this. So how are we gonna compare this? There's not really a way of doing it, right? But actually there is, all we have to do is to again use the bcrypt package, okay? So we used bcrypt to generate this hashed password, and we can also use the same package to basically compare an original password like this here with the hashed password. Of course this password here, since it's encrypted, there's no way of getting back the old, so the original password from this string, right? So that's the entire point of actually encrypting a password. And so the only way of doing it is for this package for this algorithm to actually encrypt this password as well, and then compare it with the encrypted one, all right? So let's implement a function that's gonna do that, and for that we will use, again, the bcrypt package. And we will do that in the user model. And you might ask "Why we're doing it in a model "and not just here," but that's, again, because this is really related to the data itself. And also we already have that package in there, and so it's easier to simply do it there.

// So for the first time now we're gonna create something called an instance method. So an instance method is basically a method that is gonna be available on all documents of a certain collection, okay? And it works like this. So again, it's defined on a userSchema, and then we say methods, and now in this case we want to call the function correctPassword, all right? So function, now this function is gonna accept a candidatePassword, so the password that the user passes in the body, and then also the userPassword, okay? Now inside of these instanced methods, since they are available on the document, the this keyword actually points to the current document. But in this case, since we have the password set to select false, so this here, remember? Okay, and because of that, this.password will not be available. So ideally we would do it like this, and so this way we would only need to pass in the candidatePassword and not the userPassword. But again, right now that's not possible because the password is not available in the output. And so that's why we actually have to pass in userPassword as well. So the goal of this function is to really only return true or false. So basically true if the passwords are the same, and false if not. So return, and then bcrypt which we already know, and then we are gonna use the compare function, okay? And the compare function is really easy, all we need is to pass in the candidatePassword and the userPassword, not userSchema, userPassword, okay? And just like the hash function up here, this one is also an asynchronous function. And so just like before we use await, and then here async. Okay, make sense? So again, this compare function here will very simply return true if these two passwords here are the same, and false if not.
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    // console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  // False means not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
