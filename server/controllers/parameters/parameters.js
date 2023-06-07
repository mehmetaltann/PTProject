const ParameterSchema = require("../../models/ParametersModal");
const { dbFind, dbFindByIdAndDelete, dbSave } = require("../dbQueries");

exports.parameterQuery = async (req, res) => {
  try {
    const data = await dbFind(ParameterSchema);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Parametreler Gitirilemedi, Server Bağlantı Hatası" });
  }
};

exports.parameterAdd = async (req, res) => {
  const { name, content } = req.body;
  const category = ParameterSchema({
    name,
    content,
  });
  try {
    await dbSave(category);
    res.status(200).json({ message: "Parametre Eklendi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Parametre Eklenemedi, Server Bağlantı Hatası" });
  }
};

exports.parameterDelete = async (req, res) => {
  try {
    await dbFindByIdAndDelete(ParameterSchema, req.params.id);
    res.status(200).json({ message: "Parametre Silindi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Parametre Silinemedi, Server Bağlantı Hatası" });
  }
};
