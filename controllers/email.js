var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

const { emailNodemailer, passwordNodemailer } = require("../config/configKeys");
var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: emailNodemailer,
    pass: passwordNodemailer
  }
}));

// send email to "to_email" with the otp
const send_email = (to_email, msg, subject = "OTP for signup confirmation") => {
  let mail_html = "<html><body>" + msg + "</body></html>";
  // setup e-mail data
  var mailOptions = {
    from: `"COEP " ${emailNodemailer}`, // sender address (who sends)
    to: to_email, // list of receivers (who receives)
    subject, // Subject line
    text: "COEP's PhD Program Application", // plaintext body
    html: mail_html, // html body
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    console.log(info);
    console.log("Email Sent Successfully");
  });
};

//send_email("sharmav18.comp@coep.ac.in","1234");

module.exports = send_email;
