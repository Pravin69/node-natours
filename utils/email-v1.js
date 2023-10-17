const nodemailer = require('nodemailer');
// Sending emails with NodeMailer: So, we need to now send the password reset token via email to the user. And so in this lecture, we're gonna learn how to send email using a very popular solution called Nodemailer.But anyway, let's now create an email handler function that we can then use throughout our application. So I'm gonna do that right here in the Utilities folder, again, and simply calling it email.js. let's actually install the Nodemailer package. So that's the package that I mentioned right in the beginning, which we're gonna use to send email using Node.js. So, as always, npm install nodemailer. And in here. All right, and now let's create that function here. So constant email, okay, and then in here, we're gonna pass in some options basically. So the email address where we want to send an email to, the subject line, the email content, and maybe some other stuff. And so now we need to follow three steps in order to send emails with Nodemailer.

// So first up, we need to create a transporter. Then second, we need to define the email options, basically, and then in the end, actually send the email with Nodemailer. So, the transporter that we made in the first step here, is basically a service that will actually send the email, because it's not node.js that will actually send the email itself. It's just a service that we define in here. Something like Gmail, for example. And again, I'm not going to do it here, but I know that many people will actually want to use it. And the reason why we're not using Gmail in this application is because Gmail is not at all a good idea for a production app. So using Gmail for this kind of stuff, you can only send 500 emails per day, and also, you will probably very quickly be marked as a spammer, and from there, it will only go downhill. All right? So, unless it's like a private app, and you just send emails to yourself, or, like, 10 friends, well, then you should use another service. And some well-known ones are SendGrid and Mailgun. Now, what we're gonna do right now is to use a special development service, which basically fakes to send emails to real addresses. But, in reality, these emails end up trapped in a development inbox, so that we can then take a look at how they will look later in production. All right? So that service is called Mailtrap, and so let's now sign up for that. So, and as I say, safe email testing for staging and development. So basically, with this service, you can fake to send emails to clients, but these emails will then never reach these clients, and instead be trapped in your Mailtrap, okay? And so that way you cannot accidentally send some development emails to all of your clients or users, okay. Then we can open it, and you see we have no email at this point, but what matters for now is these credentials here.

// So you see we have our host here, we have the port, username, and password. And so that's what we're gonna specify in our transport in Nodemailer now. so let's copy it to our config file, so that's the username, then that's the password, and now we actually also need to specify the host. Okay, and so that's because Mailtrap is not one of these predefined services that comes with Nodemailer. All right. The port is 25. and what I need to specify instead is the host so email, host, and, of course, the port. So everything that we just saved before and then we also need to specify the auth property, so basically for authentication. So we need a user and a password. So basically defining some options for our email. All right, and we could, of course, do step two and three all at the same, but I like to simply prefer these options here first. Okay, and so here we specify where the email is coming from, so the name, and then the email address like this. Next up, we need the recipient's address, and so that one, I'm gonna specify as an option, okay? So basically, coming as an argument to this function. So this options object here, is this one that we pass into the function. All right. Then actually the same for the subject and for the text.  So the subject and then we just specify the text property, and that one, in the options, I'm just calling it message. All right, so this one is basically the text version of the email. But we can then also specify the HTML property. Okay, and so we could now then convert this message to HTML. And later, we're going to do that, but for now, let's keep it simple and not specify the HTML here, at all. And then finally, at the end, transporter, so that's the transporter object that we created right here in the beginning, and on that, we can then call sendMail and into that we need to pass in our mail options, okay? And now this actually returns a Promise. Okay, so again, this is an asynchronous function, and since we don't want to directly work with Promises, let's use async/await. Okay, and now let's simply export it as the default from this module.

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Jonas Schmedtmann <hello@jonas.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
