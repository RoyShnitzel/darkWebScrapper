require("dotenv").config();
const alertsFinder = require("./alertsFinder/alertFinder");

const app = require("./app");

const port = process.env.PORT || 8080;

async function runAlertFinderInterval() {
  alertsFinder();
  setInterval(() => {
    alertsFinder();
    console.log("alertsFinder Is Running");
  }, 1000 * 60 * 2);
}

runAlertFinderInterval();

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
