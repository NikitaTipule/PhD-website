const { auth } = require("../middleware/auth");

const {
  uploadFile,
  getFileGrid,
  removeFileGrid,
} = require("../controllers/file");

router.post("/upload", [auth, uploadFile]);

router.get("/get/:filename", [auth, getFileGrid]);

router.delete("/delete/:filename", [auth, removeFileGrid]);
