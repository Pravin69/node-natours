const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const util = require('util');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

// Configuring Multer: Let's now actually configure Multer to our needs. First giving images a better filename, then second allowing only image files to be uploaded onto our server. Great, and so now let's actually go ahead and configure our Multer upload to our needs. And so for that we are going to create one Multer storage and one Multer filter, all right? And then we're going to use that storage and the filter to then create the upload from there, all right? So a multerStorage, we use multer.diskStorage. All right, and we could also choose to store the file in memory as a buffer, so that we could then use it later by other processes. And actually we're gonna do that a bit later, but for now of course we want to really store the file as it is in our file system, okay? So for disk storage we'll take a couple of options, and the first one is the destination. But now we cannot simply set it to this path like we did before. No, this is a bit more complex, all right? And so really this destination here is a callback function which goes like this. So this callback function has access to the current request, to the currently uploaded file, and also to a callback function. And this callback function is a bit like the next function in Express. But I'm calling it cb here, which stands for callback, so that it's a different name than next, because actually it doesn't come from Express, okay? But it's similar in that we can pass errors in here and other stuff, as you will see in a second.

// So to now define the destination, we actually need to call that callback. So callback, and then the first argument is an error if there is one. And if not, then just null. And the second argument is then the actual destination. But for now I want to now set the filename property. So not that, simply filename. And again, that's a very similar callback function with a similar signature, request, file and callback. And now we want to give our files some unique filenames. And the way I'm going to do that is to call them user-userid- the current timestamp. All right, so first of all, let's actually extract the filename from the uploaded file. And how do we get that? So here it is, so remember that this object here was request.file, and so that is exactly what this file here is, okay? And so here we have the mimetype, and so that JPEG is stored right here, okay? And so this is where we're gonna get the file extension from. And so now just like before, we need to call the callback function with no error, and then the filename that we want to specify. And so basically a complete definition of how we want to store our files, with the destination and the filename. Next up, let's create a Multer filter. So let's call it exactly that. And the filter in Multer is simply, again, a callback function, similar to the ones we had before, accessing the request, file, and a callback function. And in this function, the goal is basically to test if the uploaded file is an image. And if it is so, then we pass true into the callback function, and if it's not we pass false into the callback function, along with an error.Now again, in this case we are really talking about images, and so let's test if the uploaded file is an image. And for that we will once more use the mimetype, because whatever image type is uploaded, so no matter if it's a JPEG, or a PNG, or a bitmap, or a TIFF, or really anything, the mimetype will always start with image. And so now we can test for that.

// So perfect, all of our Multer configuration now works really fine, but of course there's still one step missing. And that is to actually link the user to the newly-updated image, right? Because right now in the database, we obviously still have the path, or actually the name of the old image, because nowhere in our code we specified that we wanted to update the user document itself, right? And so let's fix that in the next
// const multerSrorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },

//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

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

exports.uploadUserPhoto = upload.single('photo');

// Image Processing: So everywhere in our user interface we assume that the uploaded images are squares. So that we can then display them as circles like this. And so this only works when they are squares, but of course in the real world users are rarely going to be uploading images that are squares. And so our job now is to actually resize images to make them squares. Alright, and so here is how we're gonna do that. We will add yet another middleware before the update me and then that middleware will take care of the actual image processing. And so at this point we already have the file on our request. At least if there was an upload, and if there was no upload, then of course we don't want to do anything. So that means that we want to go to the next middleware. So if there is no file on the request then return right away and go to next. Okay, but otherwise we of course, then want to do that image resizing. And for that, we are going to use the sharp package. Alright. So, well first of all let's actually install it. And sharp is a really nice and easy to use image processing library for Node Js And there's fairly a lot of stuff that we can do with it. But where it really shines is for resizing images in a very simple way. So, we say sharp and then here we basically need to pass in the file. Now, when doing image processing like this right after uploading a file, then it's always best to not even save the file to the disk, but instead save it to memory. We already talked about that before, and so that's now actually do that in practice. Okay, so for that we need to change a little bit or multer configuration and actually just this multer storage, because now we no longer need any of this. And instead to multer storage, will be simply multer dot memory storage. And just like this, okay? And so as I mentioned earlier, this way the image will then be stored as a buffer.

