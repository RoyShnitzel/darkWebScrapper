require("dotenv").config();
const scrapper = require("./scrapperAxios");

async function runScrapperInterval() {
  scrapper(10);
  console.log("scrapper is running");
  setInterval(() => {
    console.log("scrapper is running");
    scrapper(3);
  }, 1000 * 60 * 2);
}

setTimeout(() => {
  runScrapperInterval();
}, 1000 * 60);
