const amqplib = require("amqplib");
const { TicketService } = require("../services");
let channel, connection;
const {RABBITMQ_ADDRESS}=require('../config/serverConfig')
async function connectQueue() {
  try {
    connection = await amqplib.connect(`amqp://${RABBITMQ_ADDRESS}`);
    channel = await connection.createChannel();

    await channel.assertQueue("Airline-notification-queue");
    console.log("connected to queue");
  } catch (error) {
    console.log(error);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}

async function consumeData() {
  try {
    channel.consume("Airline-notification-queue", async (data) => {
      const { recipientEmail, subject, content } = JSON.parse(
        `${Buffer.from(data.content)}`
      );
      await TicketService.sendEmail({ recipientEmail, subject, content });
      channel.ack(data);
    });
  } catch (error) {
    console.log("queue error", error);
  }
}

module.exports = {
  connectQueue,
  consumeData,
};