// And so that buffer is then available at request dot file dot buffer and so this is way more efficient like this, so instead of having to write the file to the disk and then here read it again. We simply keep the image basically in memory and then here we can read that, alright? Anyway, calling the sharp function like this here will then create an object on which we can chain multiple methods in order to do our image processing. And so the first one that we're going to do is resize. So, resize, and then here we can specify the width and the height. Because what I want to do next is actually convert the images always to jpeg, okay? And for that, we use to format, and then jpeg. We can also then define the quality of this jpeg. So basically to compress it a little bit so that it doesn't take up so much space and so for that, we use the jpeg method, and set an option in this object with quality and let's say 90 percent here, alright? Because now, in the end, we then, finally want to write it to a file on our disk. And so for that, we can use to file, now this method here actually needs the entire path to the file. So basically public images, slash, users, and then finally here the file name, alright? But actually I will not put it right here. Instead, I will actually save it to request dot file dot file name. Now why am I doing it like this? Well it's because right now this file name is not defined. So, when we decide to save the image into memory so as a buffer, the file name will not really get set, but we really need that file name in our other middleware function, right? So that's down here in update me right here. So we rely on request dot file dot file name in order to save the file name into our database, right? And so actually, we should define that. And so, previously it was of course defined by the multer upload that we had, but since that is gone now, we should then basically redefine it here. So all we need to do now to finish is to then actually call the next middleware in the stack. And so that will be the update me handler function.

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

// exports.getAllUsers = catchAsync(async (req, res, next) => {
//   const users = await User.find();

//   res.status(200).json({
//     status: 'success',
//     results: users.length,
//     data: {
//       users,
//     },
//   });
// });

