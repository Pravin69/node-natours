/* eslint-disable */

import 'core-js/stable';
import 'regenerator-runtime/runtime.js';

import { login, logout } from './login';
import { forgotPassword } from './forgotPassword';
import { resetPassword } from './resetPassword';
import { signUp } from './signUp';
import { updateSettings } from './updateSettings';
import { displayMap } from './mapbox';
import { bookTour } from './stripe';
import { showAlert } from './alert';

import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  auto as followSystemColorScheme,
  exportGeneratedCSS as collectCSS,
  isEnabled as isDarkReaderEnabled,
} from 'darkreader';

// DOM elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');

const signupForm = document.querySelector('.form--signup');

const resetPasswordForm = document.querySelector('.form--resetPassword');
const forgotPasswordForm = document.querySelector('.form--forgotPassword');

const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const fileInput = document.querySelector('.form__upload');
const bookBtn = document.getElementById('book-tour');

const darkModeButton = document.getElementById('dark-mode-button');

// Retrieve user preference from localStorage
const userPreference = localStorage.getItem('darkMode');

if (userPreference === 'enabled') {
  enableDarkMode({
    brightness: 100,
    contrast: 90,
    sepia: 10,
  });
  darkModeButton.classList.add('active');
}

darkModeButton.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
  //   console.log('Dark mode clicked');
  if (isDarkReaderEnabled()) {
    disableDarkMode();
    darkModeButton.classList.remove('active');
    // Remove user preference from localStorage
    localStorage.removeItem('darkMode');
  } else {
    enableDarkMode({
      brightness: 100,
      contrast: 90,
      sepia: 10,
    });
    darkModeButton.classList.add('active');
    // Save user preference to localStorage
    localStorage.setItem('darkMode', 'enabled');
  }
}

// Delegation
if (mapBox) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations,
  );

  displayMap(locations);
}

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    document.querySelector('.btn--green').textContent = 'Loading...';

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password_confirm = document.getElementById('password-confirm').value;
    await signUp(name, email, password, password_confirm);

    document.querySelector('.btn--green').textContent = 'Signup';
  });
}

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    await forgotPassword(email);
  });
}

if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const password_confirm = document.getElementById('password-confirm').value;

    const url = window.location.href;
    const regex = /\/resetPassword\/(.+)/;
    const match = url.match(regex);
    const token = match ? match[1] : null;

    //  console.log(token);

    await resetPassword(password, password_confirm, token);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

// Adding Image Uploads to Form: So let's now allow users to upload their photos right on our website. And so this is what we want. When we click here, we basically want to open a new window for which we can select a new image to upload and then when we click this button and submit a form of course then we want to upload that image into our backend and update the user, right. And so the first step into doing that will be to add a new input element to our html. So basically to our pug template which will then allow that file selector. So right now we have that link here which says new photo. But of course, it's not a link that we're going to use. So this was really just a placeholder. And so let's get rid of it. So what we need is an input of type file. We can then specify which kind of file we actually accept. And we can do something like this. Image and then all of them. So basically all formats get their images so which have a mimetype starting with image are accepted here. And now also giving it an ID so that we can then select it in java script. Add that as photo and finally just like the other fields, we also give it a name. So name of photo as well. And of course it is photo because that's the name that we have in our user document and it's also the field name that multer is expecting. So this here is upload and then we also specify a label for it. And we set it to the ID of the input element, all right. So the way it happens is that when we click this label here, it will then actually activate the input element which has the ID that we specify here in form. And so in that case that is the photo, all right. And so when we then click the label it will then activate this input which in turn will open up the window from which we can select a file. And so that's all we need to do for the input here. Now, just like before, there are two possible ways of sending this data to the server. So first, without the API as we did in one previous lecture. We already find the action that we want to take and also the method. And with that the data is then directly sent to the server. Now if we wanted to send a file using this method, we then would need to specify another option here.

