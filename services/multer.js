const multer = require('multer');
const fs = require('fs');
const dirName = './public/uploads/product';

const directory = () => {
  try {
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName)
    }
  } catch (err) {
    console.error(err, 'err')
  }
}
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Please upload only images.', false);
  }
};
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(req.uploadPath, file, 'image');
    const destPath = req.uploadPath;
    if (!fs.existsSync(destPath))
      fs.mkdirSync(destPath);
    cb(null, `${destPath}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  },
});
var uploadFiles = multer({
  storage: storage,
  fileFilter: imageFilter
});
module.exports = {
  uploadFiles
}
