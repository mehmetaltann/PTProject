const InvPortfolioSchema = require("../../models/InvPortfolioModel");
const InvestmentSchema = require("../../models/InvestmentModel");
const {
  dbFind,
  dbFindByIdAndDelete,
  dbSave,
  dbFindOne,
} = require("../dbQueries");

exports.portfolioQuery = async (req, res) => {
  try {
    const data = await dbFind(InvPortfolioSchema);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Portfoyler Gitirilemedi, Server Bağlantı Hatası" });
  }
};

exports.portfolioAdd = async (req, res) => {
  const { code, title } = req.body;
  const portfoy = InvPortfolioSchema({
    code,
    title,
  });
  try {
    await dbSave(portfoy);
    res.status(200).json({ message: "Portfoy Eklendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Portfoy Eklenemedi, Server Bağlantı Hatası" });
  }
};

exports.portfolioDelete = async (req, res) => {
  console.log(req.params.id);
  const portfolioRes = await dbFindOne(InvPortfolioSchema, {
    _id: req.params.id,
  });
  const invRes = await dbFindOne(InvestmentSchema, {
    portfolio: portfolioRes.title,
  });
  const isUse = invRes ? true : false;
  if (!isUse) {
    try {
      await dbFindByIdAndDelete(InvPortfolioSchema, req.params.id);
      res.status(200).json({ message: "Portfoy Silindi" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Portfoy Silinemedi, Server Bağlantı Hatası" });
    }
  } else {
    res
      .status(200)
      .json({ message: "Bu Portfoy Silinemez, Yatırımları Bulunuyor." });
  }
};
