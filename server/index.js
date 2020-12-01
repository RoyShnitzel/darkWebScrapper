require("dotenv").config();
const scrapper = require("./webScrapper/scrapperAxios");

const app = require("./app");

const port = process.env.PORT || 8080;

async function runScrapperInterval() {
  scrapper();
  const scrapperInterval = setInterval(() => {
    scrapper();
    console.log("DarkWebScrapper Is Running");
  }, 1000 * 60 * 2);
}

runScrapperInterval();

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
