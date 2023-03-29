const request = require("request-promise");
const cheerio = require("cheerio");

exports.scraper = async (kod) => {
  let body = await request({
    url: `https://www.tefas.gov.tr/FonAnaliz.aspx?FonKod=${kod}`,
    method: "GET",
  });
  let $ = cheerio.load(body);
  let result = extractWithCheerio($, kod);
  return result;
};

const extractWithCheerio = ($, kod) => {
  data = { kod: kod };
  data["title"] = $("#MainContent_FormViewMainIndicators_LabelFund").text();
  data["price"] = $("ul.top-list").find("span").first().text();
  data["category"] = $("ul.top-list").find("span").last().text();
  return data;
};

/*
try {
  getExchangeInfo("AFT");
} catch (err) {
  console.error("ERR", err);
}

async function getExchangeInfo(kod) {
  let body = await request({
    url: `https://www.tefas.gov.tr/FonAnaliz.aspx?FonKod=${kod}`,
    method: "GET",
  });
  let $ = cheerio.load(body);
  let result = extractWithCheerio($, kod);
  console.log(result);
}

function extractWithCheerio($, kod) {
  data = { kod: kod };
  data["title"] = $("#MainContent_FormViewMainIndicators_LabelFund").text();
  data["price"] = $("ul.top-list").find("span").first().text();
  data["category"] = $("ul.top-list").find("span").last().text();
  return data;
}
*/
