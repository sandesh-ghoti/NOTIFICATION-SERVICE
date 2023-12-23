const CrudRepository = require("./crudRepository");
const { Ticket } = require("../models");
const { STATUS } = require("../utils/common");
const { PENDING, SUCCESS, FAILED } = STATUS;
class TicketRepository extends CrudRepository {
  constructor() {
    super(Ticket);
  }
  async getPendingTickets() {
    const response = await Ticket.findAll({
      where: {
        status: PENDING,
      },
    });
    return response;
  }
}
module.exports = TicketRepository;
