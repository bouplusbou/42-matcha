const nodemailer = require("nodemailer");

const sendEmail = async (type, email, hash) => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    sendmail: true,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    }
  });

  const message = {
    'confirmation': `Please click below to confirm your Matcha account: http://localhost:3000/confirm/${hash}`,
    'resetPassword': `Please click below to reset your password: http://localhost:3000/resetPassword/${hash}`,
  };

  const subject = {
    'confirmation': 'Matcha - Please confirm your account',
    'resetPassword': 'Matcha - Password reset request',
  };

  let info = await transporter.sendMail({
    from: '"Matcha Team" <hello@matcha.com>',
    to: email, 
    subject: subject[type],
    text: message[type],
  });
  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = sendEmail;