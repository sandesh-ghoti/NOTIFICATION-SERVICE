const nodemailer = require("nodemailer");

const { GMAIL_ID, GMAIL_PASS } = require("./serverConfig");

const mailsender = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: GMAIL_ID,
    pass: GMAIL_PASS,
  },
});

module.exports = mailsender;
