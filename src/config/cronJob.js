const cron = require("node-cron");

const { TicketService } = require("../services");

function scheduleCrons() {
  // * * * * * (seconds, minutes,hour, days, weeks)
  cron.schedule("*/50 * * * *", async () => {
    await TicketService.sendPendingEmails();
  });
}

module.exports = scheduleCrons;
