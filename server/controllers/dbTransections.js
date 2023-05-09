exports.dbDeleteOne = async (islemObj, id, mes, res) => {
  try {
    await islemObj.findByIdAndDelete(id);
    res.status(200).json({ message: mes });
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.dbSaveOne = async (islemObj, mes, res) => {
  try {
    await islemObj.save();
    res.status(200).json({ message: mes });
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.dbInsertMany = async (islemObj, insertData, mes, res) => {
  try {
    await islemObj.insertMany(insertData);
    res.status(200).json({ message: mes });
  } catch (error) {
    res.status(500).json({ message: "Server Bağlantı Hatası" });
  }
};

exports.dbFind = async (islemObj, fQuery = null, sortQuery = null, res) => {
  try {
    const data = await islemObj.find(fQuery).sort(sortQuery);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Bağlantı Hatası, Kategoriler Alınamadı" });
  }
};
