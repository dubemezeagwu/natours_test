const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,

    // Activate in gmail "less secure app" option
  });
  // 2) Define the email options
  const mailOptions = {
    from: "Dubem Ezeagwu <hello@dubem.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  // 3) Send the mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
