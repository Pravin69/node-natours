const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

// Building a Complex Email Handler: And what we're gonna do is to build email templates with pug and sending real emails using the SendGrid service. And now in this first lecture, we're gonna build a more robust email handler than the one that we had before. So what I'm gonna do is to create a class, and that class is gonna be called email. So module.exports, and so also this class is what we're going to be exporting from this file. And then as always, a class needs a constructor function, which is basically the function that is gonna be running when a new object is created through this class. And so the idea, basically, whenever we want to send a new email So creating a new email, and then into it, we want to paste a user, and so that user will then contain the email address, and also the name in case we want to personalize the email. And also a URL. And a good example for this one is for example, the reset URL for resetting the password. So, a new email object, and then on there we want to call the method that is actually going to send the email. So, let's say sendWelcome. And so that one is gonna be sent whenever a new user signs up for our application. We will then also have send password reset. And the way we will set all this up will make it really easy to then keep adding new and new methods similar to this one to send different emails for different scenarios. Anyway, since we paste the user and the URL into a new email, well, our constructor then needs to take these in as arguments.

// So user and URL. And so what happens in this constructor is that this.to will be equal to the user.email Then we also want to define the first name of the user, again in order to basically personalize the email. So we did this one before, but then also this.url is equal to the incoming URL. Finally, let's also set this.from right here. so basically at the object level. And so each object created from this class will then get this property. Now one thing that I really want to do, is to basically define this email address here as a configuration variable, and so an environment variable that we can very easily change by manipulating the config.env file. So let's call this one EMAIL_FROM. Next up, let's create a method here in order to create the transport. So similar to what we have here. So createTransport. And now here we actually want to have different transports whether we are in production or not. So when we're in production, we actually want to send real emails, and we will do that a bit later using SendGrid, but if we are not in production then we still want to use our Mailtrap application just like we did it before when we send emails. So instead of the email going to a real email address, it will get caught into our Mailtrap inbox so that we can actually take a look at it in our development process. And then basically otherwise we want to return this nodemailer.createTransport. Okay? So this Transport here will basically return a new nodemailer transport like this. And now let's create the send method. And so this is gonna be the method that will do the actual sending. Okay? And this one will receive a template and a subject. So, remember how we said up here that we're gonna have one method called sendWelcome, and also like a method for sending a reset password email.

// And so, let's now actually add that here, so sendWelcome. And this one doesn't receive any argument and all it really does is to call send with the template and the subject that we want for this email. And so again, this makes it really easy to then create different emails for all kinds of different situations. Okay? So we have this one route send function here and then all of these more specific ones, which will then in turn call the send function which is doing the actual work. Then here we paste in the template name. And so this template name that I put here, will in the future be a pug template that we're gonna create. And then just the subject line. Let's say 'Welcome to the Natours Family!'.  So for example in the point of our code where we want to send the welcome email we do not have to worry about template names or about the subject lines. All we're gonna do is to say send welcome email and that's it. And then our class will take care of dealing with the implementation. Anyway, let's now actually then build this send function. And so, what we're gonna do in this function, is to first render the HTML for the email based on a pug template. Then, define the email options. Create a transport and send email. Okay? And so that's, I'll leave that one for later as well. And usually up until this point, we only ever use pug to create a template, and then we pass the name of the template into the render function on the response. Right. So we always just used it like this res.render, and then here the name of the template. Right? And what this render function does behind the scenes is to basically create the HTML based on the pug template and then send it to the client. Now in this case we do not really want to render, all we want to do is to basically create the HTML out of the template so that we can then send that HTML as the email. So basically defining it here as an HTML option into these mail options. So, remember how we can specify text and HTML. And mainly we are interested in sending an HTML email.

// And so that's why we're gonna have a pug template from which we will generate this HTML. So it's not gonna be working like this, but instead we actually need to require the pug package here. So, pug like this, and then we need to use pug.renderFile. Okay? And so this will take in the file and then render the pug code into real HTML. And so that we can then save into a variable HTML. So, that is the first step. Next up, let's define the email options. So, from is now this.from. Next up, we have this.to, and we also have the subject which is equal to the subject that's coming in right here and we have our HTML. Now, next up, we also want to include a text version of our email into the email. Okay? And that's actually really important because it's better for email delivery rates and also for spam folders. All right? And also some people just prefer plain simple text emails instead of having the more formatted HTML emails. All right? And so basically, we need a way of converting all the HTML to simple text. So stripping out all of the HTML leaving only the content. And for doing that, we are going to install yet another package, and so this one is called html-to-text.Now let's use that to convert our HTML. So we use htmlToText.fromString and then that string is stored in HTML. Right? So, these are our mail options. And actually I forgot something very, very important, here in this first step, so in this render file, because just like with response.render, we can also pass data into render file. And of course, that is very important if we want to actually do or email personalization with the name and also pass in the URL. So, now let's finally create a transport using our create transport function, and then send the email.So, fair enough, that's this.newTransport. Now let's remember how we did it here before. So we had our transporter, which we created separately in this case, and then onto that we chained sendMail with the options. Then, we need to await all of this, because, of course, it's an asynchronous function. And so let's now mark this one here as async. Okay? And so now, we also need to await the function here. All right? Because this.send is now indeed an async function. And so here we await that so that this function only returns as soon as the email has actually been sent. And so, of course, mark this one as async as well.

// So, just very quickly recap what we did here. So we created a new email class from which we can create email objects that we can then use to send actual emails. And to create a new email object, we will paste in the user and also a URL that we want to be in that email. So then here we assign all that stuff to the current object, and also some other settings that we want to have available, such as the first name and the sender email. So basically to abstract this information away from the send function, and to have it all in one central place. Then we have here a new transport function which makes it really easy to create different transports for different environments. And so once more, abstracting that logic away from the actual send function which should only be concerned about sending the email. Okay? So then here is that send function which takes in a template and a subject, and based on that it creates the HTML from a pug template which will then be set into the email options, which will, at the end of the function, then finally be sent in this line of code. Okay? But it's not going to be this send function that we will use in our code. So instead, we're going to be creating one different function for each type of email that we want to send. And the first one that I created here is the sendWelcome. All right? And so for sendWelcome, we basically then preset the template name as welcome, and the subject as this string.

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Pravin Thakur <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // SEND GRID
      return nodemailer.createTransport({
        host: process.env.RESEND_HOST,
        port: process.env.RESEND_PORT,
        auth: {
          user: process.env.RESEND_USERNAME,
          pass: process.env.RESEND_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug Template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
      // html
    };

    //  3) Create a transport and send email.
    await this.newTransport().sendMail(mailOptions);
    //  await transporter.sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)',
    );
  }
};
