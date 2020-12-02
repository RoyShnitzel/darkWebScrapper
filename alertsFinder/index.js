require("dotenv").config();
const http = require("http");
const alertsFinder = require("./alertsFinder");

async function runAlertFinderInterval() {
  alertsFinder();
  setInterval(() => {
    alertsFinder();
    console.log("alertsFinder Is Running");
  }, 1000 * 60 * 2);
}

setTimeout(() => {
  runAlertFinderInterval();
}, 1000 * 60);

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200);
  alertsFinder();
  const data = JSON.stringify({ message: "Initial Alert Finder" });
  res.end(data);
});

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(
    `Alerts Finder Micro Service listening at http://localhost:${port}`
  );
});
