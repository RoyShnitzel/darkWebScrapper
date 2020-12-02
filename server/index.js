require("dotenv").config();
const scrapper = require("./webScrapper/scrapperAxios");
const alertsFinder = require("./alertsFinder/alertFinder");

const app = require("./app");

const port = process.env.PORT || 8080;

async function runScrapperInterval() {
  scrapper();
  const scrapperInterval = setInterval(() => {
    scrapper();
    console.log("DarkWebScrapper Is Running");
  }, 1000 * 60 * 2);
}

async function runAlertFinderInterval() {
  alertsFinder();
  const scrapperInterval = setInterval(() => {
    alertsFinder();
    console.log("alertsFinder Is Running");
  }, 1000 * 60 * 2);
}

runScrapperInterval();
runAlertFinderInterval();

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
