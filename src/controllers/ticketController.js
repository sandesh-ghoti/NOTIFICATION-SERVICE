const { TicketService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/appError");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
async function createTicket(req, res) {
  try {
    const ticket = await TicketService.createTicket({
      subject: req.body.subject,
      content: req.body.content,
      recipientEmail: req.body.user.email,
    });
    SuccessResponse.data = ticket;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(
        error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json(ErrorResponse);
  }
}
module.exports = { createTicket };
