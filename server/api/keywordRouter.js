const keyWordRouter = require("express").Router();
const { KeyWord, Alert } = require("../models");
const { Op } = require("sequelize");
const alertsFinder = require("../alertsFinder/alertFinder");

// get all data
keyWordRouter.get("/", async (req, res) => {
  try {
    allData = await KeyWord.findAll();
    res.json(allData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

// add data
keyWordRouter.post("/", async (req, res) => {
  try {
    const { keyWord } = req.body;
    const keyWordExists = await KeyWord.findOne({
      where: { keyWord },
    });
    if (keyWordExists) {
      res.status(304).json({ message: "KeyWord already exists" });
    } else {
      await KeyWord.create({ keyWord });
      alertsFinder();
      res.sendStatus(201);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

// update data
keyWordRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { keyWord } = req.body;
    const editData = await KeyWord.update(keyWord, {
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
keyWordRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const keyWordToDelete = await KeyWord.findByPk(id);
    if (keyWordToDelete) {
      await KeyWord.destroy({
        where: {
          id,
        },
      });
      await Alert.destroy({
        where: { keyWord: keyWordToDelete.keyWord },
        force: true,
      });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

module.exports = keyWordRouter;
