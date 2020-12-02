const { Data, KeyWord, Alert } = require("../models");
const eventEmitter = require("../eventEmitter");
const { Op } = require("sequelize");

module.exports = async function main() {
  const keyWords = await KeyWord.findAll();
  keyWords.forEach(async (keyWord) => {
    const timeStampObj = await Alert.findOne({
      attribute: ["createdAt"],
      where: { keyWord: keyWord.keyWord },
      paranoid: false,
      order: [["createdAt", "DESC"]],
    });
    const timeStamp = timeStampObj ? timeStampObj.createdAt : 0;
    const partialData = await Data.findAll({
      where: {
        [Op.or]: [
          { author: { [Op.substring]: `${keyWord.keyWord}` } },
          { title: { [Op.substring]: `${keyWord.keyWord}` } },
          { content: { [Op.substring]: `${keyWord.keyWord}` } },
        ],
        createdAt: { [Op.gt]: timeStamp },
      },
      order: [["date", "DESC"]],
    });
    const fullData = await Data.findAll({
      where: {
        [Op.or]: [
          { author: { [Op.like]: `${keyWord.keyWord} %` } },
          { title: { [Op.like]: `${keyWord.keyWord} %` } },
          { content: { [Op.like]: `${keyWord.keyWord} %` } },
          { author: { [Op.like]: `% ${keyWord.keyWord} %` } },
          { title: { [Op.like]: `% ${keyWord.keyWord} %` } },
          { content: { [Op.like]: `% ${keyWord.keyWord} %` } },
          { author: { [Op.like]: `% ${keyWord.keyWord}` } },
          { title: { [Op.like]: `% ${keyWord.keyWord}` } },
          { content: { [Op.like]: `% ${keyWord.keyWord}` } },
        ],
        createdAt: { [Op.gt]: timeStamp },
      },
      order: [["date", "DESC"]],
    });
    const filteredPartialData = partialData.filter(
      (partialElement) =>
        !fullData.some((fullElement) => fullElement.id === partialElement.id)
    );
    const partialAlertData = filteredPartialData.map((element) => {
      return {
        dataId: element.id,
        keyWord: keyWord.keyWord,
        match: "partial",
      };
    });
    const fullAlertData = fullData.map((element) => {
      return {
        dataId: element.id,
        keyWord: keyWord.keyWord,
        match: "full",
      };
    });
    const allData = [...partialAlertData, ...fullAlertData];
    console.log(keyWord.keyWord);
    console.log(timeStamp);
    console.log("allData", allData);
    await Alert.bulkCreate(allData);
    if (allData.length > 0) {
      eventEmitter.emit(
        "notifications-alerts",
        allData.length,
        keyWord.keyWord
      );
    }
  });
};
