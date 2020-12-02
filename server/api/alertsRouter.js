const alertsRouter = require("express").Router();
const { Alert, Data } = require("../models");
const { Op } = require("sequelize");

// get all data
alertsRouter.get("/", async (req, res) => {
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
        include: {
          model: Alert,
          required: true,
        },
        order: [["date", "DESC"]],
      });
    } else {
      allData = await Data.findAll({
        include: {
          model: Alert,
          required: true,
        },
        order: [["date", "DESC"]],
      });
    }
    res.json(allData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

// add data
// alertsRouter.post("/", async (req, res) => {
//   try {
//     const { keyWord } = req.body;
//     const keyWordExists = await KeyWord.findOne({
//       where: { keyWord },
//     });
//     if (keyWordExists) {
//       res.status(304).json({ message: "KeyWord already exists" });
//     } else {
//       await KeyWord.create({ keyWord });
//       res.sendStatus(201);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "Cannot process request" });
//   }
// });

// // update data
// alertsRouter.patch("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const { keyWord } = req.body;
//     const editData = await KeyWord.update(keyWord, {
//       where: {
//         id,
//       },
//     });
//     res.json(editData);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "Cannot process request" });
//   }
// });

// delete data
alertsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Alert.destroy({
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

module.exports = alertsRouter;
