var nodemailer = require("nodemailer");
const { emailNodemailer, passwordNodemailer } = require("../config/configKeys");

var transporter = nodemailer.createTransport({
  host: "smtp.outlook.office365.com",
  port: 587,
  tls: true,
  auth: {
    user: emailNodemailer,
    pass: passwordNodemailer,
  },
});

// send email to "to_email" with the otp
const send_email = (to_email, msg, subject = "OTP for signup confirmation") => {
  let mail_html = "<html><body>" + msg + "</body></html>";
  // setup e-mail data
  var mailOptions = {
    from: `"COEP " ${emailNodemailer}`, // sender address (who sends)
    to: to_email, // list of receivers (who receives)
    subject, // Subject line
    text: "COEP's Phd Program Application", // plaintext body

    html: mail_html, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};
module.exports = send_email;
