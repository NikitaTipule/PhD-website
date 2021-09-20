const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");
const crypto = require("crypto");
const { mongoURI } = require("../config/configKeys");

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject({ err: "Error uploading file" });
        }
        var filename =
          buf.toString("hex") + Date.now() + path.extname(file.originalname);

        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const uploadFileGrid = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("file");

exports.uploadFile = (req, res) => {
  if (req.userRole != "student") {
    res.status(403).json({ error: "only students can upload documents" });
  }
  uploadFileGrid(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json({ filename: req.file.filename });
  });
};

//had to downgrade mongoose to 5.13.7 because of incompatible gridFS stream package

exports.getFileGrid = (req, res) => {
  console.log(gfs.mongo);
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (err | !file || file.length === 0) {
      return res.status(404).send({ err: "File doesn't exist" });
    }
    exports.readstream = gfs.createReadStream(file.filename);
    res.header({ "Content-type": file.contentType });
    readstream.on("error", (err) => {
      return res.status(404).send({ err: "Error getting the file" });
    });
    readstream.pipe(res);
    readstream.on("end", function () {
      res.status(201).end();
    });
  });
};

exports.removeFileGrid = (req, res) => {
  if (req.userRole != "student") {
    res.status(403).json({ error: "only students can delete documents" });
  }
  gfs.files.remove({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0 || err !== null) {
      return res.status(404).send({ err: "Error removing file" });
    }
    return res.json({ success: true });
  });
};
