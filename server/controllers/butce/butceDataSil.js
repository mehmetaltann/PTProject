const ButceSchema = require("../../models/ButceDataModel");

exports.butceDataSil = async (req, res) => {
  const { id } = req.params;
  ButceSchema.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).json({ message: "Bütçe Kalemi Silindi" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Bağlantı Hatası" });
    });
};