const express = require("express");
var cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/connectDB");
const studentRouter = require("./routes/student");
const phdCordRouter = require("./routes/phdCord");
const staffRouter = require("./routes/staff");
const fileRouter = require("./routes/files");
const accountRouter = require("./routes/accountSec");

const app = express();
// app.use(morgan("combined"));

connectDB();
app.use(cors());
app.use(express.json());

app.use("/students", studentRouter);
app.use("/phdCords", phdCordRouter);
app.use("/account-section", accountRouter);
app.use("/files", fileRouter);
app.use("/staff", staffRouter);

const port = process.env.PORT||5000;
app.listen(port, () => console.log(`Server up and running -> port ${port} !`));
app.timeout = 3000;
