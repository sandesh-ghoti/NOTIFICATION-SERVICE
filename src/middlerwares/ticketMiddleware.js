const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
async function validateTicketCreate(req, res, next) {
  if (!req.body.subject || !req.body.user.email || !req.body.content) {
    ErrorResponse.error = "";
    if (!req.body.subject) {
      ErrorResponse.error += "subject not found ";
      // return res.status(StatusCodes.PARTIAL_CONTENT).send("")
    }
    if (!req.body.user.email) {
      ErrorResponse.error += "recipientEmail not found ";
      // return res.status(StatusCodes.PARTIAL_CONTENT).send("")
    }
    if (!req.body.content) {
      ErrorResponse.error += "content not found";
      // return res.status(StatusCodes.PARTIAL_CONTENT).send("")
    }
    return res.status(StatusCodes.PARTIAL_CONTENT).send(ErrorResponse);
  }
  next();
}
module.exports = { validateTicketCreate };
