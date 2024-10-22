const apiRouter = require("express").Router();

apiRouter.use("/data", require("./dataRouter"));
apiRouter.use("/keyword", require("./keyWordRouter"));
apiRouter.use("/alerts", require("./alertsRouter"));

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

apiRouter.use(unknownEndpoint);

module.exports = apiRouter;
