const multer = require("multer");

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "wazzBackend/chatImages");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase();
    const ext = MIME_TYPE_MAP[file.mimetype];
    const stemp = Date.now();
    const chatId = req.body.id;
    cb(null, chatId + '@' + name + '-' +Date.now()+ '.' + ext);
  }
});

module.exports = multer({storage: storage}).array("images");