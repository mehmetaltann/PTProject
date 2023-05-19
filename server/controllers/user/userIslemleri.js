const { User } = require("../../models/UserModel");
const { dbSaveOne } = require("../dbTransections");
const bcrypt = require("bcrypt");

exports.postUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return res
        .status(409)
        .send({ message: "Bu Kullanıcı Adı Kullanılmaktadır" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = User({
      username,
      password: hashPassword,
    });

    dbSaveOne(newUser, "Kullanıcı Başarıyla Oluşturuldu", res);
  } catch (error) {
    res.status(500).send({ message: "Server Bağlantı Hatası" });
  }
};

exports.authUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user)
      return res
        .status(401)
        .send({ message: "Yanlış Kullanıcı Adı veya Şifre" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(401)
        .send({ message: "Yanlış Kullanıcı Adı veya Şifre" });
    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Giriş Yapıldı" });
  } catch (error) {
    res.status(500).send({ message: "Server Bağlantı Hatası" });
  }
};