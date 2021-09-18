require("dotenv").config();

module.exports = {
  mongoURI: "mongodb://localhost:27017/phd-website",
  studentKey: "sdniwjer3jkewf8sd0293",
  cordKey: "csddf83ebwad87ae",
  adminKey: "fewkjf328ef82398",
  accountSectionKey: "bzkAWdwiuhdYIsV2",

  ldapAuthUrl: "http://210.212.183.21/auth",
  emailNodemailer: process.env.MAIL,
  passwordNodemailer: process.env.MAIL_PASSWORD,
};
