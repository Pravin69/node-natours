# Natours

## An Awesome Tour Booking Site Built on Top of NodeJS

### Deployed Version

Live demo (Feel free to visit) 👉 : [Natours](https://node-natours-cnfv.onrender.com/)

### Key Features

- Authentication and Authorization
- Sign up with Email Verification
- Login and Logout
- Forget Password and Reset Password
- Tour Booking Management
- Interactive Tour Map with User Reviews and Ratings
- User Profile Customization
- Secure Credit Card Payment
- Dark Mode for Enhanced User Experience

### Demonstration

#### Home Page:

![image](https://github.com/Ahmedhossamdev/Natours/assets/99441866/758823b1-d1a4-4e66-9a69-fd77d0abe10e)
![image](https://github.com/Ahmedhossamdev/Natours/assets/99441866/b633488b-892b-4cb6-95d0-35d5ceebfdfb)

#### Tour Details:

![Alt Text](https://media.giphy.com/media/WvDmEEE3AWihilAgze/giphy.gif)

#### Payment Process:

![Alt Text](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmR6MGJsb3FxMms4emw5NjI2d3k4cmtmenVqZGczMTY3eXMyaWlyayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IlkchDlYu2ToQA0R8r/giphy.gif)

#### Booked Tours:

![image](https://github.com/Ahmedhossamdev/Natours/assets/99441866/4a5b3780-c716-46bf-9df6-c9d522c81f5c)

#### User Profile:

![image](https://github.com/Ahmedhossamdev/Natours/assets/99441866/9f5a1baa-c3fd-4e27-9250-6f51313e553c)

## How To Use

1. Book a tour
2. Login to the site
3. Search for tours that you want to book
4. Proceed to the payment checkout page
5. Enter the card details (Test Mood):
   - Card No. : 4242 4242 4242 4242
   - Expiry date: 02 / 22
   - CVV: 222
6. Finished!
7. Manage your booking
8. Check the tour you have booked in the "Manage Booking" page in your user settings. You'll be automatically redirected to this page after you have completed the booking.
9. Update your profile
10. You can update your own username, profile photo, email, and password.

### API Usage

Before using the API, you need to set the variables in Postman depending on your environment (development or production). Simply add:

- `{{URL}}` with your hostname as the value (Eg. http://127.0.0.1:3000 or http://www.example.com)
- `{{password}}` with your user password as the value.
  Check Natours API Documentation for more info:

API Features:

- Tours List 👉 [Tours](https://node-natours-cnfv.onrender.com/api/v1/tours)
- Tours State 👉 [Tour Stats](https://node-natours-cnfv.onrender.com/v1/tours/tour-stats)
- Get Top 5 Cheap Tours 👉 [Top 5 Cheap Tours](https://node-natours-cnfv.onrender.com/api/v1/tours/top-5-cheap)
- Get Tours Within Radius 👉 [Tours Within Radius](https://node-natours-cnfv.onrender.com/api/v1/tours/tours-within/200/center/34.098453,-118.096327/unit/mi)

### Deployment

The website is deployed with Git into render:
https://node-natours-cnfv.onrender.com/