const deleteUserPhotoServer = async (photo) => {
  if (photo.startsWith('default')) return;

  const path = `${__dirname}/../public/img/users/${photo}`;
  const unlink = util.promisify(fs.unlink);

  try {
    await unlink(path);
  } catch (error) {
    console.log(error);
  }
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Updating current user data: In this lecture, we will allow the currently logged in user to manipulate his user data. And so now, by implementing user updates, we're really leaving the domain of authentication and are moving more into real user related stuff, okay? And so instead of using the authentication controller now, let's implement this updating functionality right in their userController. And we are actually doing this, so updating the user data, in a different route than updating the user password, well because usually in a typical web application that's always how it's done. So you have usually one place where you can update your password and then another place where you can update data about the user or the account itself. And so here, we're just basically following that pattern. And so all of this is of course really secure, again because the ID of the user that is gonna be updated come from request.user, which was set by this protect middleware here, which in turn got the idea from the json web token, and since no one can change the ID in that json web token without knowing the secret, well we know that the ID is then safe because of that. And so because of this, everything here is safe. So updating the user document, and we could try to do it with user.safe. So just like before, basically getting the user then updating the properties, and then by the end, saving the document. But the problem with that is that there are some fields that are required which we're not updating, and then because of that, we will some error. So findbyId, so request.user as we already know, .id. And then let's say, user.name = 'Jonas' and then await user.save. But again you see that this will give us an error then. and indeed we get: "Please confirm your password". And so that's because passwordConfirm is a required field but we did of course not specify it. And so the safe method is not really the correct option in this case. So instead what we can do now is to actually use findById and update. So we could not use that before for all the reasons that I explained to you multiple times by now. But now since we're not dealing with passwords, but only with this non-sensitive data like name or email, we can now use findById and update. Let's also call it here updatedUser. And then in here, we need to pass not only the ID, but also the data that should be updated, and then some options.

// And so that's just like before, the new option set to true, so that it returns the new object, so basically the updated object instead of the old one. And the also runValidators set to true. Because indeed we want the models to validate our document. So for example, if we put in an invalid email address, that should be catched by the Validator and return an error. Well that's because we actually do not want to update everything that's in the body, because let's say the user puts, in the body, the role for example. We could have body.role set to admin for example, and so this would then allow any user to change the role, for example, to administrator. And of course that can not be allowed. Or the user could also change their reset token, or when that reset token expires, and all of that should not be allowed of course. So doing something like this would of course be a huge mistake. And so we need to make sure that the object that we pass here, so again that object that will contain the data that's gonna be updated, only contains name and email, because for now these are the only fields that we want to allow to update. And so basically we want to filter the body so that in the end, it only contains name and email and nothing else. So if then the user tries to change the role, that will then be filtered out so that it never finds its way to our database. So what we want to do is to basically create a variable and let's say filteredBody, and then we're gonna create function in a second, but let's just already use it here, just so you see how it's gonna work. And then in here we pass the data, so the object that we want to filter, so req.body, because that's where all the data is, and then we pass a couple of arguments. One for each of the fields that we want to keep in the object. So we want to keep the field called name, and the field called email. And again, a bit later we might then add more fields here, for example later we might allow the user to upload an image. And of course that we then also need to update in the database. But for now, all we want to keep in the body is name and email and filter out all the rest. And so here, let's now use filteredBody. So let's do that here. FilterObj, which will take in an object and then the rest parameters for all the allowed fields. And so this will then basically create an array containing all of the arguments that we passed in. So basically that were passed in after this first one.

// So in that case, it is an array containing name and email. So what we need to do now is basically to loop through the object and for each element check if it's one of the allowed fields, and if it is, simply add it to a new object, that we're then gonna return in the end. So we're gonna loop the object by saying Object.keys of the object that we pass in. So that's one of the easy ways to loop through an object in JavaScript. So, this here then basically returns an array containing all the key names, so the field names of this object, and then we can loop through them. Then our callback function. And for each element, this is what we're gonna do. So, if the allowed field array includes the current element, so the current field name, then we want to add that to a new object.so const newObj which is empty for now, and in the end, that's the one that we're gonna return. So newObj. So if the current field is one of the allowed fields, well then newObj with the field name of the current field, should be equal to whatever is in the object at the current element, so the current field name. So again, all we do here is to basically loop through all the fields that are in the object and then for each field, we check if it's one of the allowed fields. And if it is, then we create a new field in the new object, of course with the same name, so still name element, with the exact same value as it has in the original object. And then in the end of course, we return that one. Then all we need to do in the end is to send that updated user to the client.
exports.updateMe = catchAsync(async (req, res, next) => {
  //   console.log(req.file);

  // 1) Create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400,
      ),
    );
  }

  // 2) Filtered out unwanted fields names that are not alllowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  // Saving image name to Database: Let's now, just very quickly, save the actual name of the uploaded image to the corresponding updated user document. And doing that is actually pretty simple. So let's go here to the update me middleware, and the data that gets updated is here stored in this filtered body object, right? And remember that this object here is the result of filtering the request.body, leaving only the name and the email, right? Now, adding the photo to that as well is really simple. All we have to do is something like this. So, if there is request.file, well then, filteredBody.photo, which remember, is the name of the field which holds the photo, is going to be equal to request.file, and then it is .filename. So what we have here, right? Remember, that we only really store the image name to our documents, and not the entire path to the image. And so that's exactly what we want here. So, what happens when we create a new user? They will not have any photo in the beginning, right? And so let's actually change that. Oka, and for that we have a default image here, which is basically going to be this one. So, let's go to the user model. And so here, in the photo, let's now define a default, okay. So here we need to create an object. And now the default we want to be default.jpg. Now, what if the user actually uploads a super large image. Let's say 10,000 per 10,000 pixels, or even an image that is not a square at all. Well, in that case, we need to resize the image, and also format the image really to fit our needs in our application. And so that is what we will do next.
  if (req.file) filteredBody.photo = req.file.filename;

  // delete the old photo in the server
  if (req.file) await deleteUserPhotoServer(req.user.photo);

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// Deleting the Current User : So after updating, let's now also allow the current user to basically delete his account. Now when a user decides to delete his account, we actually do not delete that document from the database. But instead we actually just set the account to inactive. So that the user might at some point in the future reactivate the account and also so that we still can basically access the account in the future, even if officially, let's say it has been deleted. Okay? So to implement this, first of all we need to create a new property in our schema. And now we want to have a field called active. Okay. Which should be of the type Boolean. Okay, and by default it's gonna be true. So any user that is created new is of course an active user and so the Boolean is set to true. Also, we do not want to show this in the output, okay. Because we basically want to hide this implementation detail from the user. Okay? And so we don't want anyone to know that this flag, so this active flag is here, okay. So we say select, and set it to false, all right. And so, to delete the user now, all we need to do is basically set that active flag to false. Okay, and again, of course there's only works for logged in users and so the user ID is conveniently stored at request .user.id. and the data that we want to update is simply active and set it to false. All right. Now sending back the response is also pretty easy. We use the 204 code for deleted which will then make it so that actually in Postman we do not even see this response, okay. But we still send it along with the request 'cause that's always the best practice. All right, and now of course add it also to all routes here. So that's pretty similar.

