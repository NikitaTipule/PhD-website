require("dotenv").config();

module.exports = {
  mongoURI: "mongodb://localhost:27017/phd-website",
  jwtSecretKey: "sdniwjer3jkewf8sd0293",
  ldapAuthUrl: "http://210.212.183.21/auth",
  emailNodemailer: process.env.MAIL,
  passwordNodemailer: process.env.MAIL_PASSWORD,
};
