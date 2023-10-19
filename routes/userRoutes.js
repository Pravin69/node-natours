const express = require('express');
const multer = require('multer');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const { getAllUsers, createUser, getUser, updateUser, deleteUser } =
  userController;

// Image uploads using Multer: Now we're gonna be working on uploading user photos. So, Multer is a very popular middleware to handle multi-part form data, which is a form encoding that's used to upload files from a form. So remember how in the last section we used a URL encoded form in order to update user data and for that we also had to include a special middleware. And so Multer is basically a middleware for multi-part form data. And now here is what we're gonna do. We will allow the user to upload a photo on the Update Me route and so instead of just being able to update email and photo, users will then also be able to upload their user photos. So once more, let's start by installing the package. So, easy and now we need to configure a so called Multer upload and then use it. And let's do that right here at the beginning and let's call it Upload and we call the Multer function that we just included before and then pass in an object for some options. And for now the only option that we're gonna specify is the destination and I'm gonna set it to Public/image/users, all right. And so that is exactly the folder where we want to save all the images that are being uploaded. I really want you to just introduce to this package and by the way, we could actually just have called the Multer function without any options in there.

// So without this here and then the uploaded image would simply be stored in memory and not saved anywhere to the disc but of course at this point that's not what we want and so we at least need to specify this destination option. And with this our file is then really uploaded into a directory in our file system. And I mentioned this before but let's just make really sure that we're on the same page about this, which is that of course images are not directly uploaded into the database, we just upload them into our file system and then in the database we put a link basically to that image. So in this case in each user document we will have to name all of the uploaded file, okay. Now again, we're not doing that in this video but we will do a bit later. Anyway, what we need to do now is to use this upload here to really create a middleware function that we can put here into the Update Me route. So here, and it works like this. So upload, dot single, and it's single because here we only want to update one single image and then here into single we pass the name of the field that is going to hold the image to upload. And so that will be photo, okay. And with field I mean the field in the form that is going to be uploading the image. So again, we included the Multer package and then with that we created an upload. And this upload is just to define a couple of settings where in this example we only define the destination then we use that upload to create a new middleware that we can then add to this stack of the route that we want to use to upload the file.

// So for that we say upload dot single because we only have one single file and then finally we specify the name of the field that is going to hold this file. Okay, and so this middleware will then take care of taking the file and basically copying it to the destination that we specified. And then after that of course it will call the next middleware in the stack which is Update Me. Also, this middleware here will put the file or at least some information about the file on the request object and so let's actually take a look at that. All right, we were successful and of course as I said before the photo did obviously not update here in the database output because that's for the next lecture. All right, now let's also take a look here at our output and so here we have request dot file, which is this one, and so we get all kinds of information about it. So the original name, it's destination that we specified, the new file name here, and also the size. Okay, so that is request dot file and then remember we also logged the body. And so the body is now only the name, all right. So our body parse is not really able to handle files and so that's why the file is not showing up in the body at all and of course that is the whole reason why we actually need the Multer package.
// const upload = multer({ dest: 'public/img/users' });

// USERS Resource
// const userRouter = express.Router();
const router = express.Router();

// userAuthentication Routes : And as I mentioned right in the beginning of this video, the user resource is a bit different from all the other resources. Again, because it really has to do with all things authentication. And so we have a different controller for that so the authController, the function names also have some different names, and so we will actually also have a special route. So as you see, the signup is really kind of a special endpoint. It doesn't fit the REST architecture that we talked about before, because in this case it doesn't make much sense. And so remember how we said that in some special cases, we of course can create other endpoints that do not 100% fit that REST philosophy that is basically implemented here.

// And also down here we have implemented all of these different HTTP verbs but in here for signup, we only really need POST. So we cannot really get data from signup, or we cannot patch patch a signup, so not update it. Doesn't really make sense, and so in this case all we want to do is to have a route for signup, where we can only POST data. Because again, it makes only sense to actually send data to this route, so that the new user is then created. And we will have different routes similar to this one, like for login, or for reset password, and all kinds of stuff like that.

// In the section where you are creating users, you used router.post("/signup). Why didn't you use router.route("/signup").post(authController.signUp) ?

// Its not necessary in case of the /signup to add a route method cause we ae not going to add any more verbs like get or/and patch etc with the/signup route. Unlike the '/' route or /:id  route
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

router.get('/me', userController.getMe, userController.getUser);

// router.patch('/updateMe', upload.single('photo'), userController.updateMe);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe,
);
router.delete('/deleteMe', userController.deleteMe);

// Only admins can perform below actions after this middleware
router.use(authController.restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
