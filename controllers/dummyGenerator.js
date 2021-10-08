const Student = require("../models/student");
const PhdCord = require("../models/phdCord");
const dummy = require("mongoose-dummy");
const connectDB = require("../config/connectDB");

const createDummyData = async () => {
  await connectDB();

  const ignoredFields = [
    "_id",
    "created_at",
    "__v",
    /detail.*_info/,
    "documentsUploaded",
  ];

  for (let i = 0; i < 100; i++) {
    let user = dummy(Student, {
      ignore: ignoredFields,
    });
    new Student(user).save();
  }

  for (let i = 0; i < 10; i++) {
    let user = dummy(PhdCord, {
      ignore: ignoredFields,
    });
    user.mis = Math.floor(1e8 + Math.random() * 9e8);
    new PhdCord(user).save();
  }
};

createDummyData();
