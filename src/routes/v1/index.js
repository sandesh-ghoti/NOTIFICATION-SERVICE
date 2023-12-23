const express = require("express");
const router = express.Router();
const { TicketController } = require("../../controllers");
const { TicketMiddleware } = require("../../middlerwares");
router.post(
  "/ticket",
  TicketMiddleware.validateTicketCreate,
  TicketController.createTicket
);

module.exports = router;
