require("dotenv").config();
const cheerio = require("cheerio");
const axios = require("axios");
const SocksAgent = require("axios-socks5-agent");
const yaml = require("js-yaml");
const fs = require("fs");

const { httpAgent, httpsAgent } = new SocksAgent({
  agentOptions: {
    keepAlive: true,
  },
  host: process.env.IP_ADDRESS,
});

module.exports = async function main() {
  try {
    const config = yaml.safeLoad(
      fs.readFileSync("./config-pastebin.yml", "utf8")
    );
    console.log(config["scrapper-url"]);
    const { data: content } = await axios.get(config["scrapper-url"], {
      httpAgent,
      httpsAgent,
    });
    const $ = cheerio.load(content);
    const links = [];
    $(config["tasks"]["get-pastes-links"]["html-tag"]).each((idx, elem) => {
      links.push(elem.attribs.href);
    });
    const titles = [];
    const contents = [];
    const dates = [];
    const authors = [];

    await Promise.all(
      links.map(async (link) => {
        if()
        const { data: linkContent } = await axios.get(link, {
          httpAgent,
          httpsAgent,
        });
        const $$ = cheerio.load(linkContent);
        $$(config["tasks"]["get-pastes-titles"]["html-tag"]).each(
          (idx, elem) => {
            const title = $$(elem).text().trim();
            console.log(title);
            titles.push(title);
          }
        );
        $$(config["tasks"]["get-pastes-contents"]["html-tag"]).each(
          (idx, elem) => {
            const content = $$(elem).text().trim();
            console.log(content);
            contents.push(content);
          }
        );
        $$(config["tasks"]["get-pastes-authors"]["html-tag"]).each(
          (idx, elem) => {
            if (config["dark-web"]) {
              const authorFull = $$(elem).text().trim();
              const author = authorFull
                .substring(
                  authorFull.indexOf("by") + 2,
                  authorFull.indexOf("at")
                )
                .trim();
              console.log(author);
              authors.push(author);
            }
          }
        );
        $$(config["tasks"]["get-pastes-dates"]["html-tag"]).each(
          (idx, elem) => {
            if (config["dark-web"]) {
              const dateFull = $$(elem).text().trim();
              const date = dateFull
                .substring(dateFull.indexOf("at") + 2)
                .trim();
              console.log(date);
              dates.push(date);
            }
          }
        );
      })
    );
    // const { data: lastEntry } = await axios.get(
    //   `http://${process.env.WEBHOOK_IP}:${process.env.WEBHOOK_PORT}/api/data/last-entry`
    // );
    // const data = titles
    //   .map((item, index) => {
    //     if (
    //       new Date(dates[index]).getTime() >
    //       (lastEntry ? new Date(lastEntry.date).getTime() : 0)
    //     ) {
    //       return {
    //         title: item,
    //         content: contents[index],
    //         date: dates[index],
    //         author: authors[index],
    //       };
    //     }
    //   })
    //   .filter((item) => !!item);
    // console.log(data);
    // await axios.post(
    //   `http://${process.env.WEBHOOK_IP}:${process.env.WEBHOOK_PORT}/api/data`,
    //   {
    //     data: data,
    //   }
    // );
  } catch (err) {
    console.log(err);
    // await axios.post(
    //   `http://${process.env.WEBHOOK_IP}:${process.env.WEBHOOK_PORT}/api/data/error`,
    //   {
    //     error: err.message,
    //   }
    // );
  }
};
