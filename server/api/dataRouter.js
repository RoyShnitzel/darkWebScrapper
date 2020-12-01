const scrapperRouter = require("express").Router();
const { Data, KeyWord } = require("../models");
const { Op } = require("sequelize");
const ner = require("wink-ner");
const winkTokenizer = require("wink-tokenizer");
const Sentiment = require("sentiment");
//=================sentiment config======================
const sentiment = new Sentiment();
const sentimentOptions = {
  extras: {
    girls: -2,
    girlz: -2,
    porn: -3,
    girl: -2,
  },
};
function sentimentAnalysis(sequelizeData) {
  return sequelizeData.map((element) => {
    const titleResult = sentiment.analyze(element.title, sentimentOptions);
    const contentResult = sentiment.analyze(element.content, sentimentOptions);
    const authorResult = sentiment.analyze(element.author, sentimentOptions);
    element.dataValues.score =
      titleResult.score + contentResult.score + authorResult.score;
    return element;
  });
}
//================NER Analysis config=====================
const myNER = ner();
const trainingData = [
  { text: "%", entityType: "percent" },
  { text: "sql", entityType: "Data" },
  { text: "mongo-db", entityType: "Data" },
  { text: "data", entityType: "Data" },
  { text: "information", entityType: "Data" },
  { text: "info", entityType: "Data" },
  { text: "gun", entityType: "weapons" },
  { text: "weapons", entityType: "weapons" },
  { text: "rifle", entityType: "weapons" },
  { text: "sword", entityType: "weapons" },
  { text: "explosives", entityType: "weapons" },
  { text: "bomb", entityType: "weapons" },
  { text: "handgun", entityType: "weapons" },
  { text: "smg", entityType: "weapons" },
  { text: "weapon", entityType: "weapons" },
  { text: "instagram", entityType: "social media" },
  { text: "facebook", entityType: "social media" },
  { text: "twitter", entityType: "social media" },
  { text: "whatsapp", entityType: "social media" },
  { text: "hack", entityType: "hacking" },
  { text: "hacker", entityType: "hacking" },
  { text: "hacked", entityType: "hacking" },
  { text: "exploit", entityType: "hacking" },
  { text: "cyber", entityType: "hacking" },
  { text: "bitcoin", entityType: "bitcoin" },
];
const tokenize = winkTokenizer().tokenize;
myNER.learn(trainingData);
function nerAnalysis(sequelizeData) {
  return sequelizeData.map((element) => {
    const contentTokens = tokenize(element.dataValues.content);
    const titleTokens = tokenize(element.dataValues.title);
    const tokens = [...contentTokens, ...titleTokens];
    const results = myNER.recognize(tokens);
    const entities = new Set(
      results.map((result) => result.entityType).filter((x) => !!x)
    );
    const tags = new Set(
      results
        .map((result) => result.tag)
        .filter((tag) => tag === "url" || tag === "currency" || tag === "email")
    );
    element.dataValues.nerAnalysis = [...tags, ...entities];
    return element;
  });
}

// get all data
scrapperRouter.get("/", async (req, res) => {
  try {
    const { searchValue } = req.query;
    let allData = [];
    if (searchValue) {
      allData = await Data.findAll({
        where: {
          [Op.or]: [
            { author: { [Op.like]: `%${searchValue}%` } },
            { title: { [Op.like]: `%${searchValue}%` } },
            { content: { [Op.like]: `%${searchValue}%` } },
          ],
        },
        order: [["date", "DESC"]],
      });
    } else {
      allData = await Data.findAll({ order: [["date", "DESC"]] });
    }
    const nerAnalysisData = nerAnalysis(allData);
    res.json(nerAnalysisData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

scrapperRouter.get("/:sentimentParam", async (req, res) => {
  try {
    const { sentimentParam } = req.params;
    const { searchValue } = req.query;
    let allData = [];
    if (searchValue) {
      allData = await Data.findAll({
        where: {
          [Op.or]: [
            { author: { [Op.like]: `%${searchValue}%` } },
            { title: { [Op.like]: `%${searchValue}%` } },
            { content: { [Op.like]: `%${searchValue}%` } },
          ],
        },
        order: [["date", "DESC"]],
      });
    } else {
      allData = await Data.findAll({ order: [["date", "DESC"]] });
    }
    const allDataWithScore = sentimentAnalysis(allData);
    let sentimentalData = [];
    if (sentimentParam === "negative") {
      sentimentalData = allDataWithScore
        .filter((element) => element.dataValues.score < 0)
        .sort((a, b) => a.dataValues.score - b.dataValues.score);
    } else if (sentimentParam === "positive") {
      sentimentalData = allDataWithScore
        .filter((element) => element.dataValues.score > 0)
        .sort((a, b) => b.dataValues.score - a.dataValues.score);
    } else {
      sentimentalData = allDataWithScore;
    }
    res.json(sentimentalData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

// add data
scrapperRouter.post("/", async (req, res) => {
  try {
    const destructedData = {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      date: req.body.date,
    };
    await Data.create(destructedData);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

// update data
scrapperRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const destructedData = {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      date: req.body.date,
    };
    const editData = await Data.update(destructedData, {
      where: {
        id,
      },
    });
    res.json(editData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

// delete data
scrapperRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Data.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

module.exports = scrapperRouter;
