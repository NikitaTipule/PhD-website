const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => `${info.timestamp}: ${info.message}`)
);
const logDir = "log";
const transport = new DailyRotateFile({
  filename: `${logDir}/%DATE%-results.log`,
  datePattern: "YYYY-MM-DD-HH",
  maxSize: " 20m",
  maxFiles: "30d",
  prepend: true,
  level: "info",
});

const logger = winston.createLogger({
  format: logFormat,
  transports: [transport],
});
module.exports = logger;
