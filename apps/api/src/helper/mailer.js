const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "afrasuperblack@gmail.com",
    pass: "omfqopygusffftzk",
  },
});

module.exports = transporter;