// So deleteMe then here deleteMe as well and now actually we are using the delete http method. Okay, and again, we will not actually delete a user from the database. But as long as the user is no longer accessible anywhere then it's still okay to use this http method here. So active is only visible for us here in compass but not for the user. Now as a last step, we then of course do not want to show up the inactive users in this output, right. And how do you think we could implement this? Well we're gonna use something that is way back that we talked about like two or three sections ago which is query middleware, okay. So query middleware is perfect for this because now we can basically add a step before any other query that we're doing then somewhere in our application. So let's go to our user model here and add that middleware here. So userSchema .pre, so something that will happen before a query and that query will be a find. Okay, so this is what makes this query middleware. And remember that here we actually used a regular expression before basically to say that we want this middleware function to apply to every query that starts with find. So not just find but also stuff like find and update, find and delete, and all queries like that. Okay, and so we use a regular expression looking for words or strings that start with find. Okay, so remember this is query middleware and so therefore this points to the current query. So we have our get all users here and here of course we have a find query. And now before that query is actually executed we want to add something to it. Which is that we only want to find documents which have the active property set to true.

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Adding /me endpoint: It's a good practice to implement a slash me endpoint in any API. So, basically, an endpoint where a user can retrieve his own data, all right? And so basically it's gonna be something very similar to these updateme and deleteme endpoints that we already have, right? Now, we still actually want to use the getOne factory function, so basically, uh, this one here, right? Because otherwise it would be very, very similar code to this one. Now, the only problem with this is that getOne basically uses the ID coming from the parameter in order to get the requested document. But, what we want to do now is to basically get the document based on the current user ID, so the ID coming from the currently logged in user, okay? And so that way we don't have to pass in any ID as a URL parameter, right? So, how can we do that? Well, very simple. All we will do here is a very simple middleware, which is gonna go like this. So as always, request, response, next, and then all we're gonna do is to say request, dot params, dot ID, which remember, is what the getOne is going to use, and tell it equal to request dot user dot ID. And that's it! All right? And so we will then add this middleware here before calling getOne.
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.createUser = (req, res) => {
  // 500 status for internal server error
  res.status(500).json({
    status: 'error',
    message: 'This route has not defined yet! Please use /signup instead',
  });
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

// Do not update password with this!!
exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);
