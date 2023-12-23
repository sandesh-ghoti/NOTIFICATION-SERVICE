const express = require("express");
const { serverConfig, Logger, QueueConfig } = require("./config");
const app = express();
const apiRoutes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);
app.get("/", (req, res) => {
  return res.send("ok");
});
app.listen(serverConfig.PORT, async () => {
  console.log(`listening on port ${serverConfig.PORT}`);
  Logger.info("successfully started server", "root", {});
  await QueueConfig.connectQueue();
  await QueueConfig.consumeData();
});
