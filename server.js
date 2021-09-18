const express = require("express");
var cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/connectDB");
const studentRouter = require("./routes/student");
const phdCordRouter = require("./routes/phdCord");
const adminRouter = require("./routes/admin");
const accountSecRouter = require("./routes/accountSec");

const app = express();
// app.use(morgan("combined"));

connectDB();
app.use(cors());
app.use(express.json());

app.use("/student", studentRouter);
app.use("/phdcord", phdCordRouter);
app.use("/admin", adminRouter);
app.use("/account-section", accountSecRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running -> port ${port} !`));
app.timeout = 3000;
