const notificationsRouter = require("express").Router();
const eventEmitter = require("./eventEmitter");

notificationsRouter.use(require("./middleware/serverSentEvents"));
// get all data
notificationsRouter.get("/", (req, res) => {
  eventEmitter.on("notifications-alerts", (data, keyWord) => {
    const notificationsData = {
      name: "notifications-alerts",
      message: `There is ${data} new ${keyWord} Alerts`,
    };
    console.log(notificationsData);
    res.sendEventStreamData(notificationsData);
  });

  eventEmitter.on("newData", (data) => {
    const notificationsData = {
      name: "New Data",
      message: `There is ${data} new DarkWeb Posts`,
    };
    console.log(notificationsData);
    res.sendEventStreamData(notificationsData);
  });

  eventEmitter.on("scrapperFailed", () => {
    const notificationsData = {
      name: "scrapperFailed",
      message: "Data collection from a source has failed",
    };
    console.log(notificationsData);
    res.sendEventStreamData(notificationsData);
  });
});

module.exports = notificationsRouter;
