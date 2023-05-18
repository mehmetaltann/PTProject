const request = require("request-promise");
const cheerio = require("cheerio");

const extractWithCheerio = ($, kod) => {
  data = { kod: kod };
  data["title"] = $("#MainContent_FormViewMainIndicators_LabelFund").text();
  data["price"] = $("ul.top-list").find("span").first().text();
  data["category"] = $("ul.top-list").find("span").last().text();
  return data;
};

exports.fonScraper = async (kod, portfoy_ismi) => {
  const body = await request({
    url: `https://www.tefas.gov.tr/FonAnaliz.aspx?FonKod=${kod}`,
    method: "GET",
  });
  const $ = cheerio.load(body);
  const result = extractWithCheerio($, kod);
  return {
    title: result.title,
    price: parseFloat(result.price.replace(/,/, ".")),
    category: result.category,
    kod: kod,
    portfoy: portfoy_ismi,
  };
};

exports.moneyScraper = async (kod, portfoy_ismi) => {
  const body = await request({
    url: `https://api.genelpara.com/embed/para-birimleri.json`,
    method: "GET",
  });
  data = JSON.parse(body);
  let parameter = "";
  let title = "";
  let category = "";
  if (kod === "ALT") {
    parameter = "GA";
    title = "Altın";
    category = "Altın";
  } else if (kod === "USD") {
    parameter = "USD";
    title = "Dolar";
    category = "Döviz";
  } else if (kod === "EUR") {
    parameter = "EUR";
    title = "Euro";
    category = "Döviz";
  } else if (kod === "BTC") {
    parameter = "BTC";
    title = "Bitcoin";
    category = "Bitcoin";
  }
  return {
    title: title,
    price: data[parameter]["alis"],
    category: category,
    kod: kod,
    portfoy: portfoy_ismi,
  };
};
