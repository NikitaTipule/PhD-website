const Counter = require("../models/counter");
const departments = require("../config/departments");
const db = require("../config/connectDB");

db().then((conn) => init_counters());

const init_counters = () => {
  const docs = [];
  for (const d in departments) {
    docs.push({
      department: d,
      code: departments[d],
      index: 0,
    });
  }
  Counter.remove({}).then(() => {
    Counter.insertMany(docs).then((res) => {});
  });
};
