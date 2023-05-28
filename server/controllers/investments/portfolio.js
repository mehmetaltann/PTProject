const InvPortfolioSchema = require("../../models/InvPortfolioModel");
const { dbFind, dbFindByIdAndDelete, dbSave } = require("../dbQueries");

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
  const portfoy = Portfoy({
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
  try {
    await dbFindByIdAndDelete(InvPortfolioSchema, req.params.id);
    res.status(200).json({ message: "Portfoy Silindi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Portfoy Silinemedi, Server Bağlantı Hatası" });
  }
};