// And that is the enc type. So enc type would have to be multi-part form data. So multi-part slash form data, all right. And so here again, we have this name multi-part. And so as we said before, multi-part is always for sending files to the server. And again we actually need the multer middleware to handle this multi-part form data, all right. And actually the name multer comes from multi-part. Anyway again if we wanted to send the data without an API, we would always have to specify this enc type. Otherwise the form would simply ignore the file and not send it, okay. But as we already know, we are actually using it with the API, right. And so we do not need to specify this enc type but we will kind of have to do it programmatically.And so we need to now open in our public folder and from their js, we open up index.js. And so right here is where we actually send the data to be updated on the server. Well we're not really sending them here but we're selecting them from the form and then passing them into update settings. All right, but now remember how I said that we kind of needed to programmatically recreate a multi-part form data? And so we need to do it like this. Let's call it form and then new form data. All right, and now onto that form we need to keep appending new data. And basically one append for each of the data that we want to send. So form.append and the first one is the name. So we specify name here and then the value of the name. We then pass the form, okay. And our ajax call using axios will then actually recognize this form here as an object and will work just the same as it did before, okay. So here in update settings where we pass in the data, which is then passed in here into the axios request, we do not need to change anything. All right, so this is equivalent to what we had before with name and email but now of course let's also add the photo which is the entire reason why we now have to do it like this.

// So form.append again then the name we want to give it is of course again, photo and then document .getelementbyid which is also photo but now it is not .value but instead .files, all right. And these files are actually in array and so since there's only one, we need to select that first element in the array and so that's zero. But in a nutshell, as I said before, we basically recreate this multi-part form data. And so that's actually why it's called form data is because, well, that form data is also here in this multi-part enc type, okay.

if (userDataForm) {
  userDataForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    //  const photo = document.getElementById('photo').files[0];

    //  Adding Image uploads to Form:
    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    //  form.append('photo', photo);

    await updateSettings(form, 'Data');

    //  const userUploadedFile = form.get('photo');

    //  if (userUploadedFile.type === 'image/jpeg') {
    //    userPhotoCurrent.setAttribute(
    //      'src',
    //      `img/users/${userUploadedFile.name}`,
    //    );
    //    userPhotoIconCurrent.setAttribute(
    //      'src',
    //      `img/users/${userUploadedFile.name}`,
    //    );
    //    console.log('👛', userUploadedFile, 'You have changed your picture');
    //  }
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let btnText = document.querySelector('.btn--save-password');

    btnText.textContent = 'Updating...';
    let passwordCurrent = document.getElementById('password-current').value;
    let password = document.getElementById('password').value;
    let passwordConfirm = document.getElementById('password-confirm').value;

    updateSettings({ passwordCurrent, password, passwordConfirm }, 'Password');

    btnText.textContent = 'Save password';
    userPasswordForm.reset();
  });
}

// In Jonas solution there is the problem we discuss here: The page does not show an image preview, after the user selected an image in the file explorer. The user could think "Oh man, this page is not working as expected" and leaves without clicking "Save settings". Because of this I think it would be right to use the approach of adding an extra event listener like @CatNug did, as this event listener only will be initialized, if an element with class .form__upload exists. Instead of requiring the user to press "Save Settings" after choosing a photo, we can immediatly update the user photo through an API Call and use the updated photo in our response, to show it (this way, the preview will look equal to the image uploaded to our server). Doing it this way, I have to mention that we should not send the whole user data in our request, as this could also lead to potential errors and seperate them instead (like we already do with updating password).
if (fileInput)
  fileInput.addEventListener('change', async (e) => {
    const form = new FormData();
    form.append('photo', document.getElementById('photo').files[0]);

    // Take care of the type attribute being photo
    const newImage = await updateSettings(form, 'Photo');

    if (newImage) {
      document
        .querySelector('.nav__user-img')
        .setAttribute('src', `/img/users/${newImage}`);
      document
        .querySelector('.form__user-photo')
        .setAttribute('src', `/img/users/${newImage}`);
    }
  });

// Preview for the selected photo
// const filetag = document.querySelector('#photo');
// const preview = document.querySelector('.form__user-photo');
// const readURL = (input) => {
//   if (input.files && input.files[0]) {
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       preview.setAttribute('src', e.target.result);
//     };

//     reader.readAsDataURL(input.files[0]);
//   }
// };

// if (filetag && preview) {
//   filetag.addEventListener('change', function () {
//     readURL(this);
//   });
// }

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}

const alertMessage = document.querySelector('body').dataset.alert;

if (alertMessage) showAlert('success', alertMessage);
