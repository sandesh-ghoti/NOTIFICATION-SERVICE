const { TicketRepository } = require("../repositories");
const ticketRepository = new TicketRepository();
const AppError = require("../utils/errors/appError");
const { StatusCodes } = require("http-status-codes");
const mailer = require("../config/emailConfig");
const { GMAIL_ID } = require("../config/serverConfig");
const { SUCCESS } = require("../utils/common/enum");
async function createTicket(data) {
  try {
    const res = await ticketRepository.create(data);
    return res;
  } catch (error) {
    throw new AppError(error.name, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
async function sendPendingEmails() {
  try {
    const res = await ticketRepository.getPendingEmails();
    res.forEach(async (ticket) => {
      await sendEmail({
        recipientEmail: ticket.recipientEmail,
        subject: ticket.subject,
        content: ticket.content,
      });
      await ticketRepository.update(ticket.id, { status: SUCCESS });
    });
    return res;
  } catch (error) {
    throw new AppError(error.name, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
async function sendEmail({ recipientEmail, subject, content }) {
  try {
    recipientEmail = recipientEmail
      ? recipientEmail
      : "sandesh.ghoti@gmail.com";
    const res = await mailer.sendMail({
      from: GMAIL_ID,
      to: recipientEmail,
      subject: subject,
      text: content,
    });
    return res;
  } catch (error) {
    console.log(error);
    throw new AppError(error.name, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
module.exports = { createTicket, sendEmail, sendPendingEmails };
