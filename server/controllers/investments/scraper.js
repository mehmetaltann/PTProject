const request = require("request-promise");
const cheerio = require("cheerio");

const extractWithCheerio = ($, code) => {
  data = { code: code };
  data["title"] = $("#MainContent_FormViewMainIndicators_LabelFund").text();
  data["price"] = $("ul.top-list").find("span").first().text();
  data["category"] = $("ul.top-list").find("span").last().text();
  return data;
};

exports.fundScraper = async (code, portfolio) => {
  try {
    const body = await request({
      url: `https://www.tefas.gov.tr/FonAnaliz.aspx?FonKod=${code}`,
      method: "GET",
    });
    const $ = cheerio.load(body);
    const result = extractWithCheerio($, code);
    return {
      title: result.title,
      price: parseFloat(result.price.replace(/,/, ".")),
      category: result.category,
      code,
      portfolio,
    };
  } catch (e) {
    console.error(e);
  }
};

exports.moneyScraper = async (code, portfolio) => {
  try {
    const body = await request({
      url: `https://api.genelpara.com/embed/para-birimleri.json`,
      method: "GET",
    });
    data = JSON.parse(body);
    let parameter = "";
    let title = "";
    let category = "";
    if (code === "ALT") {
      parameter = "GA";
      title = "Altın";
      category = "Altın";
    } else if (code === "USD") {
      parameter = "USD";
      title = "Dolar";
      category = "Döviz";
    } else if (code === "EUR") {
      parameter = "EUR";
      title = "Euro";
      category = "Döviz";
    } else if (code === "BTC") {
      parameter = "BTC";
      title = "Bitcoin";
      category = "Bitcoin";
    }
    return {
      title: title,
      price: parseFloat(data[parameter]["alis"].replace(/,/, ".")),
      category: category,
      code,
      portfolio,
    };
  } catch (e) {
    console.error(e);
  }
};
